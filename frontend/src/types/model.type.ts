import { TCartItem } from './cart.type';
import { Code } from './code';
import { Color } from './color.type';
import { OrderItem } from './order.type';
import { Product } from './product.type';
import { Specs } from './specs.type';

export type Model = {
   id: number;
   name: string;
   product: Product;
   productId: number;
   price: number;
   colors: Color[];
   specs: Specs[];
   code: Code[];
   cartItem: TCartItem[];
   image: string;
   orderItem: OrderItem[];
   createdAt: Date;
   updatedAt: Date;
};
