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
                     colors: {
                        include: {
                           code: true,
                        },
                     },
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

         const rating = this.calcRating(product.reviews);
         await this.onVisit(id, rating);

         return product;
      } catch (e) {
         console.error('Error fetching product:', e);
         throw new InternalServerErrorException(
            'Error fetching product. Please try again later.',
         );
      }
   }

   async getLikedModels(productCode: string, userId: number) {
      try {
         const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { likedModels: true },
         });

         if (!user) {
            throw new NotFoundException('User not found');
         }

         const products = user?.likedModels;

         return products;
      } catch (e) {
         console.error(e);
      }
   }

   async addToLiked(productCode: string, userId: number) {
      try {
         // const color = await this.prisma.color.findUnique({
         //    where: { code: productCode },
         //    include: { model: true },
         // });
         // if (!color) {
         //    throw new NotFoundException('Color not found');
         // }
         // await this.prisma.user.update({
         //    where: { id: userId },
         //    data: {
         //       likedModels: {
         //          connect: { id: color.model.id },
         //       },
         //    },
         // });
         // return color.model;
      } catch (e) {
         console.error(e);
         throw new InternalServerErrorException('Could not like model');
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

   async onVisit(productId: number, rating: number) {
      return this.prisma.product.update({
         where: { id: productId },
         data: { rating, views: { increment: 1 } },
      });
   }

   calcRating(reviews: { rating: number }[]) {
      if (!reviews.length) return 0;

      const totalRating = reviews.reduce(
         (acc, review) => acc + review.rating,
         0,
      );

      return Math.round((totalRating / reviews.length) * 10) / 10;
   }
}
