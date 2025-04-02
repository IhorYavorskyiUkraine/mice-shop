import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { CartItem } from 'src/cart/models/cartItem.model';
import { OrderItem } from 'src/order/models/orderItem.model';
import { Product } from './product.model';
import { Color } from './productColor.model';
import { Specs } from './productSpecs.model';

@ObjectType()
export class Model {
   @Field(() => Int)
   id: number;

   @Field()
   name: string;

   @Field(() => Float)
   price: number;

   @Field(() => [Color])
   colors: Color[];

   @Field(() => Int)
   stock: number;

   @Field()
   image: string;

   @Field(() => [Specs])
   specs: Specs[];

   @Field(() => [CartItem])
   cartItem: CartItem[];

   @Field(() => Product)
   product: Product;

   @Field(() => Int)
   productId: number;

   @Field(() => OrderItem)
   orderItem: OrderItem;

   @Field()
   createdAt: Date;

   @Field()
   updatedAt: Date;
}
