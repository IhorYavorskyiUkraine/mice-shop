import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { GraphqlErrorCode } from 'src/common/errors/graphql-error-codes.enum';
import { throwGraphQLError } from 'src/common/errors/graphql-errors';
import {
   clearAuthCookies,
   getAuthTokens,
   setAuthCookies,
} from 'src/utils/cookie.utils';
import { AuthService } from './auth.service';
import { LoginArgs, RegisterArgs } from './dto';
import { JwtGuard, RefreshTokenGuard } from './guard';
import { AuthResponse } from './types/auth.type';

@Resolver()
export class AuthResolver {
   constructor(private readonly authService: AuthService) {}

   @Mutation(() => AuthResponse)
   async login(
      @Args('args') args: LoginArgs,
      @Context() context: { req: Request; res: Response },
   ) {
      const { accessToken, refreshToken } = await this.authService.login(args);

      setAuthCookies(context.res, accessToken, refreshToken);

      const { userId } =
         await this.authService.validateAccessToken(accessToken);

      return { message: 'Login successful', userId };
   }

   @Mutation(() => AuthResponse)
   async register(
      @Args('args') args: RegisterArgs,
      @Context() context: { req: Request; res: Response },
   ) {
      const { accessToken, refreshToken } =
         await this.authService.register(args);

      setAuthCookies(context.res, accessToken, refreshToken);

      return { message: 'Register successful' };
   }

   @UseGuards(JwtGuard)
   @Mutation(() => AuthResponse)
   async logout(@Context() context: { req: Request; res: Response }) {
      const { accessToken, refreshToken } = getAuthTokens(context.req);

      if (!accessToken || !refreshToken) {
         throwGraphQLError('Missing tokens', {
            extensions: {
               code: GraphqlErrorCode.UNAUTHENTICATED,
            },
         });
      }

      const { userId } =
         await this.authService.validateAccessToken(accessToken);

      const response = await this.authService.logout(userId, refreshToken);

      clearAuthCookies(context.res);

      return response;
   }

   @UseGuards(RefreshTokenGuard)
   @Mutation(() => AuthResponse)
   async refresh(@Context() context: { req: Request; res: Response }) {
      const { refreshToken } = getAuthTokens(context.req);

      if (!refreshToken) {
         throwGraphQLError('Missing tokens', {
            extensions: {
               code: GraphqlErrorCode.UNAUTHENTICATED,
            },
         });
      }

      const { userId } =
         await this.authService.validateRefreshToken(refreshToken);

      const { accessToken, refreshToken: newRefreshToken } =
         await this.authService.refresh(userId, refreshToken);

      setAuthCookies(context.res, accessToken, newRefreshToken);

      return { message: 'Refresh successful', accessToken, refreshToken };
   }

   @UseGuards(JwtGuard)
   @Query(() => AuthResponse)
   async isAuthenticated(@Context() context: { req: Request; res: Response }) {
      const { accessToken } = getAuthTokens(context.req);

      if (!accessToken) {
         return { message: 'Not authenticated', userId: null };
      }

      const { userId } =
         await this.authService.validateAccessToken(accessToken);

      return { message: 'Authenticated', userId };
   }
}
