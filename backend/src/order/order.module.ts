import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { CartService } from 'src/cart/cart.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';

@Module({
   providers: [
      OrderResolver,
      OrderService,
      ConfigService,
      AuthService,
      PrismaService,
      UserService,
      JwtService,
      CartService,
      UserService,
   ],
})
export class OrderModule {}
