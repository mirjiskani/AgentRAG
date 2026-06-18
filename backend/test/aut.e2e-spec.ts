import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule =
            await Test.createTestingModule({
                imports: [AppModule],
            }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    // getting success response 
    it('should login successfully', async () => {
        const response = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123',
            });

        expect(response.status).toBe(201);

        expect(response.body.success).toBe(true);

        expect(response.body.accessToken).toBeDefined();

        expect(response.body.user).toBeDefined();

        expect(response.body.user.email).toBe(
            'test@example.com',
        );
    });
    
    // getting failed response
    it('should reject invalid password', async () => {
        const response = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: 'test@example.com',
                password: 'wrong-password',
            });

        expect(response.status).toBe(400);
    });
});