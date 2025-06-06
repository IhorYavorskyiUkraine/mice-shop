import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { Observable } from '@apollo/client/utilities';

const refreshToken = async () => {
   const response = await fetch('http://localhost:8000/graphql', {
      method: 'POST',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         query: `
			mutation {
			  refresh {
				 accessToken
				 refreshToken
				 message
			  }
			}
		 `,
      }),
   });

   if (!response.ok) throw new Error('Refresh failed');

   const data = await response.json();

   return data;
};

const errorLink = onError(
   ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
         for (const err of graphQLErrors) {
            if (err.extensions?.code === 'UNAUTHENTICATED') {
               return new Observable(observer => {
                  refreshToken()
                     .then(() => {
                        forward(operation).subscribe({
                           next: observer.next.bind(observer),
                           error: observer.error.bind(observer),
                           complete: observer.complete.bind(observer),
                        });
                     })
                     .catch(err => {
                        console.error('Refresh failed', err);
                        observer.error(err);
                     });
               });
            }
         }
      }
   },
);

const httpLink = new HttpLink({
   uri: 'http://localhost:8000/graphql',
   credentials: 'include',
});

const client = new ApolloClient({
   link: from([errorLink, httpLink]),
   cache: new InMemoryCache(),
});

export default client;
