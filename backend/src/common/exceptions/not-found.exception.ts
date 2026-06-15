import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(message: string = 'Resource not found') {
    super(
      {
        success: false,
        statusCode: HttpStatus.NOT_FOUND,
        message,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
