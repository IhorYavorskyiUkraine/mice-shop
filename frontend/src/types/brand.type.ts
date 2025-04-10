import { Product } from './product.type';

export type Brand = {
   id: number;
   name: string;
   products: Product[];
   createdAt: Date;
   updatedAt: Date;
};
