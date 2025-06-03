import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtGuard } from 'src/auth/guard';
import { AddressService } from './address.service';
import {
   CreateAddressArgs,
   DeleteAddressArgs,
   GetAddressByIdArgs,
   UpdateAddressArgs,
} from './dto';
import { Address } from './models';

@UseGuards(JwtGuard)
@Resolver()
export class AddressResolver {
   constructor(
      private readonly addressService: AddressService,
      private authService: AuthService,
   ) {}

   @Query(() => [Address])
   async getUserAddresses(@Context() context: { req: Request; res: Response }) {
      const { userId } = await this.authService.getValidUserIdOrThrow(
         context.req,
         context.res,
      );

      return this.addressService.getUserAddresses(userId);
   }

   @Query(() => Address)
   async getAddressById(
      @Args('args') args: GetAddressByIdArgs,
      @Context() context: { req: Request; res: Response },
   ) {
      const { userId } = await this.authService.getValidUserIdOrThrow(
         context.req,
         context.res,
      );

      return this.addressService.getAddressById({ ...args, userId });
   }

   @Mutation(() => Address)
   async createAddress(
      @Args('args') args: CreateAddressArgs,
      @Context() context: { req: Request; res: Response },
   ) {
      const { userId } = await this.authService.getValidUserIdOrThrow(
         context.req,
         context.res,
      );

      return this.addressService.createAddress({ ...args, userId });
   }

   @Mutation(() => Address)
   async updateAddress(
      @Args('args') args: UpdateAddressArgs,
      @Context() context: { req: Request; res: Response },
   ) {
      const { userId } = await this.authService.getValidUserIdOrThrow(
         context.req,
         context.res,
      );

      return this.addressService.updateAddress({ ...args, userId });
   }

   @Mutation(() => Address)
   async deleteAddress(
      @Args('args') args: DeleteAddressArgs,
      @Context() context: { req: Request; res: Response },
   ) {
      const { userId } = await this.authService.getValidUserIdOrThrow(
         context.req,
         context.res,
      );

      return this.addressService.deleteAddress({ ...args, userId });
   }
}
