import {
   ForbiddenException,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { LoginArgs } from './dto';

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
            await this.prisma.refreshToken.deleteMany({
               where: {
                  userId: user.id,
               },
            });

            await this.revokeToken(refreshToken.token);
         }

         return this.generateTokens(user);
      } catch (e) {
         throw new ForbiddenException(e);
      }
   }

   private async findUserByEmailOrThrow(email: string) {
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
         throw new ForbiddenException('Credentials are not correct');
      }
      return user;
   }

   private async validatePassword(password: string, hashedPassword: string) {
      const isPasswordCorrect = await compare(password, hashedPassword);
      if (!isPasswordCorrect) {
         throw new ForbiddenException('Credentials are not correct');
      }

      return true;
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

         if (!user || user.refreshToken.token !== refreshToken) return null;

         return user;
      } catch (error) {
         throw new UnauthorizedException('Invalid refresh token');
      }
   }

   async generateRefreshToken(payload: { userId: number }) {
      if (!payload.userId) {
         throw new ForbiddenException('User ID is missing in the payload');
      }

      const refreshToken = this.jwtService.sign(payload, {
         secret: this.config.get('REFRESH_JWT_SECRET'),
         expiresIn: this.config.get('REFRESH_JWT_SECRET_EXPIRES_IN'),
      });

      const newRefreshToken = await this.prisma.refreshToken.create({
         data: {
            userId: payload.userId,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
         },
      });

      if (!newRefreshToken) {
         throw new ForbiddenException('Failed to generate refresh token');
      }

      return newRefreshToken.token;
   }

   async generateAccessToken(payload: { email: string; userId: number }) {
      const token = this.jwtService.sign(payload, {
         secret: this.config.get('JWT_SECRET'),
         expiresIn: this.config.get('JWT_SECRET_EXPIRE_IN'),
      });

      return token;
   }

   private async generateTokens(user: { id: number; email: string }) {
      const payload = { email: user.email, userId: user.id };

      const accessToken = await this.generateAccessToken(payload);
      const refreshToken = await this.generateRefreshToken({ userId: user.id });

      return { accessToken, refreshToken };
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
