import { Injectable, OnModuleInit } from '@nestjs/common';
import { QdrantClient } from '@qdrant/js-client-rest';
import { BusinessException } from 'src/common/exceptions';

@Injectable()
export class QdrantService implements OnModuleInit {
    private readonly client: QdrantClient;

    constructor() {
        this.client = new QdrantClient({
            url: process.env.QDRANT_URL || 'http://localhost:6333',
        });
    }

    async onModuleInit() {
        try {
            // TODO: Initialize Qdrant client
            // create collection in Qdrant
            await this.createCollection();
        } catch (error) {
            console.error('Failed to initialize Qdrant:', error);
            throw new BusinessException('Failed to initialize Qdrant');
        }
    }

    private async createCollection() {
        try {
            // TODO: Create Qdrant collection

            const collections = await this.client.getCollections();

            const exists = collections.collections.some(
                c => c.name === 'documents',
            );
            const ollamaExists = collections.collections.some(
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
        } catch (error) {
            throw new BusinessException('Failed to create Qdrant collection');
        }
    }

    getClient(): QdrantClient {
        return this.client;
    }

    async storeVector(embedding: number[], payload: any) {
        try {
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
        } catch (error) {
            throw new BusinessException('Failed to store vector in Qdrant');
        }
    }

    async deleteByDocumentId(documentId: number) {
        try {
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
        } catch (error) {
            throw new BusinessException('Failed to delete vectors from Qdrant');
        }
    }

    async search(embedding: number[], documentId: number, userId: number) {
        try {
            const result = await this.client.search('documents_ollama', {
                vector: embedding,
                limit: 10,
                filter: {
                    must: [
                        {
                            key: 'documentId',
                            match: {
                                value: documentId,
                            },
                        },
                        {
                            key: 'userId',
                            match: {
                                value: userId,
                            },
                        },
                    ],
                },
            });
            return result;
        } catch (error) {
            throw new BusinessException('Failed to search vectors in Qdrant');
        }
    }
}
