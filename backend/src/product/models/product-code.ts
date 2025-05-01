import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.model';
import { Color } from './productColor.model';
import { Model } from './productModel.model';

@ObjectType()
export class Code {
   @Field(() => Int)
   id: number;

   @Field(() => String)
   code: string;

   @Field(() => Model)
   model: Model;

   @Field(() => Int)
   modelId: number;

   @Field(() => Color)
   color: Color;
   @Field(() => Int)
   colorId: number;

   @Field(() => [User])
   likedUsers: User[];

   @Field()
   createdAt: Date;

   @Field()
   updatedAt: Date;
}
