import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/order/models/order.model';
import { Code } from 'src/product/models/product-code';

@ObjectType()
export class OrderItem {
   @Field(() => Int)
   id: number;

   @Field(() => Order)
   order: Order;

   @Field(() => Int)
   orderId: number;

   @Field(() => Code)
   code: Code;

   @Field(() => Int)
   codeId: number;

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
   @Field(() => Int)
   codeId: number;

   @Field(() => Int)
   quantity: number;

   @Field(() => Float)
   price: number;
}
