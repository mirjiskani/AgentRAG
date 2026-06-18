import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class ChatRepository {
    constructor(private readonly prisma: PrismaService) { }

    // get or create chat session
    async getOrCreateSession(userId: number, documentId: number) {
        const session = await this.prisma.chatSession.findFirst({
            where: {
                userId: userId,
                documentId: documentId,
            },
        });

        if (!session) {
            return this.prisma.chatSession.create({
                data: {
                    userId: userId,
                    documentId: documentId,
                },
            });
        }

        return session;
    }

    // create chatMessages 
    async createChatMessage(sessionId: number, message: string, role: string) {
        return this.prisma.chatMessage.create({
            data: {
                chatSessionId: sessionId,
                role: role,
                content: message,
            },
        });
    }
    // get history of the document assistance chats
    async getMessageHistory(userId: number, documentId: number) {
        return this.prisma.chatMessage.findMany({
            where: {
                session: {
                    userId,
                    documentId,
                },
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
    }

}
