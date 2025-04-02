import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.model';
import { CartItem } from './cartItem.model';

@ObjectType()
export class Cart {
   @Field(() => Int)
   id: number;

   @Field(() => [CartItem])
   items: CartItem[];

   @Field(() => Float)
   totalPrice: number;

   @Field(() => User)
   user: User;

   @Field(() => Int)
   userId: number;

   @Field()
   createdAt: Date;

   @Field()
   updatedAt: Date;
}
