import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OtpService } from 'src/otp/otp.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
   providers: [
      AuthResolver,
      AuthService,
      PrismaService,
      UserService,
      JwtService,
      JwtStrategy,
      ConfigService,
      OtpService,
   ],
   exports: [AuthService],
})
export class AuthModule {}
