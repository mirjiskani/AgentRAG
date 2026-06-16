import { Injectable } from '@nestjs/common';
import { File } from 'multer';
import { PDFParse } from 'pdf-parse';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';
import { AiService } from 'src/ai/ai.service';
import { QdrantService } from 'src/qdrant/qdrant.service';
import { BusinessException, NotFoundException } from 'src/common/exceptions';
import  DocumentsRepository from './repositories/documents.repository';

@Injectable()
export class DocumentsService {
    constructor(private documentRepository: DocumentsRepository, private readonly aiService: AiService, private readonly qdrantService: QdrantService) { }

    async uploadFile(file: File, userId: number) {
        try {
            const result =
                await this.documentRepository.createDocument({
                    fileName: file.originalname,
                    filePath: file.path,
                    mimeType: file.mimetype,
                    size: file.size,
                    userId,
                });

            // call extractContent to extract content from the document
            await this.extractContent(result.id, userId);

            return {
                success: true,
                message: 'File uploaded successfully',
                data: result,
            };
        } catch (error) {
            if (error instanceof BusinessException || error instanceof NotFoundException) {
                throw error;
            }
            throw new BusinessException('Failed to upload file');
        }
    }


    async listDocuments(userId: number) {
        try {
            const documents = await this.documentRepository.findDocumentsByUserId(userId);

            return {
                success: true,
                message: 'Documents listed successfully',
                data: documents,
            };
        } catch (error) {
            throw new BusinessException('Failed to list documents');
        }
    }

    async extractContent(documentId: number, userId: number) {
        try {

            // find the document
            const document = await this.documentRepository.findUniqueDocument(documentId);

            if (!document) {
                throw new NotFoundException('Document not found');
            }


            let text = '';
            switch (document.mimeType) {
                // extract PDF content
                case 'application/pdf':
                    text = await this.extractPdf(
                        document.filePath,
                    );
                    break;
                // extract TXT content
                case 'text/plain':
                    text = await this.extractTxt(
                        document.filePath,
                    );
                    break;

                // extract DOCX content
                case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                    text = await this.extractDocx(
                        document.filePath,
                    );
                    break;

                default:
                    throw new BusinessException('Unsupported file type');
            }


            // chunk the text
            const chunks = this.chunkText(text);

            // create document chunks
            const result = await this.documentRepository.createDocumentChunks(documentId, chunks);

            for (const chunk of chunks) {

                // generating Ai Chunks
                const embedding = await this.aiService.generateEmbedding(
                    chunk
                );

                await this.qdrantService.storeVector(
                    embedding,
                    {
                        documentId,
                        userId,
                        chunkId: chunks.indexOf(chunk),
                        content: chunk,
                    },
                );

                // TODO: Store embedding in Qdrant
            }

            return {
                success: true,
                message: 'Content extraction completed',
                data: {
                    documentId,
                    chunksCreated: result.count,
                },
            };
        } catch (error) {
            if (error instanceof BusinessException || error instanceof NotFoundException) {
                throw error;
            }
            throw new BusinessException('Failed to extract content');
        }
    }

    async extractPdf(filePath: string) {
        try {
            // read the file
            const buffer = fs.readFileSync(filePath);

            // parse the PDF
            const parser = new PDFParse({
                data: buffer,
            });

            const parsedResult = await parser.getText();
            return parsedResult.text;
        } catch (error) {
            throw new BusinessException('Failed to extract PDF content');
        }
    }

    private chunkText(text: string, chunkSize = 1000): string[] {
        const chunks: string[] = [];

        for (
            let i = 0;
            i < text.length;
            i += chunkSize
        ) {
            chunks.push(
                text.slice(
                    i,
                    i + chunkSize,
                ),
            );
        }

        return chunks;
    }

    private async extractDocx(filePath: string) {
        try {
            const result = await mammoth.extractRawText({
                path: filePath,
            });

            return result.value;
        } catch (error) {
            throw new BusinessException('Failed to extract DOCX content');
        }
    }

    private async extractTxt(filePath: string) {
        try {
            return fs.readFileSync(filePath, 'utf8');
        } catch (error) {
            throw new BusinessException('Failed to extract TXT content');
        }
    }

    async deleteDocument(documentId: number, userId: number) {
        try {
            const document = await this.documentRepository.findFirstDocument(documentId, userId);

            if (!document) {
                throw new NotFoundException('Document not found');
            }

            const fullPath = path.join(process.cwd(), document.filePath);

            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            }

            await this.documentRepository.deleteDocument(documentId, userId);

            await this.qdrantService.deleteByDocumentId(documentId,userId);

            return {
                success: true,
                message: 'Document deleted successfully',
            };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BusinessException('Failed to delete document');
        }
    }
}
