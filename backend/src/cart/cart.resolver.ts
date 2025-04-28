import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { getAuthTokens } from 'src/utils/cookie.utils';
import { CartService } from './cart.service';
import { AddProductArgs } from './dto/addProduct.args';
import { UpdateProductArgs } from './dto/updateProduct.args';
import { Cart } from './models/cart.model';

// @UseGuards(JwtGuard)
@Resolver()
export class CartResolver {
   constructor(
      private readonly cartService: CartService,
      private authService: AuthService,
   ) {}

   @Query(() => Cart)
   async getCart(@Context() context: { req: Request }) {
      const { accessToken } = getAuthTokens(context.req);

      if (!accessToken) {
         throw new Error('Access token not found');
      }

      const { userId } =
         await this.authService.validateAccessToken(accessToken);

      return this.cartService.getCart(userId);
   }

   @Mutation(() => Cart)
   async addProduct(
      @Args('args') args: AddProductArgs,
      @Context() context: { req: Request },
   ) {
      const { accessToken } = getAuthTokens(context.req);

      if (!accessToken) {
         throw new Error('Access token not found');
      }

      const { userId } =
         await this.authService.validateAccessToken(accessToken);

      return this.cartService.addProduct(args, userId);
   }

   @Mutation(() => Cart)
   async updateProduct(
      @Args('args') args: UpdateProductArgs,
      @Context() context: { req: Request },
   ) {
      const { accessToken } = getAuthTokens(context.req);

      const { userId } =
         await this.authService.validateAccessToken(accessToken);

      return this.cartService.updateProduct({ ...args, userId });
   }

   @Mutation(() => Cart)
   async removeProduct(
      @Args('modelId', { type: () => Int }) modelId: number,
      @Context() context: { req: Request },
   ) {
      const { accessToken } = getAuthTokens(context.req);

      const { userId } =
         await this.authService.validateAccessToken(accessToken);

      return this.cartService.removeProduct(modelId, userId);
   }
}
