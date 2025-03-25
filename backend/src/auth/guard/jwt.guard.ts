import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
   getRequest(context: ExecutionContext) {
      const ctx = GqlExecutionContext.create(context);
      const req = ctx.getContext().req;

      if (req.cookies && req.cookies['accessToken']) {
         req.headers['authorization'] = `Bearer ${req.cookies['accessToken']}`;
      }

      return req;
   }
}
