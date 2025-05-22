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
               code {
                  code
               }
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

export const GET_LIKED = gql`
   query IsProductLiked($productCode: String!) {
      isProductLiked(productCode: $productCode)
   }
`;

export const ADD_TO_LIKED = gql`
   mutation addToLiked($productCode: String!) {
      addToLiked(productCode: $productCode) {
         message
      }
   }
`;
