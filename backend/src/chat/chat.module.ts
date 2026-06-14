import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AiModule } from 'src/ai/ai.module';
import { QdrantModule } from 'src/qdrant/qdrant.module';

@Module({
  controllers: [ChatController],
  providers: [ChatService],
  imports: [AiModule, QdrantModule]
})
export class ChatModule {}
