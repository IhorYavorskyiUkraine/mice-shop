import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateProductArgs {
   @Field(() => Int)
   modelId: number;

   @Field(() => Int)
   colorId: number;

   @Field(() => Int)
   quantity: number;
}
