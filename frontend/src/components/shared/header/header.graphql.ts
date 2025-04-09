import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
   query getAllProducts($args: GetAllProductsArgs!) {
      getAllProducts(args: $args) {
         id
         name
         models {
            image
            price
         }
      }
   }
`;

export const GET_TRENDING_PRODUCTS = gql`
   query getAllProducts($args: GetAllProductsArgs!) {
      getAllProducts(args: $args) {
         id
         name
         generalSpecs {
            key
            value
         }
         image
         models {
            price
         }
      }
   }
`;
