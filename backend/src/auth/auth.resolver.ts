import { ForbiddenException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import {
   clearAuthCookies,
   getAuthTokens,
   setAuthCookies,
} from 'src/utils/cookie.utils';
import { AuthService } from './auth.service';
import { LoginArgs, RegisterArgs } from './dto';
import { JwtGuard } from './guard';
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

      console.log(accessToken);

      setAuthCookies(context.res, accessToken, refreshToken);

      return { message: 'Login successful' };
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
         throw new ForbiddenException('Authorization token is missing');
      }

      const { userId } =
         await this.authService.validateAccessToken(accessToken);

      const response = await this.authService.logout(userId, refreshToken);

      clearAuthCookies(context.res);

      return response;
   }
}
