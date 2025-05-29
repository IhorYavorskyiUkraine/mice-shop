import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtGuard } from 'src/auth/guard';
import { GraphqlErrorCode } from 'src/common/errors/graphql-error-codes.enum';
import { throwGraphQLError } from 'src/common/errors/graphql-errors';
import { getAuthTokens } from 'src/utils/cookie.utils';
import { GetAllProductsArgs } from './dto';
import { Code } from './models/product-code';
import { LikedProduct } from './models/product-liked.model';
import { Product } from './models/product.model';
import { Category } from './models/productCategory.model';
import { ProductService } from './product.service';
import { AddToLikedRes } from './types/add-to-liked-response.type';

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

   @Query(() => Code)
   async getProductByCode(@Args('code') code: string) {
      return this.productService.getProductInfoByCode(code);
   }

   @UseGuards(JwtGuard)
   @Query(() => [LikedProduct])
   async getLikedProducts(@Context() context: { req: Request }) {
      const { accessToken } = getAuthTokens(context.req);
      if (!accessToken) {
         throwGraphQLError('Не знайдено токен авторизації', {
            code: GraphqlErrorCode.UNAUTHENTICATED,
         });
      }

      const { userId } =
         await this.authService.validateAccessToken(accessToken);

      return this.productService.getLikedProducts(userId);
   }

   @Query(() => Boolean)
   async isProductLiked(
      @Args('productCode') productCode: string,
      @Context() context: { req: Request },
   ) {
      const { accessToken } = getAuthTokens(context.req);

      if (!accessToken) {
         return false;
      }

      const { userId } =
         await this.authService.validateAccessToken(accessToken);

      return this.productService.isProductLiked(userId, productCode);
   }

   @Mutation(() => AddToLikedRes)
   async addToLiked(
      @Args('productCode') productCode: string,
      @Context() context: { req: Request; res: Response },
   ) {
      const { userId } = await this.authService.getValidUserIdOrThrow(
         context.req,
         context.res,
      );

      return this.productService.addToLiked(productCode, userId);
   }

   @Query(() => [Category])
   async getAllProductCategories() {
      return this.productService.getAllProductCategories();
   }
}
