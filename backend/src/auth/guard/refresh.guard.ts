import {
   CanActivate,
   ExecutionContext,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
   constructor(private authService: AuthService) {}

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const ctx = GqlExecutionContext.create(context);
      const req = ctx.getContext().req;
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken)
         throw new UnauthorizedException('Refresh token not found');

      const user = await this.authService.validateRefreshToken(refreshToken);

      if (!user) throw new UnauthorizedException('Invalid refresh token');

      req.user = user.userId;

      return true;
   }
}
