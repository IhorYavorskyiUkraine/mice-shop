import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmailResponse {
   @Field(() => [String])
   accepted: string[];

   @Field(() => [String])
   rejected: string[];

   @Field({ nullable: true })
   messageId?: string;

   @Field({ nullable: true })
   response?: string;
}
