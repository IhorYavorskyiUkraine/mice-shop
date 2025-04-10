import { Model } from './model.type';
import { Product } from './product.type';

export type Specs = {
   id: number;
   key: string;
   value: string;
   model?: Model | null;
   modelId?: number | null;
   product?: Product | null;
   productId?: number | null;
   createdAt: Date;
   updatedAt: Date;
};
