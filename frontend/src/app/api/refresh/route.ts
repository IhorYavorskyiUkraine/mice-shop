// app/api/refresh/route.ts (для App Router)
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
   const refreshToken = req.cookies.get('refreshToken')?.value;

   if (!refreshToken) {
      return NextResponse.redirect(new URL('/', req.url));
   }

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

      if (!data?.data?.refresh) {
         return NextResponse.redirect(new URL('/', req.url));
      }

      const { accessToken, refreshToken: newRefreshToken } = data.data.refresh;

      const response = NextResponse.redirect(new URL('/profile/info', req.url));

      response.cookies.set('accessToken', accessToken, {
         httpOnly: true,
         secure: true,
         sameSite: 'lax',
         path: '/',
         maxAge: 20,
      });

      response.cookies.set('refreshToken', newRefreshToken, {
         httpOnly: true,
         secure: true,
         sameSite: 'lax',
         path: '/',
         maxAge: 60 * 60 * 24 * 7,
      });

      return response;
   } catch (error) {
      console.error('Ошибка обновления токенов в /api/refresh:', error);
      return NextResponse.redirect(new URL('/', req.url));
   }
}
