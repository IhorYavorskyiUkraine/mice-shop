import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class DeleteAddressArgs {
   @Field(() => Int)
   userId: number;

   @Field(() => Int)
   addressId?: number;
}
