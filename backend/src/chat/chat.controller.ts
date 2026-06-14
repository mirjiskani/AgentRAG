import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import ChatDto from './dto/chat.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {

    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Ask from AI about document' })
    @ApiResponse({ status: 200, description: 'Chat response generated successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiBody({ type: ChatDto })
    @Post('chat')
    async chat(@Body() chatDto: ChatDto,@Req() req) {
        return this.chatService.chat(
            req.user.userId,
            chatDto.question,
            chatDto.documentId
        );
    }

}


