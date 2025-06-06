import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtGuard } from 'src/auth/guard';
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
      const { userId, guestToken } =
         await this.authService.getValidUserIdOrThrow(context.req, context.res);

      const order = await this.orderService.createOrder({
         ...args,
         userId,
         guestToken,
      });

      return {
         orderId: order.id,
         message: 'Order created successfully',
         success: true,
      };
   }

   @UseGuards(JwtGuard)
   @Query(() => [Order])
   async getOrders(@Context() context: { req: Request; res: Response }) {
      const { userId } = await this.authService.getValidUserIdOrThrow(
         context.req,
         context.res,
      );

      return this.orderService.getOrders(userId, context.res);
   }
}
