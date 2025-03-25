import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserArgs {
   @Field({ nullable: true })
   displayName?: string;

   @Field({ nullable: true })
   email?: string;

   @Field({ nullable: true })
   phone?: string;

   @Field({ nullable: true })
   password?: string;
}
