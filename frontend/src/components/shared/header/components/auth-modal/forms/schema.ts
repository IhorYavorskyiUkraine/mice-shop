import { z } from 'zod';

export const passwordSchema = z
   .string()
   .min(8, { message: 'Введіть правильний пароль' });

export const loginSchema = z.object({
   email: z.string().email({ message: 'Введіть правильний емайл' }),
   password: passwordSchema,
});

export const registerSchema = loginSchema
   .merge(
      z.object({
         displayName: z.string().min(2, { message: "Введіть ваше ім'я" }),
         confirmPassword: passwordSchema,
      }),
   )
   .refine(data => data.password === data.confirmPassword, {
      message: 'Паролі не співпадають',
      path: ['confirmPassword'],
   });

export type TLogin = z.infer<typeof loginSchema>;
export type TRegister = z.infer<typeof registerSchema>;
