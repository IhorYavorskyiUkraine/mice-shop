import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTTHArgs } from './dto/create-tth.args';
import { getWarehousesArgs } from './dto/get-warehouses.args';
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
   async getWarehouses(@Args('args') args: getWarehousesArgs) {
      return this.orderService.getWarehouses(args);
   }

   @Mutation(() => String)
   async createTTH(@Args('args') args: CreateTTHArgs) {
      return this.orderService.createTTH(args);
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
