import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { CartService } from 'src/cart/cart.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { validateValues } from 'src/utils/validateValues.utils';
import { CreateOrderArgs, CreateTTHArgs, getWarehousesArgs } from './dto';

@Injectable()
export class OrderService {
   constructor(
      private config: ConfigService,
      private prisma: PrismaService,
      private cartService: CartService,
      private userService: UserService,
   ) {}

   private async fetchNovaPost<T>(payload: any): Promise<T> {
      const response = await fetch(this.config.get('NOVA_POST_URL'), {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(payload),
      });
      return response.json();
   }

   async getCities(query: string) {
      const payload = {
         apiKey: this.config.get('NOVA_POST_API_KEY'),
         modelName: 'Address',
         calledMethod: 'searchSettlements',
         methodProperties: {
            CityName: query,
            Limit: 10,
         },
      };

      const data = await this.fetchNovaPost<any>(payload);
      const cities = data?.data?.[0]?.Addresses;

      if (!Array.isArray(cities)) return [];

      return cities
         .filter(city => city?.Present && city?.Ref)
         .map(city => ({
            name: city.Present,
            ref: city.DeliveryCity,
         }));
   }

   async getWarehouses(args: getWarehousesArgs) {
      const { cityRef, search } = args;
      const payload = {
         apiKey: this.config.get('NOVA_POST_API_KEY'),
         modelName: 'AddressGeneral',
         calledMethod: 'getWarehouses',
         methodProperties: {
            CityRef: cityRef,
            ...(search ? { FindByString: search } : {}),
            Limit: 10,
            Offset: 0,
         },
      };

      const data = await this.fetchNovaPost<any>(payload);
      if (!Array.isArray(data?.data)) return [];

      return data.data.map(wh => ({
         number: wh.Number,
         description: wh.Description,
         ref: wh.Ref,
      }));
   }

   async createTTH(args: CreateTTHArgs) {
      const body = {
         apiKey: this.config.get('NOVA_POST_API_KEY'),
         modelName: 'InternetDocument',
         calledMethod: 'save',
         methodProperties: {
            SenderWarehouseIndex: this.config.get('SENDER_WAREHOUSE_INDEX'),
            RecipientWarehouseIndex: args.recipientAddress,
            PayerType: 'Recipient',
            PaymentMethod: args.paymentMethod,
            DateTime: new Date().toISOString(),
            CargoType: args.cargoType,
            VolumeGeneral: '0.45',
            Weight: '2',
            ServiceType: args.serviceType,
            SeatsAmount: args.seatsAmount,
            Description: args.description,
            Cost: args.cost,
            CitySender: this.config.get('SENDER_CITY'),
            Sender: '00000000-0000-0000-0000-000000000000',
            SenderAddress: '00000000-0000-0000-0000-000000000000',
            ContactSender: '00000000-0000-0000-0000-000000000000',
            SendersPhone: this.config.get('SENDER_PHONE'),
            CityRecipient: '00000000-0000-0000-0000-000000000000',
            Recipient: '00000000-0000-0000-0000-000000000000',
            RecipientAddress: '00000000-0000-0000-0000-000000000000',
            ContactRecipient: '00000000-0000-0000-0000-000000000000',
            RecipientsPhone: args.phoneRecipient,
         },
      };

      const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.errors?.length) {
         throw new Error(data.errors.join(', '));
      }

      return data.data?.[0] || null;
   }

   async createOrder(args: CreateOrderArgs, res?: Response) {
      validateValues([args.email, args.phone, args.address]);
      if (!args.orderItems?.length || args.total === 0)
         throw new Error('Пустий список товарів');

      const guestToken = res.req.cookies?.guestToken;

      const order = await this.prisma.order.create({
         data: {
            ...args,
            orderItems: {
               create: args.orderItems.map(item => ({
                  quantity: item.quantity,
                  price: item.price,
                  code: { connect: { id: item.codeId } },
               })),
            },
            ...(guestToken && { token: guestToken }),
         },
      });

      const cart = await this.cartService.getCart(args.userId, res);
      await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
      await this.cartService.updateTotalPrice(cart.id);

      return order;
   }

   async getOrders(userId: number, res: Response) {
      try {
         const guestToken = res.req.cookies?.guestToken;

         if (guestToken) {
            await this.prisma.order.updateMany({
               where: {
                  token: guestToken,
                  userId: null,
               },
               data: {
                  userId,
                  token: null,
               },
            });

            res.clearCookie('guestToken');
         }

         const orders = await this.prisma.order.findMany({
            where: {
               userId,
            },
            include: {
               user: true,
               orderItems: {
                  include: {
                     code: {
                        include: {
                           color: {
                              include: {
                                 model: true,
                              },
                           },
                        },
                     },
                  },
               },
            },
            orderBy: {
               createdAt: 'desc',
            },
         });

         return orders;
      } catch (e) {
         console.error('Error getting orders', e);
         throw new InternalServerErrorException('Cannot get orders');
      }
   }
}
