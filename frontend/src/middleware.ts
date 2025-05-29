import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
   const accessToken = req.cookies.get('accessToken')?.value;
   const refreshToken = req.cookies.get('refreshToken')?.value;

   if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL('/', req.url));
   }

   return NextResponse.next();
}

export const config = {
   matcher: ['/profile/:path*'],
};
