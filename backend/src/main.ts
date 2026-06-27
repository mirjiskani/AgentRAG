import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './common/filters';
import { ThrottlerModule } from '@nestjs/throttler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // parse cookies
  app.use(cookieParser());
  
  // validate input
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // set global prefix
  app.setGlobalPrefix('api');

  // enable API versioning
  app.enableVersioning({
    type: VersioningType.URI, // URI versioning (e.g., /api/v1/...)
    defaultVersion: '1',
  });

  // use cors for specific origin

   app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  });

  // setup swagger
  const config = new DocumentBuilder()
    .setTitle('AgentRAG API')
    .setDescription('AgentRAG Backend APIs')
    .setVersion('1.0')
    .addCookieAuth('access_token', {
      type: 'apiKey',
      in: 'cookie',
      name: 'access_token',
    }, 'access-token-cookie')
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Documents', 'Document management endpoints')
    .addTag('AI', 'AI and embedding endpoints')
    .addTag('Chat', 'Chat with documents endpoints')
    .build();

  const document =
    SwaggerModule.createDocument(
      app,
      config,
    );

  SwaggerModule.setup(
    'api/docs',
    app,
    document,
  );


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
