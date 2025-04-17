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
            name
            colors {
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
