import { NextFunction, Request, Response } from 'express';

export function RefreshMiddleware(
   req: Request,
   res: Response,
   next: NextFunction,
) {
   next();
}
