import { cn } from '@/lib';
import { Minus, Plus } from 'lucide-react';

interface Props {
   quantity: number;
   updateQuantity: (option: 'plus' | 'minus') => void;
   inStock: boolean;
}

export const Quantity: React.FC<Props> = ({
   quantity,
   updateQuantity,
   inStock,
}) => {
   const canDecrease = quantity > 1;

   return (
      <div className="flex gap-2 items-center">
         <button
            onClick={() => canDecrease && updateQuantity('minus')}
            disabled={!canDecrease}
            className={cn(
               !canDecrease && 'opacity-50 cursor-default!',
               'cursor-pointer',
            )}
         >
            <Minus />
         </button>
         <p>{quantity}</p>
         <button
            onClick={() => inStock && updateQuantity('plus')}
            disabled={!inStock}
            className={cn(
               !inStock && 'opacity-50 cursor-default!',
               'cursor-pointer',
            )}
         >
            <Plus />
         </button>
      </div>
   );
};
