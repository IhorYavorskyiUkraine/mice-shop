import { gql } from '@apollo/client';

export const GET_CITIES = gql`
   query GetCities($query: String!) {
      getCities(query: $query) {
         name
         ref
      }
   }
`;

export const GET_WAREHOUSES = gql`
   query GetWarehouses($args: getWarehousesArgs!) {
      getWarehouses(args: $args) {
         number
         description
         ref
      }
   }
`;

export const CREATE_ORDER = gql`
   mutation CreateORder($args: CreateOrderArgs!) {
      createOrder(args: $args)
   }
`;
