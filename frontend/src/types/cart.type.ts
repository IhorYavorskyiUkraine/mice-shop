import { Model } from './model.type';
import { User } from './user.type';

export type Cart = {
   id: number;
   items: CartItem[];
   totalPrice: number;
   user: User;
   userId: number;
   createdAt: Date;
   updatedAt: Date;
};

export type CartItem = {
   id: number;
   model: Model;
   modelId: number;
   quantity: number;
   price: number;
   cart: Cart;
   cartId: number;
   createdAt: Date;
   updatedAt: Date;
};
