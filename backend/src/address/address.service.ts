import { Injectable } from '@nestjs/common';
import { GraphqlErrorCode } from 'src/common/errors/graphql-error-codes.enum';
import { throwGraphQLError } from 'src/common/errors/graphql-errors';
import { PrismaService } from 'src/prisma/prisma.service';
import {
   CreateAddressArgs,
   DeleteAddressArgs,
   GetAddressByIdArgs,
   UpdateAddressArgs,
} from './dto';

@Injectable()
export class AddressService {
   constructor(private prisma: PrismaService) {}

   async getUserAddresses(userId: number) {
      try {
         if (!userId) {
            throwGraphQLError('Не надано значення userId', {
               code: GraphqlErrorCode.BAD_USER_INPUT,
            });
         }

         const addresses = await this.prisma.address.findMany({
            where: { userId },
         });

         return addresses;
      } catch (e) {
         console.error(e);
         throw e;
      }
   }

   async getAddressById(args: GetAddressByIdArgs) {
      try {
         const { addressId, userId } = args;

         if (!addressId || !userId) {
            throwGraphQLError('Не надано значення id або userId', {
               code: GraphqlErrorCode.BAD_USER_INPUT,
            });
         }

         const address = await this.prisma.address.findFirst({
            where: { id: addressId, userId },
         });

         if (!address) {
            throwGraphQLError('Адреса не знайдена', {
               code: GraphqlErrorCode.RESOURCE_NOT_FOUND,
            });
         }

         return address;
      } catch (e) {
         console.error(e);
         throw e;
      }
   }

   async createAddress(args: CreateAddressArgs) {
      try {
         const { userId, ...address } = args;

         if (!userId) {
            throwGraphQLError('Не надано значення userId', {
               code: GraphqlErrorCode.BAD_USER_INPUT,
            });
         }

         const newAddress = await this.prisma.address.create({
            data: { ...address, userId },
         });

         if (!newAddress) {
            throwGraphQLError('Помилка створення адреси', {
               code: GraphqlErrorCode.INTERNAL_SERVER_ERROR,
            });
         }

         return newAddress;
      } catch (e) {
         console.error(e);
         throw e;
      }
   }

   async updateAddress(args: UpdateAddressArgs) {
      try {
         const { userId, ...address } = args;

         if (!userId) {
            throwGraphQLError('Не надано значення userId', {
               code: GraphqlErrorCode.BAD_USER_INPUT,
            });
         }

         const updatedAddress = await this.prisma.address.update({
            where: { id: address.addressId, userId },
            data: address,
         });

         if (!updatedAddress) {
            throwGraphQLError('Помилка оновлення адреси', {
               code: GraphqlErrorCode.INTERNAL_SERVER_ERROR,
            });
         }

         return updatedAddress;
      } catch (e) {
         console.error(e);
         throw e;
      }
   }

   async deleteAddress(args: DeleteAddressArgs) {
      try {
         const { userId, addressId } = args;

         if (!userId || !addressId) {
            throwGraphQLError('Не надано значення userId або addressId', {
               code: GraphqlErrorCode.BAD_USER_INPUT,
            });
         }

         const deletedAddress = await this.prisma.address.delete({
            where: { id: addressId, userId },
         });

         if (!deletedAddress) {
            throwGraphQLError('Помилка видалення адреси', {
               code: GraphqlErrorCode.INTERNAL_SERVER_ERROR,
            });
         }

         return deletedAddress;
      } catch (e) {
         console.error(e);
         throw e;
      }
   }
}
