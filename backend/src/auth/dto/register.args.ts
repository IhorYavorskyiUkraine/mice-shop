import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class RegisterArgs {
   @Field()
   @IsEmail({}, { message: 'Invalid email address' })
   email: string;

   @Field()
   @IsString()
   @MinLength(4, { message: 'Display name must be at least 4 characters long' })
   displayName: string;

   @Field()
   @MinLength(8, { message: 'Password must be at least 8 characters long' })
   password: string;

   @Field()
   @MinLength(8, {
      message: 'Confirm password must be at least 8 characters long',
   })
   confirmPassword: string;
}
