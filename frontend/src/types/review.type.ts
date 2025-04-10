import { Product } from './product.type';
import { User } from './user.type';

export type Review = {
   id: number;
   user: User;
   userId: number;
   product: Product;
   productId: number;
   rating: number;
   comment: string;
   createdAt: Date;
   updatedAt: Date;
};
