import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
   const { accessToken, refreshToken } = await request.json();

   const response = NextResponse.json({ message: 'Tokens set' });

   response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
   });

   response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
   });

   return response;
}
