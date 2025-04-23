import { gql } from '@apollo/client';

export const GET_PRODUCT_REVIEWS = gql`
   query GetProductReviews($args: GetProductReviewsArgs!) {
      getProductReviews(args: $args) {
         reviews {
            id
            comment
            rating
            user {
               displayName
            }
            createdAt
         }
         totalPages
         totalReviews
         currentPage
      }
   }
`;

export const CREATE_REVIEW = gql`
   mutation CreateReview($args: CreateReviewArgs!) {
      createReview(args: $args) {
         id
         comment
         rating
         user {
            displayName
         }
         createdAt
      }
   }
`;
