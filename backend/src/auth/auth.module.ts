import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import JwtStrategy from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  // Import PrismaModule and JwtModule
  // JwtModule is used for generating and verifying JWT tokens
  // secret: JWT secret key
  // signOptions: JWT sign options
  imports: [PrismaModule, JwtModule.register({})],
})
export class AuthModule {}
