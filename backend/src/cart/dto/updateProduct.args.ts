import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateProductArgs {
   @Field(type => Int)
   modelId: number;

   @Field(type => Int)
   quantity: number;
}
