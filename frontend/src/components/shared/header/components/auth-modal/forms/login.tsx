'use client';

import { InputWithValidations } from '@/components/shared/input-with-validations';
import { Button } from '@/components/ui';
import { useAuthStore } from '@/lib/utils/useAuth/store';
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

   const [login, { loading }] = useMutation(LOGIN, {
      onCompleted: () => {
         form.reset();
         toast.success('Ви успішно увійшли');
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
            if (code === 'INVALID_CREDENTIALS') {
               form.setError('email', {
                  type: 'server',
                  message: error.message,
               });
               form.setError('password', {
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
   const { setAuth } = useAuthStore();

   const onSubmit = async (data: TLogin) => {
      if (loading) return;

      const res = await login({ variables: { args: data } });

      setAuth({
         isAuthenticated: true,
         userId: res.data.login.userId,
      });
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
            <Button loading={loading} className="w-full mt-[15px]">
               Увійти
            </Button>
         </form>
      </FormProvider>
   );
};
