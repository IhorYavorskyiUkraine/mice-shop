import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/product/models/product.model';

@ObjectType()
export class PaginatedProductsResponse {
   @Field(() => [Product])
   products: [Product];

   @Field(() => Int)
   totalProducts: number;

   @Field(() => Int)
   totalPages: number;

   @Field(() => Int)
   currentPage: number;
}
