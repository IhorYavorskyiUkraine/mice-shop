import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { getAuthTokens } from 'src/utils/cookie.utils';
import { GetAllProductsArgs } from './dto';
import { Product } from './models/product.model';
import { Category } from './models/productCategory.model';
import { Color } from './models/productColor.model';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
   constructor(
      private readonly productService: ProductService,
      private authService: AuthService,
   ) {}

   @Query(() => [Product])
   async getAllProducts(@Args('args') args: GetAllProductsArgs) {
      return this.productService.getAllProducts(args);
   }

   @Query(() => Product)
   async getProductById(@Args('id', { type: () => Int }) id: number) {
      return this.productService.getProductById(id);
   }

   @Query(() => [Color])
   async getLikedProducts(
      @Args('productCode') productCode: string,
      @Context() context: { req: Request },
   ) {
      const { accessToken } = getAuthTokens(context.req);
      if (!accessToken) {
         throw new Error('Access token not found');
      }

      const { userId } =
         await this.authService.validateAccessToken(accessToken);

      return this.productService.getLikedModels(productCode, userId);
   }

   @Mutation(() => Product)
   async addToLiked(
      @Args('productCode') productCode: string,
      @Context() context: { req: Request },
   ) {
      const { accessToken } = getAuthTokens(context.req);
      if (!accessToken) {
         throw new Error('Access token not found');
      }

      const { userId } =
         await this.authService.validateAccessToken(accessToken);

      return this.productService.addToLiked(productCode, userId);
   }

   @Query(() => [Category])
   async getAllProductCategories() {
      return this.productService.getAllProductCategories();
   }
}
