import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Review } from 'src/review/review.model';
import { Brand } from './productBrand.model';
import { Category } from './productCategory.model';
import { Model } from './productModel.model';
import { ProductTag } from './productTag.model';

@ObjectType()
export class Product {
   @Field(() => Int)
   id: number;

   @Field()
   name: string;

   @Field(() => [String])
   images: string[];

   @Field(() => Float)
   rating: number;

   @Field(() => [Model])
   models: Model[];

   @Field()
   description: string;

   @Field(() => [Review])
   reviews: Review[];

   @Field(() => Brand)
   brand: Brand;

   @Field(() => Int)
   brandId: number;

   @Field(() => Category)
   category: Category;

   @Field(() => Int)
   categoryId: number;

   @Field(() => [ProductTag])
   tags: ProductTag[];

   @Field()
   createdAt: Date;

   @Field()
   updatedAt: Date;
}
