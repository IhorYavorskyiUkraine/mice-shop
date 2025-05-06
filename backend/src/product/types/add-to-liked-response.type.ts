import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AddToLikedRes {
   @Field(() => String)
   message: string;
}
