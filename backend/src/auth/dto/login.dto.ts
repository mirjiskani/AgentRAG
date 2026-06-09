import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'mirjiskani1@gmail.co',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Jiskanimir',
  })
  @IsString()
  @MinLength(8)
  password: string;
}

