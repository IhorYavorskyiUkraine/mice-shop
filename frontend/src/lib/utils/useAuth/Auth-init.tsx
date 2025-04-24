import { useEffect } from 'react';
import { useAuth } from './useAuth';

export const InitAuth = () => {
   const { refetch } = useAuth();

   useEffect(() => {
      refetch();
   }, []);

   return null;
};
