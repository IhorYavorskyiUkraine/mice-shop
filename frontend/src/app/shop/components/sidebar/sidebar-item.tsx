'use client';

import { UniversalSkeleton } from '@/components/ui';
import { ChevronDown } from 'lucide-react';
import React from 'react';

interface Props {
   title: string;
   content: React.ReactNode;
   open: boolean;
   setOpen: (open: boolean) => void;
   loading?: boolean;
}

export const SidebarItem: React.FC<Props> = ({
   title,
   content,
   open,
   setOpen,
   loading,
}) => {
   return (
      <article>
         <div
            onClick={() => setOpen(!open)}
            className="flex py-[10px] items-center cursor-pointer justify-between"
         >
            {loading ? (
               <UniversalSkeleton filters />
            ) : (
               <button className="w-full text-left uppercase cursor-pointer">
                  {title}
               </button>
            )}
            <ChevronDown className={open ? 'rotate-180' : ''} />
         </div>
         {open && <ul className="pb-[10px] ">{content}</ul>}
      </article>
   );
};
