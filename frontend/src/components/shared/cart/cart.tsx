'use client';

import {
   Button,
   DrawerClose,
   DrawerContent,
   DrawerHeader,
   DrawerTitle,
} from '@/components/ui';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Drawer } from '../drawer';
import { CartItem } from './cart-item';

export const Cart: React.FC = () => {
   const [cart, setCart] = useState([]);

   return (
      <Drawer
         direction="right"
         icon={
            <Image
               width={24}
               height={24}
               src={'/images/header/cart.svg'}
               alt="cart"
               className="h-6 w-6 hover:opacity-80 transition"
            />
         }
      >
         <DrawerContent className="bg-secondary py-sm px-sm text-primary">
            <DrawerHeader className="flex  mb-sm flex-row justify-between items-center">
               <DrawerTitle className="text-l">Кошик</DrawerTitle>
               <DrawerClose className="text-m2 uppercase">x</DrawerClose>
            </DrawerHeader>
            <div className="flex flex-col h-full">
               {cart.length === 0 ? (
                  <div className="flex flex-col flex-1 justify-between">
                     <div className="flex-1 flex items-center justify-center">
                        <p className="text-xl text-center">Кошик порожній :(</p>
                     </div>
                     <Button>
                        <Link href="/shop">Перейти до магазину</Link>
                     </Button>
                  </div>
               ) : (
                  <div className="flex flex-col flex-1 justify-between">
                     <div className="space-y-4 overflow-y-auto">
                        {cart.map(item => (
                           <CartItem key={item.id} />
                        ))}
                     </div>
                     <Button className="mt-4">Перейти до оформлення</Button>
                  </div>
               )}
            </div>
         </DrawerContent>
      </Drawer>
   );
};
