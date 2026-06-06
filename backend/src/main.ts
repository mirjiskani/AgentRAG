import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

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

  // set global prefix
  app.setGlobalPrefix('api');

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
    .addBearerAuth()
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
