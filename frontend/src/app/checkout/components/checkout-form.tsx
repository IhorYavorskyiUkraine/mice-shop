'use client';

import { CheckboxWithText } from '@/components/shared';
import { InputWithValidations } from '@/components/shared/input-with-validations';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { GET_CITIES } from '../checkout.graphql';
import { FormBlock } from './form-block';

export const CheckoutForm: React.FC = () => {
   const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
   //////
   const [query, setQuery] = useState<string | null>(null);
   const [cityRef, setCityRef] = useState<string | null>(null);
   const [warehouseRef, setWarehouseRef] = useState<string | null>(null);
   //////

   const form = useForm(
      // <TUpdateUser>
      {
         // resolver: zodResolver(updateUserSchema),
         defaultValues: {
            firstName: '',
            lastName: '',
            middleName: '',
            phone: '',
         },
      },
   );

   const [getCities, { data }] = useMutation(GET_CITIES);

   const onSubmit = async (data: any) => {
      try {
         // if (isLoadingUser || isUpdating) return;

         const {} = data;

         toast.success('Замовлення успішно оформлено');
      } catch (error: any) {
         const gqlError = error.graphQLErrors?.[0];

         // if (gqlError?.message) {
         //    form.setError('oldPassword', {
         //       type: 'server',
         //       message: gqlError.message,
         //    });
         // }
         toast.error('Не зробити замовлення');
      }
   };

   return (
      <FormProvider {...form}>
         <form
            className="px-[10px] border-[2px] border-primary py-[10px] lg:px-[30px] lg:py-[30px]"
            onSubmit={form.handleSubmit(onSubmit)}
         >
            <FormBlock
               title="Контактна інформація"
               className="grid lg:grid-cols-2 gap-[30px]"
            >
               <InputWithValidations
                  // disabled={isLoadingUser}
                  placeholder="Прізвище"
                  name="lastName"
                  className="max-w-[400px]"
               />
               <InputWithValidations
                  // disabled={isLoadingUser}
                  placeholder="Ім'я"
                  name="firstName"
                  className="max-w-[400px]"
               />
               <InputWithValidations
                  // disabled={isLoadingUser}
                  placeholder="По батькові"
                  name="middleName"
                  className="max-w-[400px]"
               />
               <InputWithValidations
                  // disabled={isLoadingUser}
                  placeholder="Телефон"
                  name="lastName"
                  className="max-w-[400px]"
                  mask="+38 (000) 000-00-00"
               />
            </FormBlock>
            <FormBlock title="Спосіб оплати" className="space-y-[20px]">
               <CheckboxWithText
                  text="Оплата при отриманні"
                  checked={paymentMethod === 'cash'}
                  onCheckedChange={() => setPaymentMethod('cash')}
               />
               <CheckboxWithText
                  text="Оплата онлайн"
                  checked={paymentMethod === 'online'}
                  onCheckedChange={() => setPaymentMethod('online')}
               />
            </FormBlock>
            <FormBlock title="Адреса доставки" className="space-y-[30px]">
               <InputWithValidations
                  // disabled={isLoadingUser}
                  placeholder="Емаіл"
                  name="email"
               />
               <InputWithValidations
                  // disabled={isLoadingUser}
                  placeholder="Місто"
                  onChange={e => setQuery(e.target.value)}
                  name="city"
               />
               <InputWithValidations
                  // disabled={isLoadingUser}
                  placeholder="Відділення нової пошти"
                  name="addressNP"
               />
            </FormBlock>
         </form>
      </FormProvider>
   );
};
