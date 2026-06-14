import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AiService {
    constructor(private readonly prisma: PrismaService) { }
    async generateEmbedding(text: string){
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
        const data = await response.json();
        return data.embedding;
    }
}
