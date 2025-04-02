import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from './product.model';
import { Tag } from './tag.model';

@ObjectType()
export class ProductTag {
   @Field(() => Int)
   id: number;

   @Field(() => Product)
   product: Product;

   @Field(() => Int)
   productId: number;

   @Field(() => Tag)
   tag: Tag;

   @Field(() => Int)
   tagId: number;

   @Field()
   createdAt: Date;

   @Field()
   updatedAt: Date;
}
