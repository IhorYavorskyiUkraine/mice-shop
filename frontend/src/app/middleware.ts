import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
   const accessToken = request.cookies.get('accessToken')?.value;
   const refreshToken = request.cookies.get('refreshToken')?.value;

   if (!refreshToken && !accessToken) {
      return NextResponse.redirect(new URL('/', request.url));
   }

   if (!accessToken && refreshToken) {
      try {
         const res = await fetch('http://localhost:8000/graphql', {
            method: 'POST',
            credentials: 'include',
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
               secure: false,
               sameSite: 'lax',
               maxAge: 20,
            });

            response.cookies.set('refreshToken', newRefresh, {
               httpOnly: true,
               secure: false,
               sameSite: 'lax',
               maxAge: 60 * 60 * 24 * 7,
            });

            return response;
         } else {
            return NextResponse.redirect(new URL('/', request.url));
         }
      } catch (err) {
         console.error('Refresh failed in middleware', err);
         return NextResponse.redirect(new URL('/', request.url));
      }
   }

   return NextResponse.next();
}

export const config = {
   matcher: ['/profile/:path*'],
};
