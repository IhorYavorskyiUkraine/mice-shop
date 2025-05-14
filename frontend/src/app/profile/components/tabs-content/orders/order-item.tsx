import { cn } from '@/lib';
import { formatDate } from '@/lib/formateDate';
import { Order, OrderItem as TOrderItem } from '@/types/order.type';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { ItemOrderInfo } from './item-order-info';
import { ItemUserInfo } from './item-user-info';

interface Props {
   order: Order;
   isOpen: boolean;
   setIsOpen: () => void;
}

export const OrderItem: React.FC<Props> = ({ order, isOpen, setIsOpen }) => {
   return (
      <div className="py-sm  px-sm border border-primary">
         <div
            onClick={setIsOpen}
            className={cn(
               isOpen && 'grid-cols-[auto_1fr]!',
               'cursor-pointer grid grid-cols-[auto_1fr_auto] items-center gap-4',
            )}
         >
            <div className="flex flex-col gap-1">
               <div className="flex gap-4 items-center">
                  <p>№{order.id}</p>
                  <p className="text-sm">{formatDate(order.createdAt)}</p>
               </div>
               <p>{order.status}</p>
            </div>
            {!isOpen && (
               <div className="flex justify-center">
                  <div className="flex gap-2">
                     {order.orderItems?.map((item: TOrderItem, i: number) => (
                        <Image
                           key={i}
                           width={50}
                           height={50}
                           src={item.code.color.image}
                           alt="Product"
                           className="rounded object-cover"
                        />
                     ))}
                  </div>
               </div>
            )}
            <div className="flex justify-end">
               <button>
                  <ChevronDown className={isOpen ? 'rotate-180' : ''} />
               </button>
            </div>
         </div>
         {isOpen && (
            <div className="grid grid-cols-2 pt-sm">
               <div>
                  <ItemUserInfo order={order} />
               </div>
               <div>
                  {order.orderItems?.map((item: TOrderItem, i: number) => (
                     <ItemOrderInfo key={i} orderItem={item} />
                  ))}
                  <p className="text-right">Всього: {order.total}$</p>
               </div>
            </div>
         )}
      </div>
   );
};
