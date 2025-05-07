'use client';

import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMedia } from 'react-use';

interface Props {
   id: number;
   icon: string;
   name: string;
   setActiveTab?: (tab: number) => void;
   arrow?: boolean;
   active?: boolean;
   href?: string | undefined;
}

export const ProfileTabButton: React.FC<Props> = ({
   id,
   name,
   icon,
   setActiveTab,
   arrow,
   active,
   href,
}) => {
   const router = useRouter();
   const isMobile = useMedia('(max-width: 1024px)', false);

   const handleClick = () => {
      if (isMobile) {
         setActiveTab?.(id);
      } else {
         router.push(href || '');
      }
   };

   return (
      <button
         onClick={handleClick}
         className="uppercase cursor-pointer w-full lg:w-auto"
      >
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
               <Image width={24} height={24} src={icon} alt={name} />
               <span className="text-m1">{name}</span>
            </div>
            {arrow && <ChevronDown className={active ? 'rotate-180' : ''} />}
         </div>
      </button>
   );
};
