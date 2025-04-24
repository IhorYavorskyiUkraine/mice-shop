'use client';

import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type Options = {
   redirectTo?: string;
   query: any;
   skip?: boolean;
};

export const useProtect = (options: Options) => {
   const { redirectTo = '/login', query, skip = false } = options;

   const router = useRouter();

   const { loading, error, data } = useQuery(query, {
      fetchPolicy: 'network-only',
      skip,
   });

   useEffect(() => {
      if (error && !skip) {
         router.push(redirectTo);
      }
   }, [error, skip, redirectTo, router]);

   return {
      loading: skip ? false : loading,
      error: skip ? null : error,
      user: data?.isAuthenticated,
      isAuthenticated: skip ? true : !!data?.isAuthenticated,
   };
};
