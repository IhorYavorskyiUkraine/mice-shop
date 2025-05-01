import {
   BadRequestException,
   Injectable,
   NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { argon2id, hash, verify } from 'argon2';
import { GraphQLError } from 'graphql';
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

         throw e;
      }
   }

   async updateUser(args: UpdateUserArgs, userId: number) {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new NotFoundException('Користувача не знайдено');

      const updateData: any = { ...args };

      if (args.newPassword) {
         if (!args.oldPassword) {
            throw new BadRequestException('Потрібно вказати старий пароль');
         }

         const isValid = await verify(user.password, args.oldPassword);
         if (!isValid) {
            throw new GraphQLError('Неправильний пароль', {
               extensions: {
                  code: 'BAD_USER_INPUT',
                  argumentName: 'oldPassword',
               },
            });
         }

         const hashedNewPassword = await hash(args.newPassword, {
            type: argon2id,
            timeCost: 3,
            memoryCost: 65536,
            parallelism: 1,
         });

         updateData.password = hashedNewPassword;
      }

      delete updateData.newPassword;
      delete updateData.oldPassword;

      return this.prisma.user.update({
         where: { id: userId },
         data: updateData,
      });
   }
}
