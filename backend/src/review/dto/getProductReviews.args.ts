import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetProductReviewsArgs {
   @Field(type => Int)
   productId: number;

   @Field({ nullable: true })
   orderBy: string;

   @Field(type => Int, { nullable: true })
   limit: number;

   @Field(type => Int, { nullable: true })
   offset: number;
}
