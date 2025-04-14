import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PriceRange {
   @Field(() => Float)
   min: number;

   @Field(() => Float)
   max: number;
}

@ObjectType()
export class ProductFilters {
   @Field(() => [String])
   tags: string[];

   @Field(() => [String])
   brands: string[];

   @Field(() => PriceRange)
   price: PriceRange;

   @Field(() => [String])
   colors: string[];

   @Field(() => [String])
   specs: string[];
}
