import { User } from './user.type';

export type RefreshToken = {
   id: number;
   token: string;
   user: User;
   userId: number;
   createdAt: Date;
   expiresAt: Date;
   updatedAt: Date;
};

export type RevokedToken = {
   id: string;
   token: string;
   createdAt: Date;
};
