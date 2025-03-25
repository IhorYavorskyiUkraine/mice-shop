import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class LoginArgs {
   @Field()
   @IsEmail()
   email: string;

   @Field()
   @MinLength(8, { message: 'Password must be at least 8 characters long' })
   password: string;
}
