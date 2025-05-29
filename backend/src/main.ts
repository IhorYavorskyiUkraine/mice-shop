import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { GuestMiddleware } from './middlewares/set-guest-token.middleware';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   app.setGlobalPrefix('api');
   app.use(cookieParser());
   app.use(GuestMiddleware(app.get(JwtService), app.get(ConfigService)));
   app.enableCors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
      allowedHeaders: ['Content-Type'],
   });
   await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
