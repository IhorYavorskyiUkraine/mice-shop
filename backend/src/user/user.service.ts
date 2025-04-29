import {
   BadRequestException,
   Injectable,
   NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { verify } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserArgs, UpdateUserArgs } from './dto';

@Injectable()
export class UserService {
   constructor(private prisma: PrismaService) {}

   async findUserByEmail(email: string) {
      try {
         if (!email) {
            throw new BadRequestException('Email is required');
         }

         const user = await this.prisma.user.findUnique({
            where: {
               email,
            },
         });

         return user;
      } catch (e) {
         console.error(e);
         throw e;
      }
   }

   async findUserById(id: number) {
      try {
         if (!id) {
            throw new BadRequestException('Id is required');
         }

         const user = await this.prisma.user.findUnique({
            where: {
               id,
            },
         });

         if (!user) {
            throw new NotFoundException('User not found');
         }

         return user;
      } catch (e) {
         console.error(e);
         throw e;
      }
   }

   async createUser(args: CreateUserArgs) {
      try {
         const newUser = await this.prisma.user.create({
            data: {
               ...args,
            },
         });

         if (!newUser) {
            throw new BadRequestException('Failed to create user');
         }

         return newUser;
      } catch (e) {
         if (
            e instanceof Prisma.PrismaClientKnownRequestError &&
            e.code === 'P2002'
         ) {
            throw new BadRequestException('Email already exists');
         }

         console.error(e);
         throw e;
      }
   }

   async updateUser(args: UpdateUserArgs, userId: number) {
      try {
         const user = await this.prisma.user.findUnique({
            where: { id: userId },
         });

         if (!user) {
            throw new NotFoundException('User not found');
         }

         const isValid = await verify(user.password, args.password);

         if (!isValid) {
            throw new BadRequestException('Invalid password');
         }

         const updatedUser = await this.prisma.user.update({
            where: {
               id: userId,
            },
            data: {
               ...args,
               password: args.password,
            },
         });

         if (!updatedUser) {
            throw new BadRequestException('Failed to update user');
         }

         return user;
      } catch (e) {
         console.error(e);
         throw e;
      }
   }
}
