import { Args, Query, Resolver } from '@nestjs/graphql';
import { Product } from 'src/product/models/product.model';
import { ProductFiltersArgs } from './dto/filtered-products.dto';
import { ProductFilters } from './models/product-category.model';
import { ProductFiltersService } from './product-filters.service';

@Resolver()
export class ProductFiltersResolver {
   constructor(private readonly productFiltersService: ProductFiltersService) {}

   @Query(() => ProductFilters)
   async getAllProductFilters() {
      return this.productFiltersService.getAllProductFilters();
   }

   @Query(() => [Product])
   async getFilteredProducts(@Args('args') args: ProductFiltersArgs) {
      return this.productFiltersService.getFilteredProducts(args);
   }
}
