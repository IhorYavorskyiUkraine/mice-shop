'use client';

import { ScrollToTopButton } from '@/components/shared';
import client from '@/lib/apolloClient';
import { InitAuth } from '@/lib/utils/useAuth/Auth-init';
import { ApolloProvider } from '@apollo/client';
import { Toaster } from 'sonner';

export function MainProvider({ children }: { children: React.ReactNode }) {
   return (
      <ApolloProvider client={client}>
         <InitAuth />
         {children}
         <Toaster
            toastOptions={{
               className: 'font-["Pixelify"]',
            }}
         />
         <ScrollToTopButton />
      </ApolloProvider>
   );
}
