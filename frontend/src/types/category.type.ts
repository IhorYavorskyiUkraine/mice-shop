import { Product } from './product.type';

export type Category = {
   id: number;
   name: string;
   products: Product[];
   createdAt: Date;
   updatedAt: Date;
};
