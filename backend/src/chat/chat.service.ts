import { Injectable } from '@nestjs/common';
import { AiService } from 'src/ai/ai.service';
import { QdrantService } from 'src/qdrant/qdrant.service';
import { BusinessException } from 'src/common/exceptions';

@Injectable()
export class ChatService {
    constructor(private readonly AiService: AiService, private readonly qdrantService: QdrantService) {}
    async chat(userId: number, question: string, documentId: number) {
        if (!question || question.trim().length === 0) {
            throw new BusinessException('Question cannot be empty');
        }

        if (!documentId) {
            throw new BusinessException('Document ID is required');
        }

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
