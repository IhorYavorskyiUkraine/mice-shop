import { gql } from '@apollo/client';

export const IS_AUTH = gql`
   query IsAuthenticated {
      isAuthenticated {
         message
         userId
      }
   }
`;
