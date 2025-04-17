import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateProductArgs {
   @Field(() => Int)
   modelId: number;

   @Field(() => String)
   color: string;

   @Field(() => Int)
   quantity: number;
}
