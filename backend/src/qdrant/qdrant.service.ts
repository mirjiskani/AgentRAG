import { Injectable, OnModuleInit } from '@nestjs/common';
import { QdrantClient } from '@qdrant/js-client-rest';

@Injectable()
export class QdrantService implements OnModuleInit {
    private readonly client: QdrantClient;

    constructor() {
        this.client = new QdrantClient({
            url: process.env.QDRANT_URL || 'http://localhost:6333',
        });
    }

    async onModuleInit() {
        // TODO: Initialize Qdrant client
        // create collection in Qdrant
        await this.createCollection();
    }

    private async createCollection() {
        // TODO: Create Qdrant collection

        const collections =
            await this.client.getCollections();

        const exists =
            collections.collections.some(
                c => c.name === 'documents',
            );
        const ollamaExists =
            collections.collections.some(
                c => c.name === 'documents_ollama',
            );

        if (!exists) {
            await this.client.createCollection(
                'documents',
                {
                    vectors: {
                        size: 1536,// for open ai 
                        distance: 'Cosine',
                    },
                },
            );

            console.log(
                'Qdrant documents collection created',
            );
        }

        if (!ollamaExists) {
            await this.client.deleteCollection(
                'documents_ollama',
            );

            await this.client.createCollection(
                'documents_ollama',
                {
                    vectors: {
                        size: 768,
                        distance: 'Cosine',
                    },
                },
            );
            console.log(
                'Qdrant documents_ollama collection created',
            );
        }
    }

    getClient(): QdrantClient {
        return this.client;
    }

    async storeVector(embedding: number[], payload: any) {
        await this.client.upsert('documents_ollama', {
            wait: true,
            points: [
                {
                    id: Date.now(),
                    vector: embedding,
                    payload,
                },
            ],
        });
    }

    async deleteByDocumentId(documentId: number) {
        await this.client.delete(
            'documents_ollama',
            {
                filter: {
                    must: [
                        {
                            key: 'documentId',
                            match: {
                                value: documentId,
                            },
                        },
                    ],
                },
            },
        );
    }

}
