import { gql } from '@apollo/client';

export const GET_ORDERS = gql`
   query getOrders {
      getOrders {
         id
         status
         phone
         address
         user {
            id
            displayName
            email
         }
         orderItems {
            price
            code {
               color {
                  id
                  image
                  name
                  model {
                     id
                     name
                     productId
                  }
               }
            }
            quantity
         }
         total
         createdAt
      }
   }
`;
