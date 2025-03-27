import {
   BadRequestException,
   Injectable,
   InternalServerErrorException,
   NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAllProductsArgs } from './dto';

@Injectable()
export class ProductService {
   constructor(private prisma: PrismaService) {}

   async getAllProducts(args: GetAllProductsArgs) {
      try {
         const { name, tagId, brandId, rating, orderBy, limit, offset } = args;

         if (limit && limit <= 0) {
            throw new BadRequestException('Limit must be a positive number');
         }

         if (offset && offset < 0) {
            throw new BadRequestException('Offset cannot be negative');
         }

         const products = await this.prisma.product.findMany({
            where: {
               name: name ? { contains: name, mode: 'insensitive' } : undefined,

               tags: tagId
                  ? {
                       some: {
                          tagId: tagId,
                       },
                    }
                  : undefined,
               brandId: brandId ? brandId : undefined,

               rating: rating ? { gte: rating } : undefined,
            },
            orderBy: {
               rating: orderBy === 'asc' ? 'asc' : 'desc',
            },
            take: limit ? limit : 10,
            skip: offset ? offset : 0,
         });

         if (products.length === 0) {
            throw new NotFoundException(
               'No products found matching the criteria.',
            );
         }

         return products;
      } catch (e) {
         console.error('Error fetching products:', e);
         throw new InternalServerErrorException(
            'Error fetching products. Please try again later.',
         );
      }
   }

   async getProductById(id: number) {
      try {
         if (!id || id <= 0) {
            throw new BadRequestException('Invalid product ID');
         }

         const product = await this.prisma.product.findUnique({
            where: { id },
         });

         if (!product) {
            throw new NotFoundException('Product not found');
         }

         return product;
      } catch (e) {
         console.error('Error fetching product:', e);
         throw new InternalServerErrorException(
            'Error fetching product. Please try again later.',
         );
      }
   }
}
