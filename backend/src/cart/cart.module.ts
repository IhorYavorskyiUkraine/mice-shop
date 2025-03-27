import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
   imports: [AuthModule],
   providers: [CartResolver, CartService, PrismaService],
})
export class CartModule {}
