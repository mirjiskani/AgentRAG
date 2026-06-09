import { Injectable } from '@nestjs/common';
import { File } from 'multer';
import { PDFParse } from 'pdf-parse';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';

@Injectable()
export class DocumentsService {
    constructor(private readonly prisma: PrismaService) { }

    async uploadFile(file: File, userId: number) {

        const result = await this.prisma.document.create({
            data: {
                fileName: file.originalname,
                filePath: file.path,
                mimeType: file.mimetype,
                size: file.size,
                userId,
            },
        });

        try {

            // call extractContent to extract content from the document

            const extractionResult = await this.extractContent(result.id);

            if (!extractionResult.success) {
                return {
                    success: false,
                    message: 'Error extracting content',
                };
            }
        } catch (error) {
            return {
                success: false,
                message: 'Error extracting content',
            };
        }

        return {
            success: true,
            message: 'File uploaded successfully',
            data: result,
        };
    }


    async listDocuments(userId: number) {
        const documents = await this.prisma.document.findMany({
            where: {
                userId,
            },
        });

        return {
            success: true,
            message: 'Documents listed successfully',
            data: documents,
        };
    }

    async extractContent(documentId: number) {
        try {

            // find the document
            const document = await this.prisma.document.findUnique({
                where: {
                    id: documentId,
                },
            });

            if (!document) {
                throw new Error('Document not found');
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
                    throw new Error(
                        'Unsupported file type',
                    );
            }


            // chunk the text
            const chunks = this.chunkText(text);

            // create document chunks
            const result =
                await this.prisma.documentChunk.createMany({
                    data: chunks.map((chunk) => ({
                        documentId,
                        content: chunk,
                    })),
                });


            return {
                success: true,
                message: 'Content extraction completed',
                data: {
                    documentId,
                    chunksCreated: result.count,
                },
            };
        } catch (error) {
            console.error('EXTRACT ERROR:', error);
            throw error;
        }
    }

    async extractPdf(filePath: string) {
        // TODO: Implement PDF extraction

        // read the file
        const buffer = fs.readFileSync(filePath);

        // parse the PDF
        const parser = new PDFParse({
            data: buffer,
        });

        const parsedResult = await parser.getText();
        return parsedResult.text;
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
        const result =
            await mammoth.extractRawText({
                path: filePath,
            });

        return result.value;
    }

    private async extractTxt(
        filePath: string,
    ) {
        return fs.readFileSync(
            filePath,
            'utf8',
        );
    }

    async deleteDocument(documentId: number, userId: number) {
        const document = await this.prisma.document.findFirst({
            where: {
                id: documentId,
                userId,
            },
        });


        if (!document) {
            throw new Error(
                'Document not found',
            );
        }

        const fullPath =
            path.join(
                process.cwd(),
                document.filePath,
            );

        if (
            fs.existsSync(fullPath)
        ) {
            fs.unlinkSync(fullPath);
        }

        if (!document) {
            return {
                success: false,
                message: 'Document not found',
            };
        }

        await this.prisma.document.delete({
            where: {
                id: documentId,
            },
        });

        return {
            success: true,
            message: 'Document deleted successfully',
        };
    }
}
