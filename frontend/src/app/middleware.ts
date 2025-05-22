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

   if (!refreshToken && !accessToken) {
      return NextResponse.redirect(new URL('/', request.url));
   }

   if (accessToken) {
      const isValid = await verifyToken(accessToken);
      if (isValid) {
         return NextResponse.next();
      }
   }

   if (refreshToken) {
      try {
         const res = await fetch('http://localhost:8000/graphql', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               Cookie: `refreshToken=${refreshToken}`,
            },
            body: JSON.stringify({
               query: `mutation Refresh { refresh { accessToken refreshToken } }`,
            }),
         });

         const data = await res.json();

         if (data?.data?.refresh) {
            const newAccess = data.data.refresh.accessToken;
            const newRefresh = data.data.refresh.refreshToken;

            const response = NextResponse.next();

            response.cookies.set('accessToken', newAccess, {
               httpOnly: true,
               secure: true,
               sameSite: 'lax',
               maxAge: 20,
               path: '/',
            });

            response.cookies.set('refreshToken', newRefresh, {
               httpOnly: true,
               secure: true,
               sameSite: 'lax',
               maxAge: 60 * 60 * 24 * 7,
               path: '/',
            });

            return response;
         } else {
            return NextResponse.redirect(new URL('/', request.url));
         }
      } catch (err) {
         console.error('Ошибка refresh токена:', err);
         return NextResponse.redirect(new URL('/', request.url));
      }
   }

   return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
   matcher: ['/profile/:path*'],
};
