import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateReviewArgs {
   @Field()
   productId: number;

   @Field()
   rating: number;

   @Field()
   comment: string;
}
