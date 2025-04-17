import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Model } from './productModel.model';

@ObjectType()
export class Color {
   @Field(() => Int)
   id: number;

   @Field()
   name: string;

   @Field()
   hex: string;

   @Field(() => Model)
   model: Model;

   @Field(() => Int)
   modelId: number;

   @Field(() => Int)
   stock: number;

   @Field()
   image: string;

   @Field()
   createdAt: Date;

   @Field()
   updatedAt: Date;
}
