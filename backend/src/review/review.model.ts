import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/product/models/product.model';
import { User } from 'src/user/user.model';

@ObjectType()
export class Review {
   @Field(() => Int)
   id: number;

   @Field(() => User)
   user: User;

   @Field(() => Int)
   userId: number;

   @Field(() => Product)
   product: Product;

   @Field(() => Int)
   productId: number;

   @Field(() => Int)
   rating: number;

   @Field()
   comment: string;

   @Field()
   createdAt: Date;

   @Field()
   updatedAt: Date;
}
