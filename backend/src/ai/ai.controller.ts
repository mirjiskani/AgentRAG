import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AiService } from './ai.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiCookieAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmbedDto } from './dto/embed.dto';

@ApiTags('AI')
@Controller('ai')
export class AiController {
    constructor(private readonly aiService: AiService) {}
    
    @UseGuards(JwtAuthGuard)
    @Throttle({ default: { limit: 50, ttl: 60000 } }) // 50 embeddings per minute
    @ApiCookieAuth('access-token-cookie')
    @ApiOperation({ summary: 'Generate embedding for text' })
    @ApiResponse({ status: 200, description: 'Embedding generated successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBody({ type: EmbedDto })
    @Post('embedding')
    async embed(@Body() req: EmbedDto) {
        return await this.aiService.generateEmbedding(req.text);
    }
}
