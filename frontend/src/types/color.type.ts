import { Model } from './model.type';

export type Color = {
   id: number;
   name: string;
   hex: string;
   model: Model;
   modelId: number;
   createdAt: Date;
   updatedAt: Date;
};
