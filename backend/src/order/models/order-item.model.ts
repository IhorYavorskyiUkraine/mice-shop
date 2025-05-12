import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/order/models/order.model';

@ObjectType()
export class OrderItem {
   @Field(() => Int)
   id: number;

   @Field(() => Order)
   order: Order;

   @Field(() => Int)
   orderId: number;

   @Field(() => String)
   code: string;

   @Field(() => Int)
   quantity: number;

   @Field(() => Float)
   price: number;

   @Field()
   createdAt: Date;

   @Field()
   updatedAt: Date;
}

@InputType()
export class OrderItemInput {
   // @Field(() => Int)
   // orderId: number;

   @Field(() => String)
   code: string;

   @Field(() => Int)
   quantity: number;

   @Field(() => Float)
   price: number;
}
