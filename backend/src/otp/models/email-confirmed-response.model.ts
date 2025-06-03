import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmailConfirmedResponse {
   @Field(() => String)
   message: string;
}
