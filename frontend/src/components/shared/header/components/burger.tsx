import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerHeader,
   DrawerTitle,
   DrawerTrigger,
} from '@/components/ui/drawer';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { links } from '../header.data';

export const Burger: React.FC = () => {
   return (
      <Drawer direction="left">
         <DrawerTrigger>
            <Menu />
         </DrawerTrigger>
         <DrawerContent className="bg-secondary py-sm px-sm text-primary">
            <DrawerHeader className="flex  mb-sm flex-row justify-between items-center">
               <DrawerTitle className="text-l">Menu</DrawerTitle>
               <DrawerClose className="text-m2 uppercase">x</DrawerClose>
            </DrawerHeader>
            <div className="text-l">
               <ul className="flex flex-col gap-4">
                  {links.map(link => (
                     <li key={link.name}>
                        <Link href={link.path}>{link.name}</Link>
                     </li>
                  ))}
               </ul>
            </div>
         </DrawerContent>
      </Drawer>
   );
};
