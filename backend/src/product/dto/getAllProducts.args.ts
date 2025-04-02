import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
class PriceInput {
   @Field(() => Int, { nullable: true })
   min?: number;

   @Field(() => Int, { nullable: true })
   max?: number;
}

@InputType()
export class GetAllProductsArgs {
   @Field({ nullable: true })
   orderBy: string;

   @Field(() => Int, { nullable: true })
   limit: number;

   @Field(() => Int, { nullable: true })
   offset: number;

   @Field({ nullable: true })
   tagId?: number;

   @Field({ nullable: true })
   brandId?: number;

   @Field({ nullable: true })
   name?: string;

   @Field({ nullable: true })
   rating?: number;
}
