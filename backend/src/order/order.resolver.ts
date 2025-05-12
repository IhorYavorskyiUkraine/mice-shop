import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { getAuthTokens } from 'src/utils/cookie.utils';
import { CreateOrderArgs, CreateTTHArgs, getWarehousesArgs } from './dto';
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

   @Mutation(() => String)
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

      console.log(args);

      return this.orderService.createOrder({ ...args, userId });
   }

   // async getAllOrders(@Context() context: { req: Request; res: Response }) {
   //    return this.orderService.getAllOrders();
   // }
}
