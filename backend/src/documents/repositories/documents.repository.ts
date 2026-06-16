
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
@Injectable()

export default class DocumentsRepository {
    constructor(private readonly prisma: PrismaService) {}
 

    async createDocument(data: {
    fileName: string;
    filePath: string;
    mimeType: string;
    size: number;
    userId: number;
  }) {
    return this.prisma.document.create({
      data,
    });
  }
// find Document by user
  async findDocumentsByUserId(userId: number) {
    return this.prisma.document.findMany({
      where: {
        userId,
      },
    });
  }

  // find unique document 

  async findUniqueDocument(documentId: number) {
    return this.prisma.document.findUnique({
      where: {
        id: documentId,
      },
    });
  }

  // create document chunks // save many chunks in Database 

  async createDocumentChunks(documentId: number, chunks: string[]) {
    return this.prisma.documentChunk.createMany({
      data: chunks.map((chunk) => ({
        documentId,
        content: chunk,
      })),
    });
  }

  // find firstDocumet 
  async findFirstDocument(documentId: number, userId: number) {
    return this.prisma.document.findFirst({
      where: {
        id: documentId,
        userId,
      },
    });
  }

  // delete document of user .
  async deleteDocument(documentId: number, userId: number) {
    return this.prisma.document.delete({
      where: {
        id: documentId,
        userId,
      },
    });
  }
  
}

     