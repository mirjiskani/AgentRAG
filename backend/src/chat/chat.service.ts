import { Injectable } from '@nestjs/common';
import { AiService } from 'src/ai/ai.service';
import { QdrantService } from 'src/qdrant/qdrant.service';
import { BusinessException } from 'src/common/exceptions';

@Injectable()
export class ChatService {
    constructor(private readonly AiService: AiService, private readonly qdrantService: QdrantService) { }
    async chat(userId: number, question: string, documentId: number) {
        if (!question || question.trim().length === 0) {
            throw new BusinessException('Question cannot be empty');
        }

        if (!documentId) {
            throw new BusinessException('Document ID is required');
        }

        try {
            // Generate Embendings for the question
            const embedding = await this.AiService.generateEmbedding(question);
            // Search for similar documents in Qdrant
            const qdrantSearch = await this.qdrantService.search(embedding, documentId, userId);
            // Join the context from the search results
            const context = qdrantSearch.map((item) => item.payload?.content).join('\n\n');
            const generatedAnswer = await this.AiService.generateAnswer(context, question);
            console.log(generatedAnswer)
            return {
                success: true,
                message: 'Chat response created',
                data: {
                    userId: userId,
                    question: question,
                    documentId: documentId,
                    response: generatedAnswer
                }
            }
        } catch (error) {
            throw new BusinessException('Failed to generate answer');
        }
    }

    // async askquestion(question: string,documentId: number,userId:number) {
    //     const questionEmbendings = await this.AiService.generateEmbedding(question);
    //     // TODO: Implement answer generation logic

    //     const vectorStore = await this.qdrantService.search(questionEmbendings, documentId, userId);
    // }
}
