'use client';

import { cn } from '@/lib';
import Image from 'next/image';
import { useState } from 'react';
import { useMedia } from 'react-use';
import { ProductOverflow } from './product-overflow';

interface Props {
   name: string;
   image: string;
   className?: string;
}

export const ProductTilesItem: React.FC<Props> = ({
   name,
   image,
   className,
}) => {
   const [open, setOpen] = useState(false);
   const isMobile = useMedia('(max-width: 768px)', false);

   const onClick = () => {
      isMobile ? setOpen(!open) : null;
   };

   return (
      <div
         className={cn(
            className,
            'bg-primary cursor-pointer group overflow-hidden  lg:max-h-[636px] w-full lg:max-w-[512px] p-6 relative flex flex-col',
         )}
         onClick={onClick}
      >
         {name === '' ? null : (
            <h3 className="text-secondary text-xl absolute">{name}</h3>
         )}
         <div className="flex-1 flex justify-center items-center">
            <Image
               src={image}
               height={240}
               width={240}
               alt="Product Image"
               className="object-contain max-h-full max-w-full transition-transform duration-300 group-hover:scale-105"
            />
         </div>
         <ProductOverflow />
      </div>
   );
};
