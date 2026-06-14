import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { QdrantModule } from 'src/qdrant/qdrant.module';
import { AiModule } from 'src/ai/ai.module';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService],
  imports: [QdrantModule, AiModule]
})
export class DocumentsModule {}
