import { Request, Response } from 'express';

export function setAuthCookies(
   res: Response,
   accessToken: string,
   refreshToken: string,
) {
   res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 20,
      secure: false,
      sameSite: 'lax',
   });

   res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
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

   return { accessToken, refreshToken };
}

export function clearAuthCookies(res: Response) {
   res.clearCookie('accessToken');
   res.clearCookie('refreshToken');
}
