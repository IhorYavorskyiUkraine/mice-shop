import { cookies } from 'next/headers';

export async function checkAuth() {
   const cookieStore = await cookies();
   const accessToken = cookieStore.get('accessToken');

   const res = await fetch('http://localhost:8000/graphql', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Cookie: `accessToken=${accessToken?.value || ''}`,
      },
      credentials: 'include',

      body: JSON.stringify({
         query: `
				query CheckAuth {
					isAuthenticated {
						status
					}
				}
			`,
      }),
      cache: 'no-store',
   });

   if (!res.ok) {
      throw new Error('Failed to fetch authentication status');
   }

   const data = await res.json();

   console.log('Authentication status:', data);

   return data.data?.isAuthenticated?.status;
}
