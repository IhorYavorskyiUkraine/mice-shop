import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetWarehousesResponse {
   @Field(() => Int)
   number: number;

   @Field(() => String)
   description: string;

   @Field(() => String)
   ref: string;
}
