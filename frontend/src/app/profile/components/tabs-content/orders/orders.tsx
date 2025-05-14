'use client';

import { Order } from '@/types/order.type';
import { useQuery } from '@apollo/client';
import { useSet } from 'react-use';
import { OrderItem } from './order-item';
import { GET_ORDERS } from './orders.graphql';

export const Orders: React.FC = () => {
   const [_, { has, toggle }] = useSet(new Set());

   const { data } = useQuery(GET_ORDERS);
   return (
      <div className="px-[10px] py-[10px] lg:px-[30px] lg:py-[30px]">
         <div className="flex flex-col gap-[30px]">
            {data?.getOrders.map((order: Order) => (
               <OrderItem
                  key={order.id}
                  order={order}
                  isOpen={has(order.id)}
                  setIsOpen={() => toggle(order.id)}
               />
            ))}
         </div>
      </div>
   );
};
