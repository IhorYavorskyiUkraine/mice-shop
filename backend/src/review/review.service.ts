import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewArgs, GetProductReviewsArgs } from './dto';

@Injectable()
export class ReviewService {
   constructor(private prisma: PrismaService) {}

   async getProductReviews(args: GetProductReviewsArgs) {
      try {
         const { productId, orderBy = 'desc', limit = 10, offset = 0 } = args;

         const sortOrder = orderBy === 'asc' ? 'asc' : 'desc';

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
            orderBy: {
               createdAt: sortOrder,
            },
            take: limit,
            skip: offset,
         });

         return reviews;
      } catch (e) {
         console.error(e);
         throw new BadRequestException('Error fetching product reviews');
      }
   }

   async createReview(args: CreateReviewArgs) {
      const { userId, productId, rating, comment } = args;
      return [
         {
            id: 1,
            userId,
            productId,
            rating,
            comment,
            createdAt: new Date(),
         },
      ];
   }
}
