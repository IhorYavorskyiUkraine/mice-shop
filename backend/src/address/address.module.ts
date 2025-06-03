import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { OtpService } from 'src/otp/otp.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AddressResolver } from './address.resolver';
import { AddressService } from './address.service';

@Module({
   providers: [
      AddressResolver,
      AddressService,
      AuthService,
      PrismaService,
      UserService,
      JwtService,
      ConfigService,
      OtpService,
   ],
})
export class AddressModule {}
