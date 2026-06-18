import { IsNumber } from "class-validator";

export class HistoryDto {
    @IsNumber()
    documentId: number;
}
