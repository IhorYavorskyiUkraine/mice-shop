import { gql } from '@apollo/client';

export const GET_PRODUCT_FILTERS = gql`
   query {
      getAllProductFilters {
         tags
         brands
         colors
         # specs
         price {
            min
            max
         }
      }
   }
`;
