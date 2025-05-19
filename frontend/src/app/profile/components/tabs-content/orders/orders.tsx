'use client';

import { ErrorMessage, UniversalSkeleton } from '@/components/ui';
import { DivButton } from '@/components/ui/div-button';
import { Order } from '@/types/order.type';
import { useQuery } from '@apollo/client';
import { PackageOpen } from 'lucide-react';
import Link from 'next/link';
import { useSet } from 'react-use';
import { OrderItem } from './order-item';
import { GET_ORDERS } from './orders.graphql';

const Orders: React.FC = () => {
   const [_, { has, toggle }] = useSet(new Set());

   const { data, loading, error } = useQuery(GET_ORDERS, {
      fetchPolicy: 'network-only',
   });

   if (error) return <ErrorMessage message={error.message} />;

   const isEmpty = !loading && data?.getOrders.length === 0;

   return (
      <div className="px-[10px] lg:min-h-screen py-[10px] lg:px-[30px] lg:py-[30px]">
         <div className="flex flex-col gap-[30px]">
            {isEmpty ? (
               <div className="flex flex-col justify-center items-center gap-3 min-h-[40vh] text-center px-4 lg:min-h-[60vh]">
                  <PackageOpen className="w-10 h-10 text-muted-foreground lg:w-16 lg:h-16" />
                  <h2 className="text-base font-semibold sm:text-lg lg:text-2xl">
                     У вас ще немає замовлень
                  </h2>
                  <p className="text-sm text-muted-foreground sm:text-base lg:text-lg max-w-[600px]">
                     Почніть покупки вже зараз — перегляньте наш каталог і
                     знайдіть щось особливе для себе.
                  </p>
                  <DivButton className="text-sm sm:text-base px-4 py-2">
                     <Link href="/shop">До каталогу</Link>
                  </DivButton>
               </div>
            ) : (
               <div className="flex flex-col gap-[30px]">
                  {loading ? (
                     <UniversalSkeleton orderItems />
                  ) : (
                     data?.getOrders.map((order: Order) => (
                        <OrderItem
                           key={order.id}
                           order={order}
                           isOpen={has(order.id)}
                           setIsOpen={() => toggle(order.id)}
                        />
                     ))
                  )}
               </div>
            )}
         </div>
      </div>
   );
};

export default Orders;
