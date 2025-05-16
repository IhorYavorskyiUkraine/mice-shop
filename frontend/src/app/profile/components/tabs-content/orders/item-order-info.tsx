import { OrderItem } from '@/types/order.type';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
   orderItem: OrderItem;
}

export const ItemOrderInfo: React.FC<Props> = ({ orderItem }) => {
   return (
      <div>
         <div className="flex gap-2 ">
            <Link
               href={`/product/${orderItem.code.color.model.productId}?modelId=${orderItem.code.color.model.id}&colorId=${orderItem.code.color.id}`}
            >
               <Image
                  key={orderItem.id}
                  width={100}
                  height={100}
                  src={orderItem.code.color.image}
                  alt="Product"
                  className="rounded object-cover"
               />
            </Link>
            <div className="text-s gap-1 lg:gap-0 grid grid-cols-[auto_auto_auto] flex-1 justify-between">
               <Link
                  href={`/product/${orderItem.code.color.model.productId}?modelId=${orderItem.code.color.model.id}&colorId=${orderItem.code.color.id}`}
               >
                  <p>{orderItem.code.color.model.name}</p>
               </Link>
               <p>
                  {orderItem.price}$ x {orderItem.quantity}
               </p>
               <p>{orderItem.price * orderItem.quantity}$</p>
            </div>
         </div>
      </div>
   );
};
