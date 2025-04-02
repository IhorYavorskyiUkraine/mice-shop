'use client';

import client from '@/lib/apolloClient';
import { ApolloProvider } from '@apollo/client';

export function MainProvider({ children }: { children: React.ReactNode }) {
   return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
