import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class getWarehousesArgs {
   @Field(() => String)
   cityRef: number;

   @Field(() => String, { nullable: true })
   search: string;
}
