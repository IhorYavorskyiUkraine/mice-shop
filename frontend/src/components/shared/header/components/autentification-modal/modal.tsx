'use client';

import { Button, Separator } from '@/components/ui';
import Image from 'next/image';
import { useState } from 'react';
import { Modal as ModalComponent } from '../../../modal';
import { Login } from './forms/login';
import { Register } from './forms/register';

export const Modal: React.FC = () => {
   const [method, setMethod] = useState<'login' | 'register'>('login');

   const handleMethodChange = (method: 'login' | 'register') => {
      setMethod(method);
   };

   return (
      <ModalComponent
         icon={
            <Image
               width={24}
               height={24}
               src="/images/header/user.svg"
               alt="user"
               className="h-6 w-6 hover:opacity-80 transition"
            />
         }
         title={method === 'login' ? 'Вхід' : 'Реєстрація'}
      >
         <div>{method === 'login' ? <Login /> : <Register />}</div>
         <div className="flex flex-col gap-3 text-center">
            <Separator className="my-[4px]!" />
            <Button
               variant="white"
               onClick={() =>
                  handleMethodChange(method === 'login' ? 'register' : 'login')
               }
               className="uppercase"
            >
               {method === 'login' ? 'Реєстрація' : 'Вхід'}
            </Button>
         </div>
      </ModalComponent>
   );
};
