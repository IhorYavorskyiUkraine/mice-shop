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

   middleName: z
      .string({ required_error: 'Отчество обязательно для заполнения' })
      .min(2, { message: 'Отчество должно содержать минимум 2 символа' })
      .max(50, { message: 'Отчество слишком длинное' }),

   email: z
      .string({ required_error: 'Email обязателен для заполнения' })
      .email({ message: 'Введите корректный email адрес' }),

   phone: z
      .string()
      .min(19, { message: 'Номер телефона должен содержать 19 символов' })
      .max(19, { message: 'Номер телефона должен содержать 19 символов' })
      .optional(),

   password: z
      .string()
      .min(8, {
         message: 'Старый пароль должен содержать минимум 8 символов',
      })
      .optional(),
});
//    newPassword: z
//       .string()
//       .min(8, {
//          message: 'Новый пароль должен содержать минимум 8 символов',
//       })
//       .refine(val => /[A-Z]/.test(val), {
//          message: 'Пароль должен содержать хотя бы одну заглавную букву',
//       })
//       .refine(val => /[0-9]/.test(val), {
//          message: 'Пароль должен содержать хотя бы одну цифру',
//       })
//       .optional(),
// })
// .refine(
//    data => {
//       if (data.newPassword && !data.oldPassword) return false;
//       return true;
//    },
//    {
//       message: 'Для изменения пароля необходимо указать старый пароль',
//       path: ['oldPassword'],
//    },
// );

export type TUpdateUser = z.infer<typeof updateUserSchema>;
