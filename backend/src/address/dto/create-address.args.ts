import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateAddressArgs {
   @Field(() => Int)
   userId: number;

   @Field(() => String)
   name: string;

   @Field(() => String)
   phone: string;

   @Field(() => String)
   city: string;

   @Field(() => String)
   warehouse: string;
}
