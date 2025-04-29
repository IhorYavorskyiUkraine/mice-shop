'use client';

import { GET_USER, UPDATE_USER } from '@/app/profile/profile.graphql';
import { InputWithValidations } from '@/components/shared/input-with-validations';
import { Button } from '@/components/ui';
import { useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { TUpdateUser, updateUserSchema } from './schema';

export const UserInfo: React.FC = () => {
   const [editing, setEditing] = useState(false);
   const [passwordEditing, setPasswordEditing] = useState(false);
   const { data: user, loading: isLoadingUser } = useQuery(GET_USER);
   const [updateUser, { loading: isUpdating }] = useMutation(UPDATE_USER, {
      refetchQueries: [GET_USER],
   });

   const form = useForm<TUpdateUser>({
      resolver: zodResolver(updateUserSchema),
      defaultValues: {
         firstName: '',
         lastName: '',
         middleName: '',
         email: '',
         phone: '',
         password: '',
      },
   });

   useEffect(() => {
      if (user?.findUserById) {
         const { displayName, email, phone } = user.findUserById;
         const [firstName = '', lastName = '', middleName = ''] =
            displayName?.split(' ') ?? [];

         form.reset({
            firstName,
            lastName,
            middleName,
            email,
            phone: phone || '',
            password: '',
         });
      }
   }, [user, form]);

   const onSubmit = async (data: TUpdateUser) => {
      try {
         if (isLoadingUser || isUpdating) return;

         await updateUser({
            variables: {
               args: {
                  ...data,
                  displayName:
                     `${data.firstName} ${data.lastName} ${data.middleName}`.trim(),
               },
            },
         });

         setEditing(false);
         toast.success('Дані користувача успішно оновлено');
      } catch (error) {
         console.error('Error updating user:', error);
         toast.error('Не вдалося оновити дані');
      }
   };

   const handleEditOrSubmit = () => {
      if (editing) {
         form.handleSubmit(onSubmit)();
      } else {
         setEditing(true);
      }
   };

   const renderField = (
      label: string,
      name: keyof TUpdateUser,
      value: string,
      placeholder: string,
   ) => (
      <div className="mb-md">
         <p className="mb-2">{label}</p>
         {editing ? (
            <InputWithValidations
               disabled={isLoadingUser}
               placeholder={placeholder}
               name={name}
               className="max-w-[400px]"
               mask={name === 'phone' ? '+38 (000) 000-00-00' : undefined}
            />
         ) : (
            <p>{value || 'Відсутній'}</p>
         )}
      </div>
   );

   const {
      displayName = '',
      email = '',
      phone = '',
   } = user?.findUserById || {};

   const [
      firstName = 'Відсутнє',
      lastName = 'Відсутнє',
      middleName = 'Відсутнє',
   ] = displayName.split(' ');

   return (
      <FormProvider {...form}>
         <form className="px-md py-md" onSubmit={form.handleSubmit(onSubmit)}>
            {renderField("Ім'я", 'firstName', firstName, "Введіть ваше ім'я")}
            {renderField(
               'Прізвище',
               'lastName',
               lastName,
               'Введіть ваше прізвище',
            )}
            {renderField(
               'По батькові',
               'middleName',
               middleName,
               'Введіть ваше по батькові',
            )}
            {renderField(
               'Електронна пошта',
               'email',
               email,
               'Введіть ваш email',
            )}
            {renderField(
               'Номер телефону',
               'phone',
               phone,
               'Введіть ваш номер телефону',
            )}
            {passwordEditing && (
               <div>
                  <InputWithValidations
                     disabled={isLoadingUser}
                     placeholder="Введіть старий пароль"
                     name="oldPassword"
                     className="max-w-[400px] mb-md"
                     label="Старий пароль"
                     type="password"
                  />
                  <InputWithValidations
                     disabled={isLoadingUser}
                     placeholder="Введіть новий пароль"
                     name="newPassword"
                     className="max-w-[400px] mb-md"
                     label="Новий пароль"
                     type="password"
                  />
               </div>
            )}
            {passwordEditing ? (
               <button
                  type="submit"
                  onClick={() => setPasswordEditing(false)}
                  className="uppercase cursor-pointer"
               >
                  Ок
               </button>
            ) : (
               <button
                  type="submit"
                  onClick={() => setPasswordEditing(true)}
                  className="uppercase cursor-pointer"
               >
                  Змінити пароль
               </button>
            )}
            <div className="mt-[10px]">
               <Button
                  type="button"
                  onClick={handleEditOrSubmit}
                  disabled={isUpdating}
                  className="min-w-[120px]"
               >
                  {editing ? 'Зберегти' : 'Редагувати профіль'}
               </Button>
            </div>
         </form>
      </FormProvider>
   );
};
