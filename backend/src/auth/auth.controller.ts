import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 requests per minute for register
    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Throttle({ default: { limit: 10, ttl: 60000 } }) // 10 requests per minute for login
    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res({passthrough: true}) res: Response) {
        const result = await this.authService.login(loginDto);
        res.cookie(
            'refresh_token',
            result.refreshToken,
            {
            httpOnly: true,
            sameSite: 'strict',
            maxAge:
                7 * 24 * 60 * 60 * 1000,
            },
        );
        const { refreshToken, ...data } = result;
        return data;
    }
    @Post('refresh')
    async refresh(@Body() refreshToken: string) {
        return this.authService.accessRefreshToken(refreshToken);
    }
    
    // logout deletes the refresh token from the database and clears the cookie
    @Post('logout')
    async logout(@Res({passthrough: true}) res: Response,@Req() req: Request) {
        const refreshToken = req.cookies.refresh_token;
        const result = await this.authService.logout(refreshToken);
        if(result.success) {
            res.clearCookie('refresh_token');
        }
        return result;
    }
}
