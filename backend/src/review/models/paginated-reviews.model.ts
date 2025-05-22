import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Review } from './review.model';

@ObjectType()
export class PaginatedReviewsResponse {
   @Field(() => [Review])
   reviews: [Review];

   @Field(() => Int)
   totalReviews: number;

   @Field(() => Int)
   totalPages: number;

   @Field(() => Int)
   currentPage: number;
}
