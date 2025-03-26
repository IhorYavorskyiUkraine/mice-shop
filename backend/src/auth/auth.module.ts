import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { TokenHelperService } from './tokenHelper.service';

@Module({
   providers: [
      TokenHelperService,
      AuthResolver,
      AuthService,
      PrismaService,
      UserService,
      JwtService,
      JwtStrategy,
      ConfigService,
   ],
   exports: [TokenHelperService],
})
export class AuthModule {}
