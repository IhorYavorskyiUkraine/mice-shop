import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Review, UserRole } from '@prisma/client';
import { Cart } from 'src/cart/models/cart.model';
import { Order } from 'src/order/models/order.model';

registerEnumType(UserRole, {
   name: 'UserRole',
});

@ObjectType()
export class User {
   @Field(() => Int)
   id: number;

   @Field()
   displayName: string;

   @Field()
   email: string;

   @Field()
   password: string;

   @Field(() => String, { nullable: true })
   phone: string;

   @Field(() => UserRole, { defaultValue: UserRole.USER })
   role: UserRole;

   @Field({ nullable: true })
   refreshToken?: string;

   @Field(() => [String])
   orders: Order[];

   @Field(() => [String])
   reviews: Review[];

   @Field(() => [String])
   liked: string[];

   @Field(() => Cart, { nullable: true })
   cart?: Cart;

   @Field()
   createdAt: Date;

   @Field()
   updatedAt: Date;
}
