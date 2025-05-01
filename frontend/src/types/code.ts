import { Color } from './color.type';
import { Model } from './model.type';
import { User } from './user.type';

export type Code = {
   id: number;
   code: string;
   model: Model;
   modelId: number;
   color: Color;
   colorId: number;
   likedUsers: User[];
   createdAt: Date;
   updatedAt: Date;
};
