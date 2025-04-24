// components/ProtectedRoute.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/lib/utils/useAuth/store';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
   const router = useRouter();
   const { isAuthenticated, isLoading } = useAuthStore(state => ({
      isAuthenticated: state.isAuthenticated,
      isLoading: state.isLoading, 
   }));

   useEffect(() => {
      if (!isLoading && !isAuthenticated) {
         router.push('/login'); 
      }
   }, [isAuthenticated, isLoading, router]);

   if (isLoading || !isAuthenticated) {
      return <div>Loading...</div>; /
   }

   return <>{children}</>;
}
