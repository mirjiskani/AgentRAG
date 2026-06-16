import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { BusinessException, NotFoundException } from 'src/common/exceptions';
import { AuthRepository } from './repositories/auth.repository';

@Injectable()
export class AuthService {

    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService, private readonly authRepository: AuthRepository) { }

    // Generate password hash
    async hashPassword(password: string): Promise<string> {
        try {
            const saltRounds = 10;
            return bcrypt.hash(password, saltRounds);
        } catch (error) {
            throw new BusinessException('Failed to hash password');
        }
    }

    // Compare password with hash
    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        try {
            return bcrypt.compare(password, hashedPassword);
        } catch (error) {
            throw new BusinessException('failed');
        }
    }

    // Register user
    async register(registerDto: RegisterDto) {
        try {
            const hashedPassword = await this.hashPassword(registerDto.password);

            // find user by email
            const findUser = await this.authRepository.findUserByEmail(registerDto.email);

            // check if user already exists
            if (findUser) {
                throw new BusinessException('User already exists');
            }

            // create user
            const user = await this.authRepository.createUser(registerDto.email, registerDto.name, hashedPassword);
           
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
        } catch (error) {
            if (error instanceof BusinessException) {
                throw error;
            }
            throw new BusinessException('Failed to register user');
        }
    }

    // Login user
    async login(loginDto: LoginDto) {
        try {
            // find user by email
            const user = await this.authRepository.findUserByEmail(loginDto.email);

            // check if user exists
            if (!user) {
                throw new BusinessException('Invalid credentials');
            }

            // check if password is valid
            const isPasswordValid = await this.comparePassword(loginDto.password, user.password);

            if (!isPasswordValid) {
                throw new BusinessException('Invalid credentials');
            }

            const payload = { id: user.id, email: user.email };

            // Generate access token
            const tokens = await this.generateToken(payload);
            // save token sesssions 
            await this.authRepository.saveTokenSessions(user.id, tokens.refreshToken);
            return {
                success: true,
                message: 'User logged in successfully',
                accessToken: tokens.accessToken,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt
                },
                refreshToken: tokens.refreshToken,
            };
        } catch (error) {
            if (error instanceof BusinessException) {
                throw error;
            }
            throw new BusinessException('Failed to login');
        }
    }
    
    // Generate token
    private async generateToken(payload: { id: number; email: string }) {
        try {
            // Generate access token for short term use
            const accessToken = await this.jwtService.signAsync(payload, {
                secret: process.env.ACCESS_TOKEN_SECRET,
                expiresIn: '15m', // 15 minutes
            });
            // Generate refresh token for long term use
            const refreshToken = await this.jwtService.signAsync(payload, {
                secret: process.env.REFRESH_TOKEN_SECRET,
                expiresIn: '7d', // 7 days
            });
            return { accessToken, refreshToken };
        } catch (error) {
            throw new BusinessException('Failed to generate token');
        }
    }

    async accessRefreshToken(refreshToken: string) {
        try {
            const session = await this.authRepository.findByRefreshToken(refreshToken);
            if (!session) {
                throw new BusinessException('Invalid refresh token');
            }
            const newTokens = await this.generateToken({ id: session.user.id, email: session.user.email });
            return {
                success: true,
                message: 'Token refreshed successfully',
                accessToken: newTokens.accessToken,
                refreshToken: newTokens.refreshToken,
            };
        } catch (error) {
            if (error instanceof BusinessException) {
                throw error;
            }
            throw new BusinessException('Invalid refresh token');
        }
    }

    // logout deletes the refresh token from the database
    async logout(refreshToken: string) {
        try {
            await this.authRepository.deleteByRefreshToken(refreshToken);
            return {
                success: true,
                message: 'User logged out successfully',
            };
        } catch (error) {
            throw new BusinessException('Failed to logout');
        }
    }
}
