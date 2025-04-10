import { Product } from './product.type';

export type Tag = {
   id: number;
   name: string;
   products: ProductTag[];
   createdAt: Date;
   updatedAt: Date;
};

export type ProductTag = {
   id: number;
   productId: number;
   product: Product;
   tagId: number;
   tag: Tag;
   createdAt: Date;
   updatedAt: Date;
};
