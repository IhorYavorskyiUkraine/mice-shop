import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductFiltersArgs } from './dto/filtered-products.dto';
import { PaginatedProductsResponse } from './models/paginated-product-response.model';
import { ProductFilters } from './models/product-category.model';
import { ProductFiltersService } from './product-filters.service';

@Resolver()
export class ProductFiltersResolver {
   constructor(private readonly productFiltersService: ProductFiltersService) {}

   @Query(() => ProductFilters)
   async getAllProductFilters() {
      return this.productFiltersService.getAllProductFilters();
   }

   @Query(() => PaginatedProductsResponse)
   async getFilteredProducts(@Args('args') args: ProductFiltersArgs) {
      return this.productFiltersService.getFilteredProducts(args);
   }
}
