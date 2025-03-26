import { ForbiddenException } from '@nestjs/common';
import { Request, Response } from 'express';

export function setAuthCookies(
   res: Response,
   accessToken: string,
   refreshToken: string,
) {
   res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
      secure: false,
      sameSite: 'lax',
   });

   res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
      sameSite: 'lax',
   });
}

export function getAuthTokens(req: Request): {
   accessToken: string;
   refreshToken: string;
} {
   const accessToken = req.cookies['accessToken'];
   const refreshToken = req.cookies['refreshToken'];

   if (!accessToken || !refreshToken) {
      throw new ForbiddenException('Authorization token is missing');
   }

   return { accessToken, refreshToken };
}

export function clearAuthCookies(res: Response) {
   res.clearCookie('accessToken');
   res.clearCookie('refreshToken');
}
