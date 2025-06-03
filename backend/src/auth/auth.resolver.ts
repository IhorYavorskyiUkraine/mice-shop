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

      if (!refreshToken) {
         throwGraphQLError('Missing tokens', {
            code: GraphqlErrorCode.UNAUTHENTICATED,
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
      const { accessToken, refreshToken } = getAuthTokens(context.req);

      if (!refreshToken) {
         throwGraphQLError('Missing tokens', {
            code: GraphqlErrorCode.UNAUTHENTICATED,
         });
      }

      const payload = await this.authService.validateAccessToken(
         accessToken,
         false,
      );

      if (payload.userId) {
         return {
            message: 'Already authenticated',
            userId: payload.userId,
         };
      }

      const { userId } =
         await this.authService.validateRefreshToken(refreshToken);

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
         await this.authService.refresh(userId, refreshToken);

      setAuthCookies(context.res, newAccessToken, newRefreshToken);

      return {
         message: 'Refresh successful',
         accessToken: newAccessToken,
         refreshToken: newRefreshToken,
      };
   }

   @Query(() => AuthResponse)
   async isAuthenticated(@Context() context: { req: Request; res: Response }) {
      const { userId } = await this.authService.getValidUserIdOrThrow(
         context.req,
         context.res,
      );

      if (!userId) {
         return {
            status: false,
            userId: null,
         };
      }

      return { status: true, userId };
   }
}
