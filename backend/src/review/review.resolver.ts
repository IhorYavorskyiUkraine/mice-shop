import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtGuard } from 'src/auth/guard';
import { getAuthTokens } from 'src/utils/cookie.utils';
import { CreateReviewArgs, GetProductReviewsArgs } from './dto';
import { Review } from './review.model';
import { ReviewService } from './review.service';

@Resolver()
export class ReviewResolver {
   constructor(
      private readonly reviewService: ReviewService,
      private readonly authService: AuthService,
   ) {}

   @Query(() => [Review])
   async getProductReviews(@Args('args') args: GetProductReviewsArgs) {
      return this.reviewService.getProductReviews(args);
   }

   @UseGuards(JwtGuard)
   @Mutation(() => Review)
   async createReview(
      @Args('args') args: CreateReviewArgs,
      @Context() context: { req: Request; res: Response },
   ) {
      const { accessToken } = getAuthTokens(context.req);

      const { userId } =
         await this.authService.validateAccessToken(accessToken);

      return this.reviewService.createReview(args, userId);
   }
}
