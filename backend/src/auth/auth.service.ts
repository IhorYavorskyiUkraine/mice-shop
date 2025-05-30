import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import { argon2id, hash, verify } from 'argon2';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { GraphqlErrorCode } from 'src/common/errors/graphql-error-codes.enum';
import { throwGraphQLError } from 'src/common/errors/graphql-errors';
import { OtpService } from 'src/otp/otp.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { getAuthTokens, setAuthCookies } from 'src/utils/cookie.utils';
import { LoginArgs, RegisterArgs } from './dto';
const ms = require('ms');

@Injectable()
export class AuthService {
   constructor(
      private prisma: PrismaService,
      private userService: UserService,
      private jwtService: JwtService,
      private config: ConfigService,
      private otpService: OtpService,
   ) {}

   async login(args: LoginArgs) {
      const { email, password } = args;

      try {
         if (!email || !password) {
            throwGraphQLError('Введіть правильні емейл і пароль', {
               code: GraphqlErrorCode.INVALID_CREDENTIALS,
            });
         }

         const user = await this.findUserByEmailOrThrow(email);

         await this.validatePassword(password, user.password);

         const refreshToken = await this.prisma.refreshToken.findFirst({
            where: {
               userId: user.id,
               expiresAt: { gt: new Date() },
            },
            select: { token: true },
         });

         if (refreshToken) {
            await this.deleteRefreshToken(user.id);

            await this.revokeToken(refreshToken.token);
         }

         return this.generateTokens(user.id);
      } catch (e) {
         console.error(e);
         throw e;
      }
   }

   async register(args: RegisterArgs) {
      const { email, password, displayName, confirmPassword } = args;

      try {
         if (!email || !password || !displayName) {
            throwGraphQLError('Введіть правильні емейл, пароль і ім’я', {
               code: GraphqlErrorCode.BAD_USER_INPUT,
            });
         }

         if (password !== confirmPassword) {
            throwGraphQLError('Паролі не співпадають', {
               code: GraphqlErrorCode.PASSWORDS_DO_NOT_MATCH,
            });
         }

         const existingUser = await this.userService.findUserByEmail(email);

         if (existingUser) {
            throwGraphQLError('Користувач з таким емейлом вже існує', {
               code: GraphqlErrorCode.EMAIL_ALREADY_EXISTS,
            });
         }

         const hashedPassword = await hash(password, {
            type: argon2id,
            timeCost: 3,
            memoryCost: 65536,
            parallelism: 1,
         });

         const newUser = await this.userService.createUser({
            email,
            password: hashedPassword,
            displayName,
            role: UserRole.USER,
         });

         if (!newUser) {
            throwGraphQLError('Створення користувача не вдалося', {
               code: GraphqlErrorCode.INTERNAL_SERVER_ERROR,
            });
         }

         await this.otpService.sendOtpFromEmail(newUser.id, email);

         return this.generateTokens(newUser.id);
      } catch (e) {
         console.error(e);
         throw e;
      }
   }

   async logout(userId: number, refreshToken: string) {
      try {
         const user = await this.userService.findUserById(userId);

         if (!user || !refreshToken) {
            throwGraphQLError('Не вдалося вийти з акаунту', {
               code: GraphqlErrorCode.NOT_ALLOWED,
            });
         }

         await this.revokeToken(refreshToken);
         await this.deleteRefreshToken(userId);

         return { message: 'Logged out successfully' };
      } catch (e) {
         console.error(e);
         throw e;
      }
   }

   async refresh(userId: number, refreshToken: string) {
      try {
         const user = await this.userService.findUserById(userId);
         if (!user) {
            throwGraphQLError('Не вдалося знайти користувача', {
               code: GraphqlErrorCode.USER_NOT_FOUND,
            });
         }

         const isRevoked = await this.isTokenRevoked(refreshToken);

         if (isRevoked) {
            throwGraphQLError('Refresh token is revoked', {
               code: GraphqlErrorCode.TOKEN_REVOKED,
            });
         }

         return this.generateTokens(user.id);
      } catch (e) {
         console.error(e);
         throw e;
      }
   }

