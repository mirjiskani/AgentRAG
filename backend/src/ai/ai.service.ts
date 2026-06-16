import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BusinessException } from 'src/common/exceptions';

@Injectable()
export class AiService {
    constructor(private readonly prisma: PrismaService) { }
    async generateEmbedding(text: string) {
        try {
            const response = await fetch(process.env.OLLAMA_URL + '/api/embeddings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'nomic-embed-text',
                    prompt: text
                })
            });

            if (!response.ok) {
                throw new BusinessException(`Ollama API error: ${response.statusText}`);
            }

            const data = await response.json();
            return data.embedding;
        } catch (error) {
            if (error instanceof BusinessException) {
                throw error;
            }
            throw new BusinessException('Failed to generate embedding');
        }
    }

    async generateAnswer(context: string, question: string) {

        try {
            const prompt = `Answer ONLY using the provided context.
                            Context:
                            ${context}
                            Question:
                            ${question}
`;
            const response =
                await fetch(
                    process.env.OLLAMA_URL + '/api/generate',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type':
                                'application/json',
                        },
                        body: JSON.stringify({
                            model: process.env.OLLAMA_MODEL,
                            prompt,
                            stream: false,
                        }),
                    },
                );

            const data = await response.json();
            console.log('data',data);

            return data.response;
        } catch (error) {
            if (error instanceof BusinessException) {
                throw error;
            }
            throw new BusinessException('Failed to generate AI response');
        }
    }
}
