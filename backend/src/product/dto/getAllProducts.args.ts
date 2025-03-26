import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
class PriceInput {
   @Field(type => Int, { nullable: true })
   min?: number;

   @Field(type => Int, { nullable: true })
   max?: number;
}

@InputType()
export class GetAllProductsArgs {
   @Field({ nullable: true })
   orderBy: string;

   @Field(type => Int, { nullable: true })
   limit: number;

   @Field(type => Int, { nullable: true })
   offset: number;

   @Field({ nullable: true })
   categoryId?: number;

   @Field(() => [String], { nullable: true })
   colors?: string[];

   @Field(type => PriceInput, { nullable: true })
   price?: PriceInput;

   @Field({ nullable: true })
   brandId?: number;

   @Field({ nullable: true })
   name?: string;

   @Field({ nullable: true })
   rating?: number;
}
