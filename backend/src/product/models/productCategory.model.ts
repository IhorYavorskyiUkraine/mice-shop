import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from './product.model';

@ObjectType()
export class Category {
   @Field(() => Int)
   id: number;

   @Field()
   name: string;

   @Field(() => [Product])
   products: Product[];

   @Field()
   createdAt: Date;

   @Field()
   updatedAt: Date;
}
