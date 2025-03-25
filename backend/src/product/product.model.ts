import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Cart } from 'src/cart/cart.model';
import { Review } from 'src/review/review.model';
import { User } from 'src/user/user.model';

@ObjectType()
export class Product {
   @Field(type => Int)
   id: number;

   @Field()
   name: string;

   @Field(type => Float)
   price: number;

   @Field(type => Int)
   quantity: number;

   @Field()
   image: string;

   @Field(type => Float)
   rating: number;

   @Field(type => [String])
   colors: string[];

   @Field(type => [String])
   models: string[];

   @Field(type => [String])
   specs: string[];

   @Field()
   description: string;

   @Field(type => [Review])
   reviews: Review[];

   @Field()
   brand: string;

   @Field(type => User, { nullable: true })
   user: User;

   @Field(type => Int, { nullable: true })
   userId: number;

   @Field(type => Cart, { nullable: true })
   cart: Cart;

   @Field(type => Int, { nullable: true })
   cartId: number;

   @Field()
   createdAt: Date;

   @Field()
   updatedAt: Date;
}
