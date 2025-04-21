import { Color } from './color.type';
import { Model } from './model.type';
import { User } from './user.type';

export type TCart = {
   id: number;
   items: TCartItem[];
   totalPrice: number;
   user: User;
   userId: number;
   createdAt: Date;
   updatedAt: Date;
};

export type TCartItem = {
   id: number;
   model: Model;
   modelId: number;
   quantity: number;
   price: number;
   color: Color;
   colorId: number;
   cart: TCart;
   cartId: number;
   createdAt: Date;
   updatedAt: Date;
};
