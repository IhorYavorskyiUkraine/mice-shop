import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateReviewArgs {
   @Field({ nullable: true })
   userId: number;

   @Field()
   productId: number;

   @Field()
   rating: number;

   @Field()
   comment: string;
}
