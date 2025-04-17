import {
   BadRequestException,
   Injectable,
   InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProductArgs } from './dto/updateProduct.args';

@Injectable()
export class CartService {
   constructor(private prisma: PrismaService) {}

   async getCart(userId: number) {
      try {
         this.validateIds(userId);

         let cart = await this.prisma.cart.findUnique({
            where: {
               userId,
            },
            include: {
               items: {
                  include: {
                     model: true,
                  },
               },
            },
         });

         return cart || this.createCart(userId);
      } catch (e) {
         console.error(e);
         throw new InternalServerErrorException(
            'Error fetching cart. Please try again later.',
         );
      }
   }

   async createCart(userId: number) {
      try {
         this.validateIds(userId);

         return await this.prisma.cart.create({
            data: {
               userId,
               totalPrice: 0,
               items: {
                  create: [],
               },
            },
            include: {
               items: {
                  include: {
                     model: true,
                  },
               },
            },
         });
      } catch (e) {
         console.error(e);
         throw new InternalServerErrorException('Failed to create cart');
      }
   }

   async addProduct(modelId: number, userId: number) {
      try {
         this.validateIds(userId, modelId);

         const model = await this.prisma.model.findUnique({
            where: {
               id: modelId,
            },
            select: { price: true },
         });

         if (!model) {
            throw new BadRequestException('Model not found');
         }

         let cart = await this.getCart(userId);

         const cartItem = await this.findCartItem(cart.id, modelId);

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
               },
            });
         }

         await this.updateTotalPrice(cart.id);

         return this.getCart(userId);
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

   async updateProduct(args: UpdateProductArgs & { userId: number }) {
      try {
         const { modelId, userId, color, quantity } = args;

         this.validateIds(userId, modelId);

         if (quantity < 0) {
            throw new BadRequestException('Quantity cannot be negative');
         }

         const cart = await this.getCart(userId);

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

         const product = await this.prisma.color.findFirst({
            where: {
               modelId,
               name: color,
            },
            select: {
               stock: true,
            },
         });

         if (!color) {
            throw new BadRequestException('Color not found');
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

         return this.getCart(userId);
      } catch (e) {
         console.error(e);
         if (e instanceof BadRequestException) throw e;
         throw new InternalServerErrorException(
            'Failed to update product in cart',
         );
      }
   }

   async removeProduct(modelId: number, userId: number) {
      try {
         this.validateIds(userId, modelId);

         const cart = await this.getCart(userId);
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

         return this.getCart(userId);
      } catch (e) {
         console.error(e);
         if (e instanceof BadRequestException) throw e;
         throw new InternalServerErrorException(
            'Failed to remove product from cart',
         );
      }
   }

   private async findCartItem(cartId: number, modelId: number) {
      return this.prisma.cartItem.findFirst({
         where: { cartId, modelId },
      });
   }

   private validateIds(userId: number, modelId?: number) {
      if (!userId) throw new BadRequestException('User ID is required');
      if (modelId && modelId <= 0) {
         throw new BadRequestException('Invalid product ID');
      }
   }
}
