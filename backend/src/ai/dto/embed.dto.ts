import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class EmbedDto {
    @ApiProperty({
        example: 'Hello world',
    })
    @IsString()
    @IsNotEmpty()
    text: string;
}
