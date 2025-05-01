import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class addToLikedArgs {
   @Field(() => Int)
   modelId: number;

   @Field(() => Int)
   colorId: number;
}
