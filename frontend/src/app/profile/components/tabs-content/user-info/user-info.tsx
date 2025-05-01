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
   const [profileEditing, setProfileEditing] = useState(false);
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
         newPassword: '',
         oldPassword: '',
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
         });
      }
   }, [user, form]);

   const onSubmit = async (data: TUpdateUser) => {
      try {
         if (isLoadingUser || isUpdating) return;

         const { email, phone } = data;

         await updateUser({
            variables: {
               args: {
                  email,
                  phone,
                  displayName: [data.firstName, data.lastName, data.middleName]
                     .filter(name => !!name && name.trim().length > 0)
                     .join(' '),
                  oldPassword: data.oldPassword ? data.oldPassword : undefined,
                  newPassword: data.newPassword ? data.newPassword : undefined,
               },
            },
         });

         setProfileEditing(false);
         setPasswordEditing(false);
         toast.success('Дані користувача успішно оновлено');
      } catch (error: any) {
         const gqlError = error.graphQLErrors?.[0];

         console.log('gqlError', gqlError);

         if (gqlError?.message) {
            form.setError('oldPassword', {
               type: 'server',
               message: gqlError.message,
            });
         }

         toast.error('Не вдалося оновити дані');
      }
   };

   const handleEditOrSubmit = () => {
      if (profileEditing) {
         form.handleSubmit(onSubmit)();
         setProfileEditing(false);
      } else {
         setProfileEditing(true);
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
         {profileEditing ? (
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
               <>
                  <InputWithValidations
                     disabled={isLoadingUser}
                     placeholder="Cтарий пароль"
                     name="oldPassword"
                     className="max-w-[400px] mb-md"
                     label="Старий пароль"
                     type="password"
                  />

                  <InputWithValidations
                     disabled={isLoadingUser}
                     placeholder="Новий пароль"
                     name="newPassword"
                     className="max-w-[400px] "
                     label="Новий пароль"
                     type="password"
                  />
               </>
            )}
            {!passwordEditing ? (
               <button
                  type={passwordEditing ? 'submit' : 'button'}
                  onClick={() => setPasswordEditing(true)}
                  className="uppercase cursor-pointer text-s"
               >
                  Редагувати пароль
               </button>
            ) : (
               <div className="mt-md">
                  <Button
                     type="button"
                     onClick={handleEditOrSubmit}
                     disabled={isUpdating}
                     className="min-w-[120px] mr-md"
                  >
                     Зберегти
                  </Button>
                  <Button
                     type="button"
                     onClick={() => setPasswordEditing(false)}
                     disabled={isUpdating}
                     className="min-w-[120px]"
                  >
                     Скасувати
                  </Button>
               </div>
            )}
            {!passwordEditing && (
               <div className="mt-[10px]">
                  <Button
                     type="button"
                     onClick={handleEditOrSubmit}
                     disabled={isUpdating}
                     className="min-w-[120px]"
                  >
                     {profileEditing ? 'Зберегти' : 'Редагувати профіль'}
                  </Button>
               </div>
            )}
         </form>
      </FormProvider>
   );
};
