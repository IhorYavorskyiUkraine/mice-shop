import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle,
   DrawerTrigger,
} from '@/components/ui/drawer';
import { Menu } from 'lucide-react';

export const Burger: React.FC = () => {
   return (
      <Drawer>
         <DrawerTrigger>
            <Menu />
         </DrawerTrigger>
         <DrawerContent>
            <DrawerHeader>
               <DrawerTitle>Are you absolutely sure?</DrawerTitle>
               <DrawerDescription>
                  This action cannot be undone.
               </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
               <DrawerClose>Х</DrawerClose>
            </DrawerFooter>
         </DrawerContent>
      </Drawer>
   );
};
