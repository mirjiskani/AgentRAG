import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ChatService } from './chat.service';
import ChatDto from './dto/chat.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HistoryDto } from './dto/history.dto';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {

    }

    @UseGuards(JwtAuthGuard)
    @Throttle({ default: { limit: 30, ttl: 60000 } }) // 30 chat requests per minute
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Ask from AI about document' })
    @ApiResponse({ status: 200, description: 'Chat response generated successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiBody({ type: ChatDto })
    @Post('get-answer')
    async chat(@Body() chatDto: ChatDto,@Req() req) {
        return this.chatService.chat(
            req.user.userId,
            chatDto.question,
            chatDto.documentId
        );
    }

    @UseGuards(JwtAuthGuard)
    @Throttle({ default: { limit: 30, ttl: 60000 } }) // 30 chat requests per minute
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Get chat history' })
    @ApiResponse({ status: 200, description: 'Chat history retrieved successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiBody({ type: HistoryDto })
    @Post('get-history')
    async getHistory(@Body() historyDto: HistoryDto,@Req() req) {
        return this.chatService.getMessageHistory(
            req.user.userId,
            historyDto.documentId
        );
    }
}


