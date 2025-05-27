import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

async function verifyToken(token: string) {
   try {
      const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!);
      const { payload } = await jwtVerify(token, secret);
      return payload;
   } catch {
      return null;
   }
}

export async function middleware(request: NextRequest) {
   const accessToken = request.cookies.get('accessToken')?.value;
   const refreshToken = request.cookies.get('refreshToken')?.value;
   const guestToken = request.cookies.get('guestToken')?.value;

   if (guestToken) {
      return NextResponse.next();
   }

   if (!refreshToken && !accessToken) {
      return NextResponse.redirect(new URL('/', request.url));
   }

   if (accessToken) {
      const isValid = await verifyToken(accessToken);
      if (isValid) {
         return NextResponse.next();
      } else {
         // accessToken есть, но невалиден — идём обновлять
         if (refreshToken) {
            return NextResponse.redirect(new URL('/api/refresh', request.url));
         } else {
            return NextResponse.redirect(new URL('/', request.url));
         }
      }
   }

   // Здесь accessToken нет, но есть refreshToken — идём обновлять
   if (!accessToken && refreshToken) {
      return NextResponse.redirect(new URL('/api/refresh', request.url));
   }

   // Во всех остальных случаях редирект на '/'
   return NextResponse.redirect(new URL('/', request.url));
}

// export const config = {
//    matcher: ['/profile/:path*'],
// };
