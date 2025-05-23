'use client';

import { cn } from '@/lib';

interface Props {
   text: string;
   active: boolean;
   onClick: () => void;
   loading: boolean;
}

export const DropItem: React.FC<Props> = ({
   text,
   onClick,
   active,
   loading,
}) => {
   return (
      <button
         type="button"
         onClick={onClick}
         disabled={loading}
         className={cn(
            active && 'bg-primary text-secondary',
            'text-start cursor-pointer px-[10px] py-[10px] w-full',
         )}
      >
         {text}
      </button>
   );
};
