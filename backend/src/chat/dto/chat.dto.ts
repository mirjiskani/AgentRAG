import { IsInt, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export default class ChatDto {
    @IsInt()
    @ApiProperty({
        example: 1,
        description: 'Document ID to chat with'
    })
    documentId: number;
    
    @IsString()
    @ApiProperty({
        example: 'What is the main topic of this document?',
        description: 'Question to ask about the document'
    })
    question: string;   
}