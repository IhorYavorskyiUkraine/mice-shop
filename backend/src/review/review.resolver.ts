import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtGuard } from 'src/auth/guard';
import { CreateReviewArgs, GetProductReviewsArgs } from './dto';
import { PaginatedReviewsResponse } from './models/paginated-reviews.model';
import { Review } from './models/review.model';
import { ReviewService } from './review.service';

@Resolver()
export class ReviewResolver {
   constructor(
      private readonly reviewService: ReviewService,
      private readonly authService: AuthService,
   ) {}

   @Query(() => PaginatedReviewsResponse)
   async getProductReviews(@Args('args') args: GetProductReviewsArgs) {
      return this.reviewService.getProductReviews(args);
   }

   @UseGuards(JwtGuard)
   @Mutation(() => Review)
   async createReview(
      @Args('args') args: CreateReviewArgs,
      @Context() context: { req: Request; res: Response },
   ) {
      const { userId } = await this.authService.getValidUserIdOrThrow(
         context.req,
         context.res,
      );

      return this.reviewService.createReview(args, userId);
   }
}
