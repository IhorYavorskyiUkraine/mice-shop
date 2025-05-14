import { Order } from '@/types/order.type';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
   order: Order;
}

export const ItemUserInfo: React.FC<Props> = ({ order }) => {
   const tth = '2131231242145421';

   const onCopy = (tth: string) => {
      navigator.clipboard.writeText(tth);
      toast.success('Номер накладної скопійовано');
   };

   return (
      <div>
         <p className="text-m1">Отримувач:</p>
         <div className="text-s mb-md">
            <p>{order?.user.displayName}</p>
            <p>{order?.user.displayName}</p>
            <p>{order?.phone}</p>
            <p>{order?.address}</p>
         </div>
         <p className="text-m1">Номер накладної:</p>
         <button
            className="cursor-pointer flex gap-2 items-center"
            onClick={() => onCopy(tth)}
         >
            {tth}
            <Copy size={16} />
         </button>
      </div>
   );
};
