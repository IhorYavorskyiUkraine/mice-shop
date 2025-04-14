import { Field, Float, InputType } from '@nestjs/graphql';
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
}
