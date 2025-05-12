import {
   Field,
   Float,
   Int,
   ObjectType,
   registerEnumType,
} from '@nestjs/graphql';
import { OrderStatus } from '@prisma/client';
import { User } from 'src/user/user.model';
import { OrderItem } from './order-item.model';

registerEnumType(OrderStatus, {
   name: 'OrderStatus',
});

@ObjectType()
export class Order {
   @Field(() => Int)
   id: number;

   @Field(() => User)
   user: User;

   @Field(() => Int)
   userId: number;

   @Field(() => String)
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

   @Field(() => [OrderItem])
   orderItems: OrderItem[];

   @Field()
   createdAt: Date;

   @Field()
   updatedAt: Date;
}
