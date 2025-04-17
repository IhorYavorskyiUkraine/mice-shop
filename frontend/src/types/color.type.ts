import { Model } from './model.type';

export type Color = {
   id: number;
   name: string;
   hex: string;
   image: string;
   stock: number;
   model: Model;
   modelId: number;
   createdAt: Date;
   updatedAt: Date;
};
