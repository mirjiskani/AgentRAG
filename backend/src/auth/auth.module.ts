import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  // Import PrismaModule and JwtModule
  // JwtModule is used for generating and verifying JWT tokens
  // secret: JWT secret key
  // signOptions: JWT sign options
  imports: [PrismaModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      // expiresIn: '1h', // 1 hour expiration (for testing)
      expiresIn: '1d', // 1 day expiration
    },
  })],
})
export class AuthModule {}
