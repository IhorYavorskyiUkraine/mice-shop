import { OrderStatus } from './enums.type';
import { Model } from './model.type';
import { User } from './user.type';

export type Order = {
   id: number;
   user: User;
   userId: number;
   status: OrderStatus;
   total: number;
   address: string;
   phone: string;
   email: string;
   name: string;
   orderItems: OrderItem[];
   createdAt: Date;
   updatedAt: Date;
};

export type OrderItem = {
   id: number;
   order: Order;
   orderId: number;
   model: Model;
   modelId: number;
   quantity: number;
   price: number;
   createdAt: Date;
   updatedAt: Date;
};
