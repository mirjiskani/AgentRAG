import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { QdrantModule } from 'src/qdrant/qdrant.module';
import { AiModule } from 'src/ai/ai.module';
import DocumentsRepository from './repositories/documents.repository';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService, DocumentsRepository],
  imports: [QdrantModule, AiModule]
})
export class DocumentsModule {}
