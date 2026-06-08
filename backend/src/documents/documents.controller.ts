import { Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from 'multer';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { extname } from 'path';
import { diskStorage } from 'multer';


@Controller('documents')
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) { }

    @ApiBearerAuth('access-token')
    @ApiConsumes('multipart/form-data')
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
    uploadFile(@UploadedFile() file: File, @Req() req: any) {
        // TODO: Get user from request
        const user = req.user.userId;
        return this.documentsService.uploadFile(file, user);
    }
}
