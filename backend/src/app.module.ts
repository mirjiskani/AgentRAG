import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DocumentsModule } from './documents/documents.module';
import { QdrantModule } from './qdrant/qdrant.module';
import { AiModule } from './ai/ai.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, DocumentsModule, QdrantModule, AiModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
