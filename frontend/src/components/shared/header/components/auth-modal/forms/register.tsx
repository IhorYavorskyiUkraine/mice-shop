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

   const [register, { loading }] = useMutation(REGISTER);

   const onSubmit = async (data: TRegister) => {
      try {
         if (loading) {
            return false;
         }

         await register({ variables: { args: data } });

         setIsOpen();
         form.reset();
         toast.success('Register successful');
      } catch (error) {
         console.error('Error [REGISTER]', error);
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
               name="email"
               label="Емейл"
            />
            <InputWithValidations
               disabled={loading}
               name="displayName"
               label="Юзернейм"
            />
            <InputWithValidations
               disabled={loading}
               name="password"
               label="Пароль"
               type="password"
            />
            <InputWithValidations
               disabled={loading}
               name="confirmPassword"
               label="Повторіть пароль"
               type="password"
            />
            <Button
               loading={loading}
               type="submit"
               className="w-full mt-[15px] uppercase"
            >
               Створити аккаунт
            </Button>
         </form>
      </FormProvider>
   );
};
