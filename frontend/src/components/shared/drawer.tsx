import {
   Drawer as DrawerPrimitive,
   DrawerTrigger,
} from '@/components/ui/drawer';

interface Props {
   icon: React.ReactNode;
   children: React.ReactNode;
}

export const Drawer: React.FC<Props> = ({ children, icon }) => {
   return (
      <DrawerPrimitive direction="left">
         <DrawerTrigger className="cursor-pointer">{icon}</DrawerTrigger>
         {children}
      </DrawerPrimitive>
   );
};
