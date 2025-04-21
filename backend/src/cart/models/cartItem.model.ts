import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Color } from 'src/product/models/productColor.model';
import { Model } from 'src/product/models/productModel.model';
import { Cart } from './cart.model';

@ObjectType()
export class CartItem {
   @Field(() => Int)
   id: number;

   @Field(() => Model)
   model: Model;

   @Field(() => Int)
   modelId: number;

   @Field(() => Int)
   quantity: number;

   @Field(() => Float)
   price: number;

   @Field(() => Color)
   color: Color;

   @Field(() => Cart)
   cart: Cart;

   @Field(() => Int)
   cartId: number;

   @Field()
   createdAt: Date;

   @Field()
   updatedAt: Date;
}
