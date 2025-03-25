import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginArgs } from './dto';
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

      // setAuthCookies(context.res, accessToken, refreshToken);

      return { message: 'Login successful' };
   }
}
