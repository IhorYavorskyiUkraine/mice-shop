import { Field, InputType, Int } from '@nestjs/graphql';
import { Color } from 'src/product/models/productColor.model';

@InputType()
export class UpdateProductArgs {
   @Field(() => Int)
   modelId: number;

   @Field(() => String)
   color: Color;

   @Field(() => Int)
   quantity: number;
}
