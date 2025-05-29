import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { CartService } from './cart.service';
import { AddProductArgs } from './dto/addProduct.args';
import { UpdateProductArgs } from './dto/updateProduct.args';
import { Cart } from './models/cart.model';

@Resolver()
export class CartResolver {
   constructor(
      private readonly cartService: CartService,
      private authService: AuthService,
   ) {}

   @Query(() => Cart)
   async getCart(@Context() context: { req: Request; res: Response }) {
      const { userId, guestToken } =
         await this.authService.getValidUserIdOrThrow(context.req, context.res);

      return this.cartService.getCart(userId, guestToken);
   }

   @Mutation(() => Cart)
   async addProduct(
      @Args('args') args: AddProductArgs,
      @Context() context: { req: Request; res: Response },
   ) {
      const { userId, guestToken } =
         await this.authService.getValidUserIdOrThrow(context.req, context.res);

      return this.cartService.addProduct({ ...args, userId }, guestToken);
   }

   @Mutation(() => Cart)
   async updateProduct(
      @Args('args') args: UpdateProductArgs,
      @Context() context: { req: Request; res: Response },
   ) {
      const { userId, guestToken } =
         await this.authService.getValidUserIdOrThrow(context.req, context.res);

      return this.cartService.updateProduct({ ...args, userId }, guestToken);
   }

   @Mutation(() => Cart)
   async removeProduct(
      @Args('modelId', { type: () => Int }) modelId: number,
      @Context() context: { req: Request; res: Response },
   ) {
      const { userId, guestToken } =
         await this.authService.getValidUserIdOrThrow(context.req, context.res);

      return this.cartService.removeProduct(modelId, userId, guestToken);
   }
}
