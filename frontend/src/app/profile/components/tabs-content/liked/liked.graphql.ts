import { gql } from '@apollo/client';

export const GET_LIKED_PRODUCTS = gql`
   query getLikedProducts {
      getLikedProducts {
         code
         color {
            id
            image
            model {
               id
               name
               productId
               price
            }
         }
      }
   }
`;
