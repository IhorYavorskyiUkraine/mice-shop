import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function verifyAndRefreshTokens() {
   const cookieStore = await cookies();
   let accessToken = cookieStore.get('accessToken')?.value;
   const refreshToken = cookieStore.get('refreshToken')?.value;

   if (!accessToken && !refreshToken) {
      redirect('/');
   }

   if (!accessToken && refreshToken) {
      try {
         const refreshResponse = await fetch('http://localhost:8000/graphql', {
            method: 'POST',
            credentials: 'include',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               query: `mutation Refresh {
            refresh {
              message
              accessToken
              refreshToken
            }
          }`,
            }),
         });

         const { data, errors } = await refreshResponse.json();

         if (errors?.[0]?.message === 'Unauthorized') {
            cookieStore.delete('accessToken');
            cookieStore.delete('refreshToken');
            redirect('/');
         }

         if (data?.refresh?.accessToken && data?.refresh?.refreshToken) {
            cookieStore.set('accessToken', data.refresh.accessToken, {
               httpOnly: true,
               secure: process.env.NODE_ENV === 'production',
               sameSite: 'strict',
            });
            accessToken = data.refresh.accessToken;

            cookieStore.set('refreshToken', data.refresh.refreshToken, {
               httpOnly: true,
               secure: process.env.NODE_ENV === 'production',
               sameSite: 'strict',
            });

            redirect('/profile');
         }
      } catch (error) {
         console.error('Token refresh failed:', error);
         redirect('/');
      }
   }

   return { accessToken };
}
