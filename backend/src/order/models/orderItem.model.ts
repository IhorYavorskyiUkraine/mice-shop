import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/order/models/order.model';
import { Model } from 'src/product/models/productModel.model';

@ObjectType()
export class OrderItem {
   @Field(() => Int)
   id: number;

   @Field(() => Order)
   order: Order;

   @Field(() => Int)
   orderId: number;

   @Field(() => Model)
   model: Model;

   @Field(() => Int)
   modelId: number;

   @Field(() => Int)
   quantity: number;

   @Field(() => Float)
   price: number;

   @Field()
   createdAt: Date;

   @Field()
   updatedAt: Date;
}
