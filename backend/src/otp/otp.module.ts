import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { OtpResolver } from './otp.resolver';
import { OtpService } from './otp.service';

@Module({
   providers: [
      OtpResolver,
      OtpService,
      JwtService,
      UserService,
      PrismaService,
      ConfigService,
   ],
})
export class OtpModule {}
