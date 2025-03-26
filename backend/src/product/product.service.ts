import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAllProductsArgs } from './dto';

@Injectable()
export class ProductService {
   constructor(private prisma: PrismaService) {}

   async getAllProducts(args: GetAllProductsArgs) {
      const {
         name,
         categoryId,
         colors,
         price,
         brandId,
         rating,
         orderBy,
         limit,
         offset,
      } = args;

      return this.prisma.product.findMany({
         where: {
            name: name ? { contains: name, mode: 'insensitive' } : undefined,

            categoryId: categoryId ? categoryId : undefined,

            colors:
               colors && colors.length > 0 ? { hasSome: colors } : undefined,

            price: price ? { gte: price.min, lte: price.max } : undefined,

            brandId: brandId ? brandId : undefined,

            rating: rating ? { gte: rating } : undefined,
         },
         orderBy: {
            rating: orderBy === 'asc' ? 'asc' : 'desc',
         },
         take: limit ? limit : 10,
         skip: offset ? offset : 0,
      });
   }

   async getProduct(id: number) {
      return this.prisma.product.findUnique({
         where: { id },
      });
   }
}
