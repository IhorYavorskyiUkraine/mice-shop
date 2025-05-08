'use client';

import {
   DrawerClose,
   DrawerContent,
   DrawerHeader,
   DrawerTitle,
} from '@/components/ui/drawer';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Drawer } from '../../drawer';
import { links } from '../header.data';

export const Burger: React.FC = () => {
   const [open, setOpen] = useState(false);

   return (
      <Drawer icon={<Menu />} open={open} setOpen={setOpen}>
         <DrawerContent className="bg-secondary py-sm px-sm text-primary">
            <DrawerHeader className="flex  mb-sm flex-row justify-between items-center">
               <DrawerTitle className="text-l">Меню</DrawerTitle>
               <DrawerClose className="text-m2 uppercase">x</DrawerClose>
            </DrawerHeader>
            <div className="text-l">
               <ul className="flex flex-col gap-4">
                  {links.map(link => (
                     <li key={link.name} onClick={() => setOpen(false)}>
                        <Link href={link.path}>{link.name}</Link>
                     </li>
                  ))}
               </ul>
            </div>
         </DrawerContent>
      </Drawer>
   );
};
