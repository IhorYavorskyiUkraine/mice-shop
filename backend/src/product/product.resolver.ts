import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { GetAllProductsArgs } from './dto';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
   constructor(private readonly productService: ProductService) {}

   @Query(() => [Product])
   async getAllProducts(@Args('args') args: GetAllProductsArgs) {
      return this.productService.getAllProducts(args);
   }

   @Query(() => Product)
   async getProductById(@Args('id', { type: () => Int }) id: number) {
      return this.productService.getProductById(id);
   }
}
