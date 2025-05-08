import {
   BadRequestException,
   Injectable,
   InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { AddProductArgs } from './dto/addProduct.args';
import { UpdateProductArgs } from './dto/updateProduct.args';

@Injectable()
export class CartService {
   constructor(
      private prisma: PrismaService,
      private jwtService: JwtService,
      private config: ConfigService,
   ) {}

   async getCart(userId?: number, res?: Response) {
      try {
         if (!userId && (!res || !this.getCartTokenFromRequest(res))) {
            return this.createCart(userId, res);
         }

         const whereCondition = userId
            ? { userId }
            : { token: this.getCartTokenFromRequest(res) };

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
                     color: true,
                  },
                  orderBy: {
                     createdAt: 'desc',
                  },
               },
            },
         });

         return cart || this.createCart(userId, res);
      } catch (e) {
         console.error('Error fetching cart', e);
         throw new InternalServerErrorException(
            'Error fetching cart. Please try again later.',
         );
      }
   }

   async createCart(userId?: number, res?: Response) {
      try {
         if (!userId) {
            if (!res) {
               throw new BadRequestException(
                  'Response object is required for guest carts',
               );
            }

            const cartToken = this.generateCartToken();
            this.setCartCookie(res, cartToken);

            return await this.prisma.cart.create({
               data: {
                  token: cartToken,
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

         this.validateIds(userId);

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
         console.error('Failed to create cart', e);
         throw new InternalServerErrorException('Failed to create cart');
      }
   }

   async addProduct(
      args: AddProductArgs & { userId?: number },
      res?: Response,
   ) {
      try {
         const { modelId, colorId, userId } = args;

         this.validateIds([modelId, colorId]);

         const model = await this.prisma.model.findUnique({
            where: {
               id: modelId,
            },
            select: { price: true },
         });

         if (!model) {
            throw new BadRequestException('Model not found');
         }

         let cart = await this.getCart(userId, res);

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

         return this.getCart(userId, res);
      } catch (e) {
         console.error(e);
         if (e instanceof BadRequestException) throw e;
         throw new InternalServerErrorException(
            'Failed to add product to cart',
         );
      }
   }

   async updateTotalPrice(cartId: number) {
      try {
         this.validateIds(cartId);

         const cart = await this.prisma.cart.findUnique({
            where: { id: cartId },
            include: { items: true },
         });

         if (!cart) {
            throw new BadRequestException('Cart not found');
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
         throw new InternalServerErrorException(
            'Failed to update cart total price',
         );
      }
   }

   async updateProduct(
      args: UpdateProductArgs & { userId: number },
      res?: Response,
   ) {
      try {
         const { modelId, userId, colorId, quantity } = args;

         this.validateIds([modelId, colorId, quantity]);

         if (quantity < 0) {
            throw new BadRequestException('Quantity cannot be negative');
         }

         const cart = await this.getCart(userId, res);

         if (!cart) {
            throw new BadRequestException('Cart not found');
         }

         const cartItem = await this.prisma.cartItem.findFirst({
            where: {
               cartId: cart.id,
               modelId,
               colorId,
            },
         });

         if (!cartItem) {
            throw new BadRequestException('Product not found in cart');
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
            throw new BadRequestException('Product not found');
         }

         if (quantity > product.stock) {
            throw new BadRequestException(
               `Not enough stock available. Only ${product.stock} items left.`,
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

         return this.getCart(userId, res);
      } catch (e) {
         console.error(e);
         if (e instanceof BadRequestException) throw e;
         throw new InternalServerErrorException(
            'Failed to update product in cart',
         );
      }
   }

   async removeProduct(modelId: number, userId?: number, res?: Response) {
      try {
         this.validateIds(modelId);

         const cart = await this.getCart(userId, res);
         if (!cart) {
            throw new BadRequestException('Cart not found');
         }

         const cartItem = await this.prisma.cartItem.findFirst({
            where: {
               cartId: cart.id,
               modelId,
            },
         });

         if (!cartItem) {
            throw new BadRequestException('Product not found in cart');
         }

         await this.prisma.cartItem.delete({
            where: {
               id: cartItem.id,
            },
         });

         await this.updateTotalPrice(cart.id);

         return this.getCart(userId, res);
      } catch (e) {
         console.error(e);
         if (e instanceof BadRequestException) throw e;
         throw new InternalServerErrorException(
            'Failed to remove product from cart',
         );
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

   private validateIds(value: string | number | (string | number)[]): void {
      if (Array.isArray(value)) {
         if (value.length === 0) {
            throw new BadRequestException(`IDs array is empty`);
         }

         for (const v of value) {
            if (!v && v !== 0) {
               throw new BadRequestException(
                  `Each ID is required and cannot be ${v}`,
               );
            }
         }
      } else {
         if (!value && value !== 0) {
            throw new BadRequestException(`${value} is required`);
         }
      }
   }

   private generateCartToken(): string {
      return this.jwtService.sign(
         { cartId: uuidv4() },
         {
            secret: this.config.get('JWT_SECRET'),
            expiresIn: this.config.get('JWT_SECRET_EXPIRES_IN'),
         },
      );
   }

   private setCartCookie(res: Response, token: string): void {
      res.cookie('cartToken', token, {
         httpOnly: true,
         secure: this.config.get('NODE_ENV') === 'production',
         sameSite: 'lax',
         maxAge: this.config.get('CART_TOKEN_MAX_AGE'),
      });
   }

   private getCartTokenFromRequest(res: Response): string | undefined {
      if (!res?.req?.cookies) return undefined;
      return res.req.cookies.cartToken;
   }
}
