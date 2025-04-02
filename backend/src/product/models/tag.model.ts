import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { ProductTag } from './productTag.model';

@ObjectType()
export class Tag {
   @Field(() => Int)
   id: number;

   @Field()
   name: string;

   @Field(() => [ProductTag])
   products: ProductTag[];

   @Field()
   createdAt: Date;

   @Field()
   updatedAt: Date;
}
