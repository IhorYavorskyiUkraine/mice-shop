import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
   query getAllProducts($args: GetAllProductsArgs!) {
      getAllProducts(args: $args) {
         id
         name
         rating
         models {
            image
            price
         }
      }
   }
`;
