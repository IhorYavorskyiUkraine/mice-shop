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
         const {
            name,
            tagId,
            brandId,
            views,
            new: newProduct,
            rating,
            orderBy,
            limit,
            offset,
         } = args;

         if (limit !== undefined && limit <= 0) {
            throw new BadRequestException('Limit must be a positive number');
         }
         if (offset !== undefined && offset < 0) {
            throw new BadRequestException('Offset cannot be negative');
         }

         const products = await this.prisma.product.findMany({
            where: {
               name: name ? { contains: name, mode: 'insensitive' } : undefined,
               tags: tagId ? { some: { tagId } } : undefined,
               brandId: brandId ?? undefined,
               rating: rating ? { gte: rating } : undefined,
            },
            orderBy: {
               rating: orderBy ? 'desc' : undefined,
               createdAt: newProduct ? 'desc' : undefined,
               views: views ? 'desc' : undefined,
            },
            take: limit ?? 10,
            skip: offset ?? 0,
            include: {
               generalSpecs: true,
               models: {
                  include: {
                     specs: true,
                     colors: true,
                  },
               },
               category: true,
               tags: {
                  include: {
                     tag: true,
                  },
               },
               brand: true,
            },
         });

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
            include: {
               generalSpecs: true,
               models: {
                  include: {
                     colors: true,
                     specs: true,
                  },
               },
               reviews: {
                  include: {
                     user: {
                        select: {
                           displayName: true,
                           // image: true (uncomment when ready)
                        },
                     },
                  },
               },
            },
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

   async getAllProductCategories() {
      try {
         const categories = await this.prisma.category.findMany({
            include: {
               products: true,
            },
         });

         if (!categories) {
            throw new NotFoundException('No categories found');
         }

         return categories;
      } catch (e) {
         console.error(e);
         throw new InternalServerErrorException(
            'Error fetching categories. Please try again later.',
         );
      }
   }
}
