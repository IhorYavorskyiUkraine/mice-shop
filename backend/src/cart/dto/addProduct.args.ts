import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AddProductArgs {
   @Field(() => Int)
   modelId: number;

   @Field(() => Int)
   colorId: number;
}
