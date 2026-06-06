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

        const tokens = await this.generateToken(payload);
        await this.prisma.session.create({
            data: {
                userId: user.id,
                refreshToken: tokens.refreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            },
        });
        
        return {
            success: true,
            message: 'User logged in successfully',
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            },
        };
    }
    
    // Generate token
   private async generateToken(payload: { id: number; email: string }) {
       
    // Generate access token for short term use
        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: '15m', // 15 minutes
        });
        // Generate refresh token for long term use
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '7d', // 7 days
        });
        return { accessToken, refreshToken };
    }

    async accessRefreshToken(refreshToken: string) {
        try {
            const session = await this.prisma.session.findFirst({
                where: {
                    refreshToken: refreshToken,
                },
                include: {
                    user: true,
                },
            });
            if (!session) {
                throw new BadRequestException('Invalid refresh token');
            }
            const newTokens = await this.generateToken({ id: session.user.id, email: session.user.email });
            return {
                success: true,
                message: 'Token refreshed successfully',
                accessToken: newTokens.accessToken,
                refreshToken: newTokens.refreshToken,
            };
        } catch (error) {
            throw new BadRequestException('Invalid refresh token');
        }
    }
}
