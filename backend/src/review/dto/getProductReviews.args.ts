import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetProductReviewsArgs {
   @Field(() => Int)
   productId: number;

   @Field(() => [String])
   orderBy: [string, 'asc' | 'desc'];

   @Field(() => Int)
   limit: number;

   @Field(() => Int)
   offset: number;
}
