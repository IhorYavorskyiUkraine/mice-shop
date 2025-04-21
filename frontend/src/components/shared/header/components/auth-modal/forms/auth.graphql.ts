import { gql } from '@apollo/client';

export const REGISTER = gql`
   mutation Register($args: RegisterArgs!) {
      register(args: $args) {
         message
      }
   }
`;

export const LOGIN = gql`
   mutation Login($args: LoginArgs!) {
      login(args: $args) {
         message
      }
   }
`;
