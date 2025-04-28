import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ProtectedRoute({
   children,
}: {
   children: (userId: string) => React.ReactNode;
}) {
   const cookieStore = await cookies();
   const accessToken = cookieStore.get('accessToken')?.value;
   const refreshToken = cookieStore.get('refreshToken')?.value;

   if (!refreshToken) {
      redirect('/');
   }

   const fetchAuth = async () => {
      const response = await fetch('http://localhost:8000/graphql', {
         method: 'POST',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json',
            Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
         },
         body: JSON.stringify({
            query: `query IsAuthenticated {
              isAuthenticated {
                userId
                message
              }
            }`,
         }),
         cache: 'no-store',
      });

      return response.json();
   };

   try {
      const authResponse = await fetchAuth();

      if (authResponse.data?.isAuthenticated?.userId) {
         return children(authResponse.data.isAuthenticated.userId);
      }

      if (authResponse.errors?.[0]?.message === 'Unauthorized') {
         const refreshResponse = await fetch('http://localhost:8000/graphql', {
            method: 'POST',
            credentials: 'include',
            headers: {
               'Content-Type': 'application/json',
               Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
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

         const refreshData = await refreshResponse.json();

         if (
            refreshData.data?.refresh?.accessToken &&
            refreshData.data?.refresh?.refreshToken
         ) {
            await fetch('http://localhost:3000/api/set-tokens', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  accessToken: refreshData.data.refresh.accessToken,
                  refreshToken: refreshData.data.refresh.refreshToken,
               }),
            });

            const retryData = await fetchAuth();

            if (retryData.data?.isAuthenticated?.userId) {
               return children(retryData.data.isAuthenticated.userId);
            }
         }
      }
   } catch (error) {
      console.error('Authentication error:', error);
      redirect('/');
   }
}
