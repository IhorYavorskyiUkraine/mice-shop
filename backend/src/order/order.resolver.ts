import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtGuard } from 'src/auth/guard';
import { getAuthTokens } from 'src/utils/cookie.utils';
import { CreateOrderArgs, CreateTTHArgs, getWarehousesArgs } from './dto';
import { CreateOrderResponse } from './models/create-order-res.model';
import { Order } from './models/order.model';
import { OrderService } from './order.service';
import { GetCityResponse } from './types/get-city-response.type';
import { GetWarehousesResponse } from './types/get-warehouses-response.type';

@Resolver()
export class OrderResolver {
   constructor(
      private readonly orderService: OrderService,
      private authService: AuthService,
   ) {}

   @Query(() => [GetCityResponse])
   async getCities(@Args('query') query: string) {
      return this.orderService.getCities(query);
   }

   @Query(() => [GetWarehousesResponse])
   async getWarehouses(@Args('args') args: getWarehousesArgs) {
      return this.orderService.getWarehouses(args);
   }

   @Mutation(() => String)
   async createTTH(@Args('args') args: CreateTTHArgs) {
      return this.orderService.createTTH(args);
   }

   @Mutation(() => CreateOrderResponse)
   async createOrder(
      @Args('args') args: CreateOrderArgs,
      @Context() context: { req: Request; res: Response },
   ) {
      const { accessToken } = getAuthTokens(context.req);
      let userId: number | undefined;

      if (accessToken) {
         const payload =
            await this.authService.validateAccessToken(accessToken);
         userId = payload.userId;
      }

      const order = await this.orderService.createOrder(
         { ...args, userId },
         context.res,
      );

      if (!order) throw new Error('Order creation failed');

      return {
         message: 'Order created successfully',
         success: true,
      };
   }

   @UseGuards(JwtGuard)
   @Query(() => [Order])
   async getOrders(@Context() context: { req: Request; res: Response }) {
      const { accessToken } = getAuthTokens(context.req);
      let userId: number | undefined;

      if (accessToken) {
         const payload =
            await this.authService.validateAccessToken(accessToken);
         userId = payload.userId;
      }

      return this.orderService.getOrders(userId, context.res);
   }
}
