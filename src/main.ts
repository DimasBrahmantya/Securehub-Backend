import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation (best practice)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS: Local + Vercel
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://secure-hub-peach.vercel.app' // GANTI sesuai domain Vercel kamu
    ],
    credentials: true,
  });

  // Railway requires PORT from env
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Backend running on port ${port}`);
}

bootstrap();
