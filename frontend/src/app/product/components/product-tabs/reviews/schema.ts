import { z } from 'zod';

export const createReviewSchema = z.object({
   rating: z
      .number({ required_error: 'Rating is required' })
      .min(1, { message: 'Rating must be at least 1' })
      .max(5, { message: 'Rating cannot be more than 5' }),
   comment: z
      .string({ required_error: 'Comment is required' })
      .min(1, { message: 'Comment cannot be empty' }),
});

export type TCreateReview = z.infer<typeof createReviewSchema>;
