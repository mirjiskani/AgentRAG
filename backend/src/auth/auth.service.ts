import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) { }

    // Generate password hash
    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    // Compare password with hash
    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    // Register user
    async register(registerDto: RegisterDto) {
        const hashedPassword = await this.hashPassword(registerDto.password);

        // find user by email
        const findUser = await this.prisma.user.findUnique({
            where: {
                email: registerDto.email,
            },
        });

        // check if user already exists
        if (findUser) {
            throw new BadRequestException('User already exists');
        }
        
        // create user
        const user = await this.prisma.user.create({
            data: {
                email: registerDto.email,
                name: registerDto.name,
                password: hashedPassword,
            },
        });
        return {
            success: true,
            message: 'User registered successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            },
        };
    }

    // Login user
    async login(loginDto: LoginDto) {
        
        // find user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: loginDto.email,
            },
        });
        
        // check if user exists
        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }
        
        // check if password is valid
        const isPasswordValid = await this.comparePassword(loginDto.password, user.password);
        
        if (!isPasswordValid) {
            throw new BadRequestException('Invalid credentials');
        }
        
        const payload = { id: user.id, email: user.email };
        
        // Generate access token

        const _accessToken = await this.jwtService.signAsync(payload);
        
        return {
            success: true,
            message: 'User logged in successfully',
            accessToken: _accessToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            },
        };
    }

}
