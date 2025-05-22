import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { argon2id, hash, verify } from 'argon2';
import { GraphqlErrorCode } from 'src/common/errors/graphql-error-codes.enum';
import { throwGraphQLError } from 'src/common/errors/graphql-errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserArgs, UpdateUserArgs } from './dto';

@Injectable()
export class UserService {
   constructor(private prisma: PrismaService) {}

   async findUserByEmail(email: string) {
      try {
         if (!email) {
            throwGraphQLError("Поле 'email' є обов'язковим", {
               extensions: {
                  code: GraphqlErrorCode.BAD_USER_INPUT,
               },
            });
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
            throwGraphQLError('Ідентифікатор користувача не вказано', {
               extensions: {
                  code: GraphqlErrorCode.BAD_USER_INPUT,
               },
            });
         }

         const user = await this.prisma.user.findUnique({
            where: {
               id,
            },
         });

         if (!user) {
            throwGraphQLError('Користувача з таким id не знайдено', {
               extensions: {
                  code: GraphqlErrorCode.RESOURCE_NOT_FOUND,
               },
            });
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
            select: {
               id: true,
               email: true,
               displayName: true,
               createdAt: true,
               updatedAt: true,
            },
         });

         if (!newUser) {
            throwGraphQLError('Сталася помилка при створенні користувача', {
               extensions: {
                  code: GraphqlErrorCode.INTERNAL_SERVER_ERROR,
               },
            });
         }

         return newUser;
      } catch (e) {
         console.error(e);
         if (
            e instanceof Prisma.PrismaClientKnownRequestError &&
            e.code === 'P2002'
         ) {
            throwGraphQLError('Користувач з такою емейлом вже існує', {
               extensions: {
                  code: GraphqlErrorCode.NOT_ALLOWED,
               },
            });
         }

         throw e;
      }
   }

   async updateUser(args: UpdateUserArgs, userId: number) {
      try {
         const user = await this.prisma.user.findUnique({
            where: { id: userId },
         });
         if (!user) {
            throwGraphQLError('Користувача з таким id не знайдено', {
               extensions: {
                  code: GraphqlErrorCode.RESOURCE_NOT_FOUND,
               },
            });
         }

         const updateData: any = { ...args };

         if (args.newPassword) {
            if (!args.oldPassword) {
               throwGraphQLError('Не вказано старий пароль', {
                  extensions: {
                     code: GraphqlErrorCode.BAD_USER_INPUT,
                  },
               });
            }

            const isValid = await verify(user.password, args.oldPassword);
            if (!isValid) {
               throwGraphQLError('Неправильний пароль', {
                  extensions: {
                     code: GraphqlErrorCode.INVALID_CREDENTIALS,
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
      } catch (e) {
         console.error(e);
         throw e;
      }
   }
}
