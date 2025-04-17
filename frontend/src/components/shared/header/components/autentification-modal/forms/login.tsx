import { InputWithValidations } from '@/components/shared/input-with-validations';
import { Button } from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { loginSchema, TLogin } from './schema';

export const Login: React.FC = () => {
   const form = useForm<TLogin>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   });

   const onSubmit = async (data: TLogin) => {
      try {
         // if (loading) {
         //    return false;
         // }

         // await createTask({
         //    variables: {
         //       args: data,
         //    },
         // });

         // refetch();
         // setIsDialogOpen(false);
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
               placeholder="Введіть ваш емейл"
               name="email"
               label="Емейл"
            />
            <InputWithValidations
               // disabled={loading}
               placeholder="Введіть ваш пароль"
               name="password"
               label="Пароль"
            />
            <Button
               // loading={loading}
               className="w-full mt-[15px] uppercase"
            >
               Увійти
            </Button>
         </form>
      </FormProvider>
   );
};
