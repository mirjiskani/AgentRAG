import { Injectable } from '@nestjs/common';
import { File } from 'multer';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DocumentsService {
    constructor(private readonly prisma: PrismaService) { }

    async uploadFile(file: File, userId: number) {

        const result = await this.prisma.document.create({
            data: {
                fileName: file.originalname,
                filePath: file.path,
                mimeType: file.mimetype,
                size: file.size,
                userId,
            },
        });

        return {
            success: true,
            message: 'File uploaded successfully',
            data: result,
        };
    }

}
