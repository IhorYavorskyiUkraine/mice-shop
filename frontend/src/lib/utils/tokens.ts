import { cookies } from 'next/headers';

const cookieOptions = {
   httpOnly: true,
   secure: process.env.NODE_ENV === 'production',
   sameSite: 'lax' as const,
   path: '/',
};

const getTokens = async () => {
   const cookieStore = await cookies();
   return {
      accessToken: cookieStore.get('accessToken')?.value,
      refreshToken: cookieStore.get('refreshToken')?.value,
   };
};

const refreshTokens = async (refreshToken: string) => {
   try {
      const response = await fetch('http://localhost:8000/graphql', {
         method: 'POST',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json',
            Cookies: `refreshToken=${refreshToken}`,
         },
         body: JSON.stringify({
            query: `mutation Refresh { refresh { message accessToken refreshToken } }`,
         }),
      });
      return await response.json();
   } catch (error) {
      console.error('Refresh failed:', error);
      return null;
   }
};

const clearTokens = async () => {
   await fetch('http://localhost:8000/api/clear-cookies', {
      method: 'POST',
      credentials: 'include',
   });
};

export const verifyTokens = async () => {
   const { accessToken, refreshToken } = await getTokens();

   if (!accessToken && !refreshToken) {
      return { needsRedirect: true, redirectPath: '/' };
   }

   if (!accessToken && refreshToken) {
      try {
         const result = await refreshTokens(refreshToken);
         if (result?.errors) {
            await clearTokens();
            return { needsRedirect: true, redirectPath: '/' };
         }
         if (result?.data?.refresh) {
            const { accessToken: newAccess, refreshToken: newRefresh } =
               result.data.refresh;
            const store = await cookies();
            store.set('accessToken', newAccess, cookieOptions);
            store.set('refreshToken', newRefresh, cookieOptions);
            return { accessToken: newAccess };
         }
      } catch (error) {
         console.error('Error during token refresh:', error);
         await clearTokens();
         return { needsRedirect: true, redirectPath: '/' };
      }
   }

   return { accessToken };
};
