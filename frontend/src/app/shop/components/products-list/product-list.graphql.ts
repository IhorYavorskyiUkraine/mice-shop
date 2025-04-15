import { gql } from '@apollo/client';

export const GET_FILTERED_PRODUCTS = gql`
   query getProduct($args: ProductFiltersArgs!) {
      getFilteredProducts(args: $args) {
         products {
            id
            name
            image
            models {
               price
               image
            }
         }
         totalPages
         totalProducts
         currentPage
      }
   }
`;
