import { z } from 'zod';

export const updateUserSchema = z.object({
   firstName: z
      .string({ required_error: 'Имя обязательно для заполнения' })
      .min(2, { message: 'Имя должно содержать минимум 2 символа' })
      .max(50, { message: 'Имя слишком длинное' }),

   lastName: z
      .string({ required_error: 'Фамилия обязательна для заполнения' })
      .min(2, { message: 'Фамилия должна содержать минимум 2 символа' })
      .max(50, { message: 'Фамилия слишком длинная' }),

   email: z
      .string({ required_error: 'Email обязателен для заполнения' })
      .email({ message: 'Введите корректный email адрес' }),

   phone: z
      .string()
      .min(19, { message: 'Номер телефона должен содержать 19 символов' })
      .max(19, { message: 'Номер телефона должен содержать 19 символов' }),

   oldPassword: z
      .string()
      .min(8, { message: 'Пароль должен содержать минимум 8 символов' })
      .optional(),
   newPassword: z
      .string()
      .min(8, { message: 'Пароль должен содержать минимум 8 символов' })
      .optional(),
});

export type TUpdateUser = z.infer<typeof updateUserSchema>;
