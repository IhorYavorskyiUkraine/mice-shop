import {
   ConflictException,
   ForbiddenException,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import { argon2id, hash, verify } from 'argon2';
import { GraphQLError } from 'graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { LoginArgs, RegisterArgs } from './dto';

@Injectable()
export class AuthService {
   constructor(
      private prisma: PrismaService,
      private userService: UserService,
      private jwtService: JwtService,
      private config: ConfigService,
   ) {}

   async login(args: LoginArgs) {
      const { email, password } = args;

      try {
         if (!email || !password) {
            throw new UnauthorizedException('Please enter your credentials');
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
         console.error('AuthService Error:', e);
         throw new ForbiddenException(e.message || 'Authentication failed');
      }
   }

   async register(args: RegisterArgs) {
      const { email, password, displayName, confirmPassword } = args;

      try {
         if (!email || !password || !displayName) {
            throw new UnauthorizedException('Please enter your credentials');
         }

         if (password !== confirmPassword) {
            throw new ForbiddenException('Passwords do not match');
         }

         const existingUser = await this.userService.findUserByEmail(email);

         if (existingUser) {
            throw new ConflictException('User already exists');
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
            throw new ForbiddenException('User could not be created');
         }

         return this.generateTokens(newUser.id);
      } catch (e) {
         console.error('AuthService Error:', e);
         if (e instanceof ConflictException) {
            throw new GraphQLError('Перевірте емейл', {
               extensions: {
                  code: 'BAD_USER_INPUT',
                  argumentName: 'email',
               },
            });
         }
      }
   }

   async logout(userId: number, refreshToken: string) {
      try {
         const user = await this.userService.findUserById(userId);

         if (!user || !refreshToken) {
            throw new ForbiddenException('User or refresh token not found');
         }

         await this.revokeToken(refreshToken);
         await this.deleteRefreshToken(userId);

         return { message: 'Logged out successful' };
      } catch (e) {
         throw new ForbiddenException('Logout failed');
      }
   }

   async refresh(userId: number, refreshToken: string) {
      try {
         const user = await this.userService.findUserById(userId);
         if (!user) {
            throw new ForbiddenException('User not found');
         }

         const isRevoked = await this.isTokenRevoked(refreshToken);

         if (isRevoked) {
            throw new ForbiddenException('Refresh token is revoked');
         }

         return this.generateTokens(user.id);
      } catch (e) {
         console.error(e);
      }
   }

   private async findUserByEmailOrThrow(email: string) {
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
         throw new GraphQLError('Неправильний пароль або емейл', {
            extensions: {
               code: 'BAD_USER_INPUT',
               argumentName: 'password',
            },
         });
      }
      return user;
   }

   private async validatePassword(password: string, hashedPassword: string) {
      const isPasswordCorrect = await verify(hashedPassword, password);
      if (!isPasswordCorrect) {
         throw new GraphQLError('Неправильний емейл або пароль', {
            extensions: {
               code: 'BAD_USER_INPUT',
               argumentName: 'Credentials are not correct',
            },
         });
      }

      return true;
   }

   async validateAccessToken(accessToken: string) {
      try {
         const decoded = await this.jwtService.verify(accessToken, {
            secret: this.config.get('JWT_SECRET'),
         });

         if (!decoded || !decoded.userId) {
            throw new UnauthorizedException('Invalid access token');
         }

         return decoded as { userId: number };
      } catch (error) {
         console.error('Error validating access token:', error);
         throw new UnauthorizedException('Invalid or expired access token');
      }
   }

   async validateRefreshToken(refreshToken: string) {
      try {
         const payload = this.jwtService.verify(refreshToken, {
            secret: this.config.get('REFRESH_JWT_SECRET'),
         });

         const user = await this.prisma.user.findUnique({
            where: { id: payload.userId },
            include: { refreshToken: true },
         });

         if (!user) return null;

         return { userId: user.id };
      } catch (error) {
         console.error('Error validating refresh token:', error);
         throw new UnauthorizedException('Invalid refresh token');
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
      await this.prisma.refreshToken.deleteMany({
         where: { userId },
      });
   }

   async generateRefreshToken(userId: number) {
      await this.deleteRefreshToken(userId);

      const refreshToken = this.jwtService.sign(
         { userId },
         {
            secret: this.config.get('REFRESH_JWT_SECRET'),
            expiresIn: this.config.get('REFRESH_JWT_SECRET_EXPIRES_IN'),
         },
      );

      await this.prisma.refreshToken.create({
         data: {
            token: refreshToken,
            userId,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
         },
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
      const revokedToken = await this.prisma.revokedToken.create({
         data: { token },
      });

      if (!revokedToken) {
         throw new ForbiddenException('Failed to revoke token');
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
}
