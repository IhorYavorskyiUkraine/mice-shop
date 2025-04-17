import {
   Drawer as DrawerPrimitive,
   DrawerTrigger,
} from '@/components/ui/drawer';

interface Props {
   icon: React.ReactNode;
   children: React.ReactNode;
   direction?: 'left' | 'top' | 'bottom' | 'right';
}

export const Drawer: React.FC<Props> = ({ children, icon, direction }) => {
   return (
      <DrawerPrimitive direction={direction ? direction : 'left'}>
         <DrawerTrigger className="cursor-pointer">{icon}</DrawerTrigger>
         {children}
      </DrawerPrimitive>
   );
};
