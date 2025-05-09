'use client';

import { cn } from '@/lib';

interface Props {
   text: string;
   active: boolean;
   onClick: () => void;
}

export const DropItem: React.FC<Props> = ({ text, onClick, active }) => {
   return (
      <button
         type="button"
         onClick={onClick}
         className={cn(
            active && 'bg-primary text-secondary',
            'text-start cursor-pointer px-[10px] py-[10px] w-full',
         )}
      >
         {text}
      </button>
   );
};
