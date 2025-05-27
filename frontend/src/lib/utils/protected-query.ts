// hooks/useProtectedQuery.ts
import { DocumentNode, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

export function useProtectedQuery(query: DocumentNode, options?: any) {
   const [hasRetried, setHasRetried] = useState(false);

   const { data, loading, error, refetch } = useQuery(query, {
      fetchPolicy: 'network-only',
      ...options,
   });

   useEffect(() => {
      const isUnauthenticated = error?.graphQLErrors?.some(
         e => e.extensions?.code === 'UNAUTHENTICATED',
      );

      if (isUnauthenticated && !hasRetried) {
         setHasRetried(true);
         refetch();
      }
   }, [error, hasRetried, refetch]);

   return { data, loading, error };
}
