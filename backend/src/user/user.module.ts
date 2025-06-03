import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { OtpService } from 'src/otp/otp.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
   imports: [AuthModule],
   providers: [
      UserResolver,
      UserService,
      JwtService,
      PrismaService,
      OtpService,
      ConfigService,
   ],
})
export class UserModule {}
