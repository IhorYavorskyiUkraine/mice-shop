import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetProductReviewsArgs {
   @Field(() => Int)
   productId: number;

   @Field({ nullable: true })
   orderBy: string;

   @Field(() => Int, { nullable: true })
   limit: number;

   @Field(() => Int, { nullable: true })
   offset: number;
}
