import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createUser(email: string, name: string, password: string) {
        return this.prisma.user.create({
            data: {
                email: email,
                name: name,
                password: password,
            },
        });
    }

    async findUserByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    }

    async saveTokenSessions(userId: number, refreshToken: string) {
        return this.prisma.session.create({
            data: {
                userId: userId,
                refreshToken: refreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            },
        });
    }

    async findByRefreshToken(refreshToken: string) {
        return this.prisma.session.findFirst({
            where: {
                refreshToken: refreshToken,
            },
            include: {
                user: true,
            },
        });
    }

    async deleteByRefreshToken(refreshToken: string) {
        return this.prisma.session.deleteMany({
            where: {
                refreshToken: refreshToken,
            },
        });
    }
}
