import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   app.setGlobalPrefix('api');
   app.use(cookieParser());
   app.enableCors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
   });
   await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
