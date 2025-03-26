import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { TokenHelperService } from 'src/auth/tokenHelper.service';
import { CreateReviewArgs, GetProductReviewsArgs } from './dto';
import { Review } from './review.model';
import { ReviewService } from './review.service';

@UseGuards(JwtGuard)
@Resolver()
export class ReviewResolver {
   constructor(
      private readonly reviewService: ReviewService,
      private tokenHelper: TokenHelperService,
   ) {}

   @Query(() => [Review])
   async getProductReviews(@Args('args') args: GetProductReviewsArgs) {
      return this.reviewService.getProductReviews(args);
   }

   @Mutation(() => Review)
   async createReview(
      @Args('args') args: CreateReviewArgs,
      @Context() context: { req: Request; res: Response },
   ) {
      const userId = await this.tokenHelper.getUserIdFromRequest(context.req);
      return this.reviewService.createReview({ userId, ...args });
   }
}
