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

export async function DELETE() {
   const response = NextResponse.json({ message: 'Tokens deleted' });

   response.cookies.delete('accessToken');
   response.cookies.delete('refreshToken');

   return response;
}
