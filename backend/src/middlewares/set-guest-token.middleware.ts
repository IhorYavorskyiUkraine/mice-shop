import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

export function GuestMiddleware(
   jwtService: JwtService,
   configService: ConfigService,
) {
   return (req: Request, res: Response, next: NextFunction) => {
      const jwtSecret = configService.get<string>('JWT_SECRET');
      const jwtExpiresIn = configService.get<string>('JWT_SECRET_EXPIRES_IN');
      const guestToken = req.cookies?.['guestToken'];

      const accessToken = req.cookies?.['accessToken'];
      const refreshToken = req.cookies?.['refreshToken'];
      if (accessToken || refreshToken) {
         res.clearCookie('guestToken');
         return next();
      }

      const setNewGuestToken = () => {
         const payload = { userId: uuidv4(), guest: true };

         const newGuestToken = jwtService.sign(payload, {
            secret: jwtSecret,
            expiresIn: jwtExpiresIn,
         });

         res.cookie('guestToken', newGuestToken, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 30,
         });

         req['guestToken'] = payload;
      };

      if (!guestToken) {
         setNewGuestToken();
         return next();
      }

      try {
         const decoded = jwtService.verify(guestToken, { secret: jwtSecret });
         req['guestToken'] = decoded;
      } catch (err) {
         setNewGuestToken();
      }

      next();
   };
}
