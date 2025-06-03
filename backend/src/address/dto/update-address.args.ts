import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateAddressArgs {
   @Field(() => Int)
   userId: number;

   @Field(() => Int)
   addressId: number;

   @Field(() => String, { nullable: true })
   name?: string;

   @Field(() => String, { nullable: true })
   phone?: string;

   @Field(() => String, { nullable: true })
   city?: string;

   @Field(() => String, { nullable: true })
   warehouse?: string;
}
