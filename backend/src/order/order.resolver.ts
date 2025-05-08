import { Args, Query, Resolver } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { GetCityResponse } from './types/get-city-response.type';
import { GetWarehousesResponse } from './types/get-warehouses-response.type';

@Resolver()
export class OrderResolver {
   constructor(private readonly orderService: OrderService) {}

   @Query(() => [GetCityResponse])
   async getCities(@Args('query') query: string) {
      return this.orderService.getCities(query);
   }

   @Query(() => [GetWarehousesResponse])
   async getWarehouses(@Args('cityRef') cityRef: string) {
      return this.orderService.getWarehouses(cityRef);
   }

   // async createOrder(
   //    @Args('args') args: any,
   //    @Context() context: { req: Request; res: Response },
   // ) {
   //    return this.orderService.createOrder(args);
   // }

   // async getAllOrders(@Context() context: { req: Request; res: Response }) {
   //    return this.orderService.getAllOrders();
   // }
}
