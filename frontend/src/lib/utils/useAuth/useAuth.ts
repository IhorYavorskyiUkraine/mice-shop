import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { IS_AUTH } from './isAuth.graphql';
import { useAuthStore } from './store';

export const useAuth = () => {
   const setAuth = useAuthStore(state => state.setAuth);

   const { data, loading, error, refetch } = useQuery(IS_AUTH, {
      fetchPolicy: 'network-only',
   });

   useEffect(() => {
      const isAuthenticated = data?.isAuthenticated.message === 'Authenticated';
      setAuth({
         isAuthenticated,
         userId: data?.isAuthenticated?.userId ?? null,
      });

      if (error) {
         setAuth({ isAuthenticated: false, userId: null });
      }
   }, [data]);

   return { refetch, loading, error };
};
