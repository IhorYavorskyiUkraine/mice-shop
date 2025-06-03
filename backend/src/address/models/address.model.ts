import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Address {
   @Field(() => Int)
   id: number;

   @Field(() => Int)
   userId: number;

   @Field(() => String)
   name: string;

   @Field(() => String)
   phone: string;

   @Field(() => String)
   city: string;

   @Field(() => String)
   warehouse: string;

   @Field(() => Date)
   createdAt: Date;

   @Field(() => Date)
   updatedAt: Date;
}
