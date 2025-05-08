import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';

@Module({
   imports: [AuthModule],
   providers: [
      CartResolver,
      CartService,
      PrismaService,
      JwtService,
      ConfigService,
   ],
})
export class CartModule {}
