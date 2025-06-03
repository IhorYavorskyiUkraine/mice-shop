import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetAddressByIdArgs {
   @Field(() => Int)
   userId: number;

   @Field(() => Int)
   addressId: number;
}
