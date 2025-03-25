import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/product/product.model';
import { User } from 'src/user/user.model';

@ObjectType()
export class Review {
   @Field(type => Int)
   id: number;

   @Field(type => User)
   user: User;

   @Field(type => Int)
   userId: number;

   @Field(type => Product)
   product: Product;

   @Field(type => Int)
   productId: number;

   @Field(type => Int)
   rating: number;

   @Field()
   comment: string;

   @Field()
   createdAt: Date;

   @Field()
   updatedAt: Date;
}
