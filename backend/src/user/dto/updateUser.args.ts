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
   newPassword?: string;

   @Field({ nullable: true })
   oldPassword?: string;
}
