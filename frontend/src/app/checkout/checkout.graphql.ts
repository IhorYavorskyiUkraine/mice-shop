import { gql } from '@apollo/client';

export const GET_CITIES = gql`
   query GetCity($query: String!) {
      getCity(query: $query) {
         name
         ref
      }
   }
`;

export const GET_WAREHOUSES = gql`
   query GetWarehouses($cityRef: String!) {
      getWarehouses(cityRef: $cityRef) {
         number
         description
         ref
      }
   }
`;
