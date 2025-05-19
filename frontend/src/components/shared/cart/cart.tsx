'use client';

import {
   Button,
   DrawerClose,
   DrawerContent,
   DrawerHeader,
   DrawerTitle,
   ErrorMessage,
} from '@/components/ui';
import { TCartItem } from '@/types/cart.type';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Drawer } from '../drawer';
import { CartItem } from './cart-item';
import { GET_CART } from './cart.graphql';

export const Cart: React.FC = () => {
   const { data, error } = useQuery(GET_CART);
   const [open, setOpen] = useState(false);

   return (
      <Drawer
         direction="right"
         open={open}
         setOpen={setOpen}
         icon={
            <div className="flex gap-1">
               <Image
                  width={24}
                  height={24}
                  src={'/images/header/cart.svg'}
                  alt="cart"
                  className="h-6 w-6 hover:opacity-80 transition"
               />
               <span className="text-s">{data?.getCart.items?.length}</span>
            </div>
         }
      >
         <DrawerContent className="lg:!w-[500px] w-full  bg-secondary py-sm px-sm text-primary">
            <DrawerHeader className="flex  mb-sm flex-row justify-between items-center">
               <DrawerTitle className="text-l">Кошик</DrawerTitle>
               <DrawerClose className="text-m2 uppercase cursor-pointer">
                  x
               </DrawerClose>
            </DrawerHeader>
            {(error?.message && <ErrorMessage message={error.message} />) || (
               <div className="flex flex-col h-full">
                  {data?.getCart.items?.length === 0 ? (
                     <div className="flex flex-col flex-1 justify-between">
                        <div className="flex-1 flex items-center justify-center">
                           <p className="text-xl text-center">
                              Кошик порожній :(
                           </p>
                        </div>
                        <Button onClick={() => setOpen(false)}>
                           <Link href="/shop">Перейти до магазину</Link>
                        </Button>
                     </div>
                  ) : (
                     <div className="flex flex-col h-[calc(100vh-110px)]">
                        <div className="flex-grow overflow-y-auto pr-2 space-y-4">
                           {data?.getCart.items?.map((item: TCartItem) => (
                              <CartItem key={item.id} item={item} />
                           ))}
                        </div>
                        <div className="sticky bottom-0 bg-white pt-2 border-t">
                           <p className="text-right mb-2">
                              Сумма: {data?.getCart.totalPrice}$
                           </p>
                           <Link href="/checkout">
                              <Button
                                 className="w-full"
                                 onClick={() => setOpen(false)}
                              >
                                 Перейти до оформлення
                              </Button>
                           </Link>
                        </div>
                     </div>
                  )}
               </div>
            )}
         </DrawerContent>
      </Drawer>
   );
};
