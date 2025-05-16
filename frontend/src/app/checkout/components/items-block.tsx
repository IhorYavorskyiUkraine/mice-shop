'use client';

import { CartItem } from '@/components/shared/cart/cart-item';
import { Button, UniversalSkeleton } from '@/components/ui';
import { TCartItem } from '@/types/cart.type';

interface Props {
   items: TCartItem[];
   totalPrice: number;
   onSubmit: () => void;
   loading: boolean;
}

export const ItemsBlock: React.FC<Props> = ({
   onSubmit,
   items,
   totalPrice,
   loading,
}) => {
   const getItemWord = (count: number): string => {
      if (count === 1) return 'товар';
      if (count >= 2 && count <= 4) return 'товари';
      return 'товарів';
   };

   return loading ? (
      <UniversalSkeleton checkoutItems />
   ) : (
      <div className="px-[10px] self-start border-[2px] border-primary py-[10px] lg:px-[30px] lg:py-[30px]">
         <div className="space-y-[30px] mb-md">
            {items?.map((item: TCartItem) => (
               <CartItem key={item.id} item={item} />
            ))}
         </div>
         <div className="flex justify-between mb-md">
            <p>{`${items.length} ${getItemWord(items.length)} на суму`}</p>
            <p>{totalPrice || 0}$</p>
         </div>
         <Button onClick={onSubmit} disabled={loading} className="w-full">
            До оплати
         </Button>
      </div>
   );
};
