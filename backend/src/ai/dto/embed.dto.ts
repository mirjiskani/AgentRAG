import { ApiProperty } from '@nestjs/swagger';

export class EmbedDto {
    @ApiProperty({
        example: 'Hello world',
    })
    text: String;
}
