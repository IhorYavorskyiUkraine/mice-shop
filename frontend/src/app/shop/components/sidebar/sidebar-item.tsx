'use client';

import { ChevronDown } from 'lucide-react';
import React from 'react';

interface Props {
   title: string;
   content?: React.ReactNode;
   open: boolean;
   setOpen: (open: boolean) => void;
}

export const SidebarItem: React.FC<Props> = ({
   title,
   content,
   open,
   setOpen,
}) => {
   return (
      <article>
         <div
            onClick={() => setOpen(!open)}
            className="flex py-[10px] items-center cursor-pointer justify-between"
         >
            <button className="w-full text-left uppercase cursor-pointer">
               {title}
            </button>
            <ChevronDown className={open ? 'rotate-180' : ''} />
         </div>
         {open && <ul className="pb-[10px] ">{content}</ul>}
      </article>
   );
};
