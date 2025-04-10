import { Cart } from './cart.type';
import { UserRole } from './enums.type';
import { Order } from './order.type';
import { Review } from './review.type';
import { RefreshToken } from './tokens.type';

export type User = {
   id: number;
   displayName: string;
   email: string;
   password: string;
   role: UserRole;
   refreshToken?: RefreshToken | null;
   orders: Order[];
   reviews: Review[];
   cart?: Cart | null;
   createdAt: Date;
   updatedAt: Date;
};
