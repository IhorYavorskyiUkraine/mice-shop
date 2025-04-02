import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Model } from './productModel.model';

@ObjectType()
export class Specs {
   @Field(() => Int)
   id: number;

   @Field()
   key: string;

   @Field()
   value: string;

   @Field(() => Model)
   model: Model;

   @Field(() => Int)
   modelId: number;

   @Field()
   createdAt: Date;

   @Field()
   updatedAt: Date;
}
