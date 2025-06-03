import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetUserAddressesArgs {
   @Field(() => Int)
   userId: number;
}
