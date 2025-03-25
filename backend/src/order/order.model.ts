import {
   Field,
   Float,
   Int,
   ObjectType,
   registerEnumType,
} from '@nestjs/graphql';
import { OrderStatus } from '@prisma/client';
import { Product } from 'src/product/product.model';
import { User } from 'src/user/user.model';

registerEnumType(OrderStatus, {
   name: 'OrderStatus',
});

@ObjectType()
export class Order {
   @Field(type => Int)
   id: number;

   @Field(type => User)
   user: User;

   @Field(type => Int)
   userId: number;

   @Field(type => [Product])
   products: Product[];

   @Field(type => String)
   status: OrderStatus;

   @Field(type => Float)
   total: number;

   @Field()
   address: string;

   @Field()
   phone: string;

   @Field()
   email: string;

   @Field()
   name: string;

   @Field()
   createdAt: Date;

   @Field()
   updatedAt: Date;
}