   private async findUserByEmailOrThrow(email: string) {
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
         throwGraphQLError('Неправильний емейл або пароль', {
            code: GraphqlErrorCode.INVALID_CREDENTIALS,
         });
      }
      return user;
   }

   private async validatePassword(password: string, hashedPassword: string) {
      const isPasswordCorrect = await verify(hashedPassword, password);
      if (!isPasswordCorrect) {
         throwGraphQLError('Неправильний емейл або пароль', {
            code: GraphqlErrorCode.INVALID_CREDENTIALS,
         });
      }

      return true;
   }

   async validateAccessToken(
      accessToken: string,
      refresh = true,
      res?: Response,
   ) {
      try {
         if (!accessToken) {
            if (refresh) {
               throwGraphQLError('Недійсний токен доступу', {
                  code: GraphqlErrorCode.UNAUTHENTICATED,
               });
            }
            return { userId: null };
         }

         const decoded = await this.jwtService.verify(accessToken, {
            secret: this.config.get('JWT_SECRET'),
         });

         if (!decoded || !decoded.userId) {
            if (refresh) {
               throwGraphQLError('Недійсний токен доступу', {
                  code: GraphqlErrorCode.UNAUTHENTICATED,
               });
            }
            return { userId: null };
         }

         return decoded as { userId: number };
      } catch (e) {
         res?.clearCookie('accessToken');
         console.error(e);
         throw e;
      }
   }

   async validateRefreshToken(refreshToken: string, res?: Response) {
      try {
         const payload = this.jwtService.verify(refreshToken, {
            secret: this.config.get('REFRESH_JWT_SECRET'),
         });

         const user = await this.prisma.user.findUnique({
            where: { id: payload.userId },
            include: { refreshToken: true },
         });

         if (!user) {
            throwGraphQLError('Користувача не знайдено', {
               code: GraphqlErrorCode.USER_NOT_FOUND,
            });
         }

         return { userId: user.id };
      } catch (e) {
         res?.clearCookie('refreshToken');
         console.error(e);
         throw e;
      }
   }

   async generateAccessToken(userId: number) {
      return this.jwtService.sign(
         { userId },
         {
            secret: this.config.get('JWT_SECRET'),
            expiresIn: this.config.get('JWT_SECRET_EXPIRES_IN'),
         },
      );
   }

   async deleteRefreshToken(userId: number) {
      try {
         await this.prisma.refreshToken.deleteMany({
            where: { userId },
         });
      } catch (e) {
         console.error(e);
      }
   }

   async generateRefreshToken(userId: number) {
      const refreshToken = this.jwtService.sign(
         { userId, jti: randomUUID() },
         {
            secret: this.config.get('REFRESH_JWT_SECRET'),
            expiresIn: this.config.get('REFRESH_JWT_SECRET_EXPIRES_IN'),
         },
      );

      const expiresAt = new Date(
         Date.now() + ms(this.config.get('REFRESH_JWT_SECRET_EXPIRES_IN')),
      );

      await this.prisma.refreshToken.upsert({
         where: { userId },
         update: { token: refreshToken, expiresAt },
         create: { userId, token: refreshToken, expiresAt },
      });

      return refreshToken;
   }

   async generateTokens(userId: number) {
      return {
         accessToken: await this.generateAccessToken(userId),
         refreshToken: await this.generateRefreshToken(userId),
      };
   }

   //REVOKED TOKENS
   async revokeToken(token: string) {
      try {
         await this.prisma.revokedToken.create({
            data: { token },
         });
      } catch (e) {
         console.error('Не вдалося забрати токен:', e);
      }
   }

   async isTokenRevoked(token: string): Promise<boolean> {
      const revokedToken = await this.prisma.revokedToken.findUnique({
         where: { token },
      });

      return !!revokedToken;
   }

   async cleanUpExpiredTokens() {
      await this.prisma.revokedToken.deleteMany();
   }

   async getValidUserIdOrThrow(
      req: Request,
      res?: Response,
   ): Promise<{ userId?: number; guestToken?: string }> {
      const { accessToken, refreshToken } = getAuthTokens(req);

      const guest = req['guestToken'];
      if (guest?.guest && guest.userId) {
         return { guestToken: guest.userId };
      }

      if (accessToken) {
         const payload = await this.validateAccessToken(accessToken, false);
         if (payload?.userId) {
            return { userId: payload.userId };
         }
      }

      if (!refreshToken) {
         throwGraphQLError('Не знайдено токен авторизації', {
            code: GraphqlErrorCode.UNAUTHENTICATED,
         });
      }

      const { userId } = await this.validateRefreshToken(refreshToken, res);

      if (!userId) {
         throwGraphQLError('Не знайдено користувача', {
            code: GraphqlErrorCode.UNAUTHENTICATED,
         });
      }

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
         await this.refresh(userId, refreshToken);

      if (res) {
         setAuthCookies(res, newAccessToken, newRefreshToken);
      }

      return { userId };
   }
}
