import { InputWithValidations } from '@/components/shared/input-with-validations';
import { Button } from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { registerSchema, TRegister } from './schema';

export const Register: React.FC = () => {
   const form = useForm<TRegister>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   });

   const onSubmit = async (data: TRegister) => {
      try {
         // if (loading) {
         //    return false;
         // }

         form.reset();
      } catch (error) {
         console.error('Error [LOGIN]', error);
      }
   };

   return (
      <FormProvider {...form}>
         <form
            className="flex flex-1 flex-col gap-2 "
            onSubmit={form.handleSubmit(onSubmit)}
         >
            <InputWithValidations
               // disabled={loading}
               name="email"
               label="Емейл"
            />
            <InputWithValidations
               // disabled={loading}
               name="userName"
               label="Юзернейм"
            />
            <InputWithValidations
               // disabled={loading}
               name="password"
               label="Пароль"
               type="password"
            />
            <InputWithValidations
               // disabled={loading}
               name="confirmPassword"
               label="Повторіть пароль"
               type="password"
            />
            <Button
               // loading={loading}
               className="w-full mt-[15px] uppercase"
            >
               Створити аккаунт
            </Button>
         </form>
      </FormProvider>
   );
};
