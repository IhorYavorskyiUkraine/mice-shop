import { gql } from '@apollo/client';

export const GET_USER = gql`
   query GetUser {
      findUserById {
         id
         email
         displayName
         phone
         password
      }
   }
`;

export const UPDATE_USER = gql`
   mutation UpdateUser($args: UpdateUserArgs!) {
      updateUser(args: $args) {
         id
         email
         displayName
         phone
      }
   }
`;

export const LOGOUT = gql`
   mutation Logout {
      logout {
         message
      }
   }
`;
