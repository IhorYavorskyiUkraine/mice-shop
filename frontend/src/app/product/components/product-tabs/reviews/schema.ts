import { z } from 'zod';

export const createReviewSchema = z.object({
   rating: z
      .number({ required_error: 'Рейтинг повинен бути числом' })
      .min(1, { message: 'Рейтинг повинен бути хочаб 1' })
      .max(5, { message: 'Максимальний рейтинг - 5' }),
   comment: z
      .string({ required_error: 'Напишіть відгук' })
      .min(10, { message: 'Відгук повинен бути від 10 символів' }),
});

export type TCreateReview = z.infer<typeof createReviewSchema>;
