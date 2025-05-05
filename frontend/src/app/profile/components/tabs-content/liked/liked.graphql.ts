import { gql } from '@apollo/client';

export const GET_LIKED_PRODUCTS = gql`
   query getLikedProducts {
      getLikedProducts {
         id
         modelId
         colorId
      }
   }
`;
