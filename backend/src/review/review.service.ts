import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewArgs, GetProductReviewsArgs } from './dto';

@Injectable()
export class ReviewService {
   constructor(private prisma: PrismaService) {}

   async getProductReviews(args: GetProductReviewsArgs) {
      try {
         const { productId, orderBy, limit, offset } = args;

         if (!productId || productId <= 0) {
            throw new BadRequestException(
               'Product ID is required and must be a positive number.',
            );
         }

         if (limit < 0 || offset < 0) {
            throw new BadRequestException(
               'Limit and offset must be greater than or equal to 0.',
            );
         }

         const reviews = await this.prisma.review.findMany({
            where: {
               productId,
            },
            include: {
               user: true,
            },
            orderBy:
               orderBy.length === 2
                  ? [{ [orderBy[0]]: orderBy[1] as 'asc' | 'desc' }]
                  : [{ createdAt: 'desc' }],
            take: limit,
            skip: offset,
         });

         const { totalPages, totalReviews, currentPage } =
            await this.getTotalPages(args);

         return { reviews, totalPages, totalReviews, currentPage };
      } catch (e) {
         console.error(e);
         throw new BadRequestException('Error fetching product reviews');
      }
   }

   async createReview(args: CreateReviewArgs, userId: number) {
      try {
         const { productId, rating, comment } = args;

         if (!productId || productId <= 0) {
            throw new BadRequestException(
               'Product ID is required and must be a positive number.',
            );
         }

         const review = await this.prisma.review.create({
            data: {
               userId,
               productId,
               rating,
               comment,
            },
            include: {
               user: true,
            },
         });

         return review;
      } catch (e) {
         console.error(e);
      }
   }

   async getTotalPages(args: GetProductReviewsArgs) {
      try {
         const { productId, limit, offset } = args;

         const totalReviews = await this.prisma.review.count({
            where: {
               productId,
            },
         });

         const totalPages = Math.ceil(totalReviews / limit);

         const currentPage = offset / limit + 1;

         return { totalPages, totalReviews, currentPage };
      } catch (e) {
         console.error(e);
      }
   }
}
