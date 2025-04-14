import { gql } from '@apollo/client';

export const GET_FILTERED_PRODUCTS = gql`
   query getProduct($args: ProductFiltersArgs!) {
      getFilteredProducts(args: $args) {
         name
         image
         models {
            price
            image
         }
      }
   }
`;
