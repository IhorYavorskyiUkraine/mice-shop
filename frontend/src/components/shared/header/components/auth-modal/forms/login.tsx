'use client';

import { InputWithValidations } from '@/components/shared/input-with-validations';
import { Button } from '@/components/ui';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { LOGIN } from './auth.graphql';
import { loginSchema, TLogin } from './schema';

interface Props {
   setIsOpen: () => void;
}

export const Login: React.FC<Props> = ({ setIsOpen }) => {
   const form = useForm<TLogin>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   });

   const [login, { loading }] = useMutation(LOGIN);

   const onSubmit = async (data: TLogin) => {
      try {
         if (loading) {
            return false;
         }

         await login({ variables: { args: data } });

         form.reset();
         toast.success('Login successful');
         setIsOpen();
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
               disabled={loading}
               placeholder="Введіть ваш емейл"
               name="email"
               label="Емейл"
            />
            <InputWithValidations
               disabled={loading}
               placeholder="Введіть ваш пароль"
               name="password"
               type="password"
               label="Пароль"
            />
            <Button loading={loading} className="w-full mt-[15px] uppercase">
               Увійти
            </Button>
         </form>
      </FormProvider>
   );
};
