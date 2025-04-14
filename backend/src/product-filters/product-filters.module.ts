import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from './../product/product.service';
import { ProductFiltersResolver } from './product-filters.resolver';
import { ProductFiltersService } from './product-filters.service';

@Module({
   providers: [
      ProductFiltersResolver,
      ProductFiltersService,
      ProductService,
      PrismaService,
   ],
})
export class ProductFiltersModule {}
