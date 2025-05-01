import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
   imports: [AuthModule],
   providers: [ProductResolver, ProductService, PrismaService],
})
export class ProductModule {}
