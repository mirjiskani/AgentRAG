import { Controller, Delete, Get, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from 'multer';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { extname } from 'path';
import { diskStorage } from 'multer';


@ApiTags('Documents')
@Controller('documents')
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) { }

    @ApiBearerAuth('access-token')
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Upload a document' })
    @ApiResponse({ status: 201, description: 'Document uploaded successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'
        , {
            limits: {
                fileSize: 1024 * 1024 * 10, // 10MB
            },
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const uniqueName =
                        Date.now() +
                        extname(file.originalname);

                    cb(null, uniqueName);
                },
            }),

        }
    ))
    async uploadFile(@UploadedFile() file: File, @Req() req: any) {
        // TODO: Get user from request
        const user = req.user.userId;
        return await this.documentsService.uploadFile(file, user);
    }


    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'List all documents for the authenticated user' })
    @ApiResponse({ status: 200, description: 'Documents retrieved successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Get('list')
    async listDocuments(@Req() req: any) {
        // TODO: Get user from request
        const user = req.user.userId;
        return await this.documentsService.listDocuments(user);
    }
    
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Delete a document by ID' })
    @ApiResponse({ status: 200, description: 'Document deleted successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Document not found' })
    @Delete('delete/:documentId')
    async deleteDocument(@Req() req: any, @Param('documentId') documentId: number) {
        // TODO: Get user from request
        const user = req.user.userId;
        return await this.documentsService.deleteDocument(documentId, user);
    }
    // @UseGuards(JwtAuthGuard)
    // @ApiBearerAuth('access-token')
    // @Get('chunks/:documentId')
    // async getDocumentChunks(@Req() req: any, @Param('documentId') documentId: number) {
    //     // TODO: Get user from request
    //     const user = req.user.userId;
    //     return await this.documentsService.getDocumentChunks(documentId, user);
    // }
}
