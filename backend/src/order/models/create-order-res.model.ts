import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateOrderResponse {
   @Field()
   success: boolean;

   @Field(() => String, { nullable: true })
   orderId?: string;

   @Field(() => String, { nullable: true })
   message?: string;
}
