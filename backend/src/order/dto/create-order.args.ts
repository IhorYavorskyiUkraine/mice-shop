import { Field, Float, InputType } from '@nestjs/graphql';

import { registerEnumType } from '@nestjs/graphql';
import { OrderItemInput } from '../models/order-item.model';

enum OrderStatus {
   PENDING = 'PENDING',
   PROCESSING = 'PROCESSING',
   DELIVERED = 'DELIVERED',
   CANCELLED = 'CANCELLED',
}

registerEnumType(OrderStatus, {
   name: 'OrderStatus',
});

@InputType()
export class CreateOrderArgs {
   @Field(() => OrderStatus, { defaultValue: OrderStatus.PENDING })
   status: OrderStatus;

   @Field(() => Float)
   total: number;

   @Field()
   address: string;

   @Field()
   phone: string;

   @Field()
   email: string;

   @Field()
   name: string;

   @Field(() => [OrderItemInput])
   orderItems: OrderItemInput[];

   @Field({ nullable: true })
   userId?: number;

   @Field(() => String)
   paymentMethod: 'online' | 'cash';
}
