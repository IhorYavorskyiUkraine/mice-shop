import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { GraphqlErrorCode } from 'src/common/errors/graphql-error-codes.enum';
import { throwGraphQLError } from 'src/common/errors/graphql-errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { validateValues } from 'src/utils/validateValues.utils';
import { AddProductArgs } from './dto/addProduct.args';
import { UpdateProductArgs } from './dto/updateProduct.args';

@Injectable()
export class CartService {
   constructor(
      private prisma: PrismaService,
      private jwtService: JwtService,
      private config: ConfigService,
   ) {}

   async getCart(userId?: number, guestToken?: string) {
      try {
         if (!userId && !guestToken) {
            return this.createCart(userId, guestToken);
         }

         const whereCondition = userId ? { userId } : { token: guestToken };

         let cart = await this.prisma.cart.findUnique({
            where: whereCondition,
            include: {
               items: {
                  include: {
                     model: {
                        include: {
                           colors: true,
                        },
                     },
                     color: {
                        include: {
                           code: true,
                        },
                     },
                  },
                  orderBy: {
                     createdAt: 'desc',
                  },
               },
            },
         });

         return cart || (await this.createCart(userId, guestToken));
      } catch (e) {
         console.error(e);
         throw e;
      }
   }

   async createCart(userId?: number, guestToken?: string) {
      try {
         if (!userId) {
            if (!guestToken) {
               throwGraphQLError('Не знайдено токен авторизації', {
                  code: GraphqlErrorCode.UNAUTHENTICATED,
               });
            }

            return await this.prisma.cart.create({
               data: {
                  token: guestToken,
                  totalPrice: 0,
                  items: { create: [] },
               },
               include: {
                  items: {
                     include: {
                        model: true,
                        color: true,
                     },
                  },
               },
            });
         }

         validateValues(userId);

         return await this.prisma.cart.create({
            data: {
               userId,
               totalPrice: 0,
               items: { create: [] },
            },
            include: {
               items: {
                  include: {
                     model: true,
                     color: true,
                  },
               },
            },
         });
      } catch (e) {
         console.error(e);
         throw e;
      }
   }

   async addProduct(
      args: AddProductArgs & { userId?: number },
      guestToken?: string,
   ) {
      try {
         const { modelId, colorId, userId } = args;

         validateValues([modelId, colorId]);

         const model = await this.prisma.model.findUnique({
            where: {
               id: modelId,
            },
            select: { price: true },
         });

         if (!model) {
            throwGraphQLError('Модель не знайдена', {
               code: GraphqlErrorCode.RESOURCE_NOT_FOUND,
            });
         }

         let cart = await this.getCart(userId, guestToken);

         const cartItem = await this.findCartItem(cart.id, modelId, colorId);

         if (cartItem) {
            await this.prisma.cartItem.update({
               where: {
                  id: cartItem.id,
               },
               data: { quantity: cartItem.quantity + 1 },
            });
         } else {
            await this.prisma.cartItem.create({
               data: {
                  cartId: cart.id,
                  modelId: Number(modelId),
                  quantity: 1,
                  price: model.price,
                  colorId: Number(colorId),
               },
            });
         }

         await this.updateTotalPrice(cart.id);

         return this.getCart(userId, guestToken);
      } catch (e) {
         console.error(e);
         throw e;
      }
   }

   async updateTotalPrice(cartId: number) {
      try {
         validateValues(cartId);

         const cart = await this.prisma.cart.findUnique({
            where: { id: cartId },
            include: { items: true },
         });

         if (!cart) {
            throwGraphQLError('Кошик не знайдено', {
               code: GraphqlErrorCode.RESOURCE_NOT_FOUND,
            });
         }

         const totalPrice = cart.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
         );

         await this.prisma.cart.update({
            where: { id: cartId },
            data: { totalPrice },
         });
      } catch (e) {
         console.error(e);
         throw e;
      }
   }

   async updateProduct(
      args: UpdateProductArgs & { userId: number },
      guestToken?: string,
   ) {
      try {
         const { modelId, userId, colorId, quantity } = args;

         validateValues([modelId, colorId, quantity]);

         if (quantity < 0) {
            throwGraphQLError('Кількість товару не може бути меньше 0', {
               code: GraphqlErrorCode.BAD_USER_INPUT,
            });
         }

         const cart = await this.getCart(userId, guestToken);

         if (!cart) {
            throwGraphQLError('Кошик не знайдено', {
               code: GraphqlErrorCode.RESOURCE_NOT_FOUND,
            });
         }

         const cartItem = await this.prisma.cartItem.findFirst({
            where: {
               cartId: cart.id,
               modelId,
               colorId,
            },
         });

         if (!cartItem) {
            throwGraphQLError('Кошик не знайдено', {
               code: GraphqlErrorCode.RESOURCE_NOT_FOUND,
            });
         }

         const product = await this.prisma.color.findFirst({
            where: {
               modelId,
               id: colorId,
            },
            select: {
               stock: true,
            },
         });

         if (!product) {
            throwGraphQLError('Продукт не знайдено', {
               code: GraphqlErrorCode.RESOURCE_NOT_FOUND,
            });
         }

         if (quantity > product.stock) {
            throwGraphQLError(
               `Недостатньо одиниць товару. У наявності лише ${product.stock} шт.`,
               {
                  code: GraphqlErrorCode.BAD_USER_INPUT,
               },
            );
         }

         if (quantity === 0) {
            await this.removeProduct(modelId, userId);
            return this.getCart(userId);
         }

         await this.prisma.cartItem.update({
            where: {
               id: cartItem.id,
            },
            data: {
               quantity,
            },
         });

         await this.updateTotalPrice(cart.id);

         return this.getCart(userId, guestToken);
      } catch (e) {
         console.error(e);
         throw e;
      }
   }

   async removeProduct(modelId: number, userId?: number, guestToken?: string) {
      try {
         validateValues(modelId);

         const cart = await this.getCart(userId, guestToken);
         if (!cart) {
            throwGraphQLError('Кошик не знайдено', {
               code: GraphqlErrorCode.RESOURCE_NOT_FOUND,
            });
         }

         const cartItem = await this.prisma.cartItem.findFirst({
            where: {
               cartId: cart.id,
               modelId,
            },
         });

         if (!cartItem) {
            throwGraphQLError('Продукт не знайдено', {
               code: GraphqlErrorCode.RESOURCE_NOT_FOUND,
            });
         }

         await this.prisma.cartItem.delete({
            where: {
               id: cartItem.id,
            },
         });

         await this.updateTotalPrice(cart.id);

         return this.getCart(userId, guestToken);
      } catch (e) {
         console.error(e);
         throw e;
      }
   }

   private async findCartItem(
      cartId: number,
      modelId: number,
      colorId: number,
   ) {
      return this.prisma.cartItem.findFirst({
         where: { cartId, modelId, colorId },
      });
   }
}
