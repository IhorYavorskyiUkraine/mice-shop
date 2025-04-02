import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { CartService } from './cart.service';
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
      // const { accessToken } = getAuthTokens(context.req);

      // const { userId } =
      //    await this.authService.validateAccessToken(accessToken);

      return this.cartService.getCart(1);
   }

   @Mutation(() => Cart)
   async addProduct(@Args('modelId', { type: () => Int }) modelId: number) {
      // const { accessToken } = getAuthTokens(context.req);

      // const { userId } =
      //    await this.authService.validateAccessToken(accessToken);

      return this.cartService.addProduct(modelId, 1);
   }

   @Mutation(() => Cart)
   async updateProduct(@Args('args') args: UpdateProductArgs) {
      // const { accessToken } = getAuthTokens(context.req);

      // const { userId } =
      //    await this.authService.validateAccessToken(accessToken);

      return this.cartService.updateProduct({ ...args, userId: 1 });
   }

   @Mutation(() => Cart)
   async removeProduct(@Args('modelId', { type: () => Int }) modelId: number) {
      // const { accessToken } = getAuthTokens(context.req);

      // const { userId } =
      //    await this.authService.validateAccessToken(accessToken);

      return this.cartService.removeProduct(modelId, 1);
   }
}
