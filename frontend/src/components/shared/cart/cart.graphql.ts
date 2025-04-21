import { gql } from '@apollo/client';

export const GET_CART = gql`
   query GetCart {
      getCart {
         items {
            id
            model {
               id
               name
               price
               image
               productId
            }
            quantity
            color {
               id
               name
               image
               stock
            }
         }
         totalPrice
      }
   }
`;

export const UPDATE_QUANTITY = gql`
   mutation updateProduct($args: UpdateProductArgs!) {
      updateProduct(args: $args) {
         items {
            id
            model {
               name
               price
               image
               productId
            }
            quantity
            color {
               id
               name
               image
            }
         }
         totalPrice
      }
   }
`;

export const REMOVE_PRODUCT = gql`
   mutation removeProduct($modelId: Int!) {
      removeProduct(modelId: $modelId) {
         items {
            id
            model {
               name
               price
               image
               productId
            }
            quantity
            color {
               id
               name
               image
            }
         }
         totalPrice
      }
   }
`;
