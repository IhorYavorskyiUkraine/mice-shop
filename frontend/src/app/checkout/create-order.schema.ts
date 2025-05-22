import { z } from 'zod';

export const createOrderSchema = z.object({
   firstName: z
      .string({ required_error: "Ім'я є обов'язковим для заповнення" })
      .min(2, { message: "Ім'я повинно містити щонайменше 2 символи" })
      .max(50, { message: "Ім'я занадто довге" }),

   lastName: z
      .string({ required_error: 'Прізвище є обов’язковим для заповнення' })
      .min(2, { message: 'Прізвище повинно містити щонайменше 2 символи' })
      .max(50, { message: 'Прізвище занадто довге' }),

   email: z
      .string({ required_error: 'Email є обов’язковим для заповнення' })
      .email({ message: 'Введіть коректну електронну адресу' }),

   phone: z
      .string()
      .min(19, { message: 'Номер телефону повинен містити 19 символів' })
      .max(19, { message: 'Номер телефону повинен містити 19 символів' })
      .optional(),

   city: z
      .string()
      .min(5, { message: 'Назва міста повинна містити щонайменше 5 символів' }),

   warehouse: z.string().min(5, {
      message: 'Номер відділення повинен містити щонайменше 5 символів',
   }),

   paymentMethod: z.enum(['online', 'cash']),
});

export type TCreateOrder = z.infer<typeof createOrderSchema>;
