import { Field, Float, InputType, Int } from '@nestjs/graphql';
@InputType()
export class PriceRangeInput {
   @Field(() => Float)
   min: number;

   @Field(() => Float)
   max: number;
}

@InputType()
export class ProductFiltersArgs {
   @Field(() => [String])
   tags: string[];

   @Field(() => [String])
   brands: string[];

   @Field(() => PriceRangeInput)
   price: PriceRangeInput;

   @Field(() => [String])
   colors: string[];

   @Field(() => [String])
   specs: string[];

   @Field(() => Int)
   limit: number;

   @Field(() => Int)
   offset: number;

   @Field(() => [String])
   sort: [string, 'asc' | 'desc'];
}
