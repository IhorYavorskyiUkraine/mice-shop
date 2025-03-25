import { Field, InputType } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

@InputType()
export class CreateUserArgs {
   @Field()
   displayName: string;

   @Field()
   email: string;

   @Field()
   password: string;

   @Field(type => UserRole, { defaultValue: UserRole.USER })
   role: UserRole;
}
