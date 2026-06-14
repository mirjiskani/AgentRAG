import { Injectable } from '@nestjs/common';
import { AiService } from 'src/ai/ai.service';
import { QdrantService } from 'src/qdrant/qdrant.service';

@Injectable()
export class ChatService {
    constructor(private readonly AiService: AiService, private readonly qdrantService: QdrantService) {}
    async chat(userId: number, question: string, documentId: number) {
        // TODO: Implement chat logic
        const embedding = await this.AiService.generateEmbedding(question);
        const qdrantSearch = await this.qdrantService.search(embedding, documentId, userId);

        return {
            success: true,
            message: 'Chat response created',
            data: {
                userId: userId,
                question: question,
                documentId: documentId,
                response: qdrantSearch
            }
        }
    }
}
