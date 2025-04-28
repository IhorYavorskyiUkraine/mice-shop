import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthResponse {
   @Field(() => String)
   message: string;

   @Field(() => String, { nullable: true })
   userId: string;

   @Field(() => String, { nullable: true })
   accessToken?: string;

   @Field(() => String, { nullable: true })
   refreshToken?: string;
}
