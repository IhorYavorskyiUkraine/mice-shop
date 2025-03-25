import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/product/product.model';
import { User } from 'src/user/user.model';

@ObjectType()
export class Cart {
   @Field(type => Int)
   id: number;

   @Field(type => [Product])
   products: Product[];

   @Field(type => Float)
   total: number;

   @Field(type => User)
   user: User;

   @Field(type => Int)
   userId: number;

   @Field()
   createdAt: Date;

   @Field()
   updatedAt: Date;
}
