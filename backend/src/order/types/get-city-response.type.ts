import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetCityResponse {
   @Field(() => String)
   name: string;

   @Field(() => String)
   ref: string;
}
