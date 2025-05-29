import { Injectable } from '@nestjs/common';
import { GraphqlErrorCode } from 'src/common/errors/graphql-error-codes.enum';
import { throwGraphQLError } from 'src/common/errors/graphql-errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewArgs, GetProductReviewsArgs } from './dto';

@Injectable()
export class ReviewService {
   constructor(private prisma: PrismaService) {}

   async getProductReviews(args: GetProductReviewsArgs) {
      try {
         const { productId, orderBy, limit, offset } = args;

         if (!productId || productId <= 0) {
            throwGraphQLError('Невірний ідентифікатор товару', {
               code: GraphqlErrorCode.BAD_USER_INPUT,
            });
         }

         if (limit < 0 || offset < 0) {
            throwGraphQLError(
               "Значення 'limit' або 'offset' не може бути від'ємним",
               {
                  code: GraphqlErrorCode.BAD_USER_INPUT,
               },
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
         throw e;
      }
   }

   async createReview(args: CreateReviewArgs, userId: number) {
      try {
         const { productId, rating, comment } = args;

         if (!productId || productId <= 0) {
            throwGraphQLError('Невірний ідентифікатор товару', {
               code: GraphqlErrorCode.BAD_USER_INPUT,
            });
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
         throw e;
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
         throw e;
      }
   }
}
