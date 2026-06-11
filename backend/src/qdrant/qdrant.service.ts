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

        if (!exists) {
            await this.client.createCollection(
                'documents',
                {
                    vectors: {
                        size: 1536,
                        distance: 'Cosine',
                    },
                },
            );

            console.log(
                'Qdrant documents collection created',
            );
        }
    }

    getClient(): QdrantClient {
        return this.client;
    }

}
