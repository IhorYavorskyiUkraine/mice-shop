import { Field, ObjectType } from '@nestjs/graphql';
import { Color } from './productColor.model';
import { Model } from './productModel.model';

@ObjectType()
export class LikedProduct {
   @Field()
   code: string;

   @Field(() => Color)
   color: Color;

   @Field(() => Model)
   model: Model;
}
