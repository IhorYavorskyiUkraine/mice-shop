import { gql } from '@apollo/client';

export const GET_PRODUCT = gql`
   query getProduct($id: Int!) {
      getProductById(id: $id) {
         name
         image
         rating
         generalSpecs {
            key
            value
         }
         models {
            id
            name
            colors {
               id
               name
               stock
               image
            }
            specs {
               key
               value
            }
            image
            price
         }
         reviews {
            user {
               displayName
               # TODO: image
            }
            rating
            comment
         }
      }
   }
`;

export const ADD_PRODUCT = gql`
   mutation addProduct($args: AddProductArgs!) {
      addProduct(args: $args) {
         items {
            model {
               name
            }
         }
         totalPrice
      }
   }
`;
