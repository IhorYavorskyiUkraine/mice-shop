'use client';

import { ChevronDown } from 'lucide-react';

interface Props {
   title: string;
   content?: any;
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
            className="flex items-center justify-between"
         >
            <button className="cursor-pointer w-full text-left">{title}</button>
            <ChevronDown className={open ? 'rotate-180' : ''} />
         </div>
         {open && <ul>Open</ul>}
      </article>
   );
};
