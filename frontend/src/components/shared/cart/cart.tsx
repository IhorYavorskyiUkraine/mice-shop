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
import { Drawer } from '../drawer';
import { CartItem } from './cart-item';
import { GET_CART } from './cart.graphql';

export const Cart: React.FC = () => {
   const { data, loading, error } = useQuery(GET_CART);

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
         <DrawerContent className="!w-[500px] bg-secondary py-sm px-sm text-primary">
            <DrawerHeader className="flex  mb-sm flex-row justify-between items-center">
               <DrawerTitle className="text-l">Кошик</DrawerTitle>
               <DrawerClose className="text-m2 uppercase">x</DrawerClose>
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
                        <Button>
                           <Link href="/shop">Перейти до магазину</Link>
                        </Button>
                     </div>
                  ) : (
                     <div className="flex flex-col flex-1 max-h-[90vh]">
                        <div className="flex-1 overflow-y-auto">
                           <div className="space-y-4 pr-2">
                              {data?.getCart.items?.map((item: TCartItem) => (
                                 <CartItem key={item.id} item={item} />
                              ))}
                           </div>
                        </div>
                        <p className="text-right">
                           Сумма: {data?.getCart.totalPrice}$
                        </p>
                        <Button className="mt-4 shrink-0">
                           Перейти до оформлення
                        </Button>
                     </div>
                  )}
               </div>
            )}
         </DrawerContent>
      </Drawer>
   );
};
