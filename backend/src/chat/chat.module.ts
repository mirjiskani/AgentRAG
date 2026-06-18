import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AiModule } from 'src/ai/ai.module';
import { QdrantModule } from 'src/qdrant/qdrant.module';
import { ChatRepository } from './repositories/chat.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatRepository],
  imports: [AiModule, QdrantModule, PrismaModule]
})
export class ChatModule {}
