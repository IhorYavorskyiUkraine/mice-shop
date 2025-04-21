import { z } from 'zod';

export const passwordSchema = z
   .string()
   .min(8, { message: 'Enter a valid password' });

export const loginSchema = z.object({
   email: z.string().email({ message: 'Enter a valid email address' }),
   password: passwordSchema,
});

export const registerSchema = loginSchema
   .merge(
      z.object({
         displayName: z.string().min(2, { message: 'Enter your full name' }),
         confirmPassword: passwordSchema,
      }),
   )
   .refine(data => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
   });

export type TLogin = z.infer<typeof loginSchema>;
export type TRegister = z.infer<typeof registerSchema>;
