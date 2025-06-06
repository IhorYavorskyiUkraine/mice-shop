'use client';

import { InputWithValidations } from '@/components/shared/input-with-validations';
import { Button } from '@/components/ui';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { REGISTER } from './auth.graphql';
import { registerSchema, TRegister } from './schema';

interface Props {
   setIsOpen: () => void;
}

export const Register: React.FC<Props> = ({ setIsOpen }) => {
   const form = useForm<TRegister>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
         email: '',
         password: '',
         confirmPassword: '',
         displayName: '',
      },
   });

   const [register, { loading }] = useMutation(REGISTER, {
      onCompleted: () => {
         form.reset();
         toast.success(
            'Ви успішно зареєструвались, перевірте ваш емейл для підтвердження.',
         );
         setIsOpen();
      },
      onError: error => {
         const gqlError = error.graphQLErrors?.[0];
         const code = gqlError?.extensions?.code;

         if (gqlError) {
            if (error.networkError) {
               toast.error('Помилка мережі. Спробуйте пізніше.');
               return;
            }
            if (code === 'EMAIL_ALREADY_EXISTS') {
               form.setError('email', {
                  type: 'server',
                  message: error.message,
               });
               return;
            }
            toast.error(error.message || 'Сталася помилка. Спробуйте пізніше.');
            return;
         }
      },
   });

   const onSubmit = async (data: TRegister) => {
      if (loading) return;
      await register({ variables: { args: data } });
   };

   return (
      <FormProvider {...form}>
         <form
            className="flex flex-1 flex-col gap-2 "
            onSubmit={form.handleSubmit(onSubmit)}
         >
            <InputWithValidations
               disabled={loading}
               name="email"
               label="Емейл"
               placeholder="Введіть ваш емейл"
            />
            <InputWithValidations
               disabled={loading}
               name="displayName"
               label="Ім'я"
               placeholder="Введіть ваше ім'я"
            />
            <InputWithValidations
               disabled={loading}
               name="password"
               label="Пароль"
               type="password"
               placeholder="Придумайте пароль"
            />
            <InputWithValidations
               disabled={loading}
               name="confirmPassword"
               label="Повторіть цей пароль"
               placeholder="Введіть повторно пароль"
               type="password"
            />
            <Button
               loading={loading}
               type="submit"
               className="w-full mt-[15px]"
            >
               Створити аккаунт
            </Button>
         </form>
      </FormProvider>
   );
};
