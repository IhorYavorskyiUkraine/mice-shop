import { ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { getAuthTokens } from 'src/utils/cookie.utils';
import { AuthService } from './auth.service';

@Injectable()
export class TokenHelperService {
   constructor(private authService: AuthService) {}

   async getUserIdFromRequest(req: Request) {
      const { accessToken } = getAuthTokens(req);

      if (!accessToken) throw new ForbiddenException('Token missing');
      const { userId } =
         await this.authService.validateAccessToken(accessToken);

      return userId;
   }
}
