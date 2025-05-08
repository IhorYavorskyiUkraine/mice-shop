import {
   Drawer as DrawerPrimitive,
   DrawerTrigger,
} from '@/components/ui/drawer';

interface Props {
   icon: React.ReactNode;
   children: React.ReactNode;
   direction?: 'left' | 'top' | 'bottom' | 'right';
   open?: boolean;
   setOpen?: (open: boolean) => void;
}

export const Drawer: React.FC<Props> = ({
   children,
   icon,
   direction,
   open,
   setOpen,
}) => {
   return (
      <DrawerPrimitive
         open={open}
         onOpenChange={setOpen}
         direction={direction ? direction : 'left'}
      >
         <DrawerTrigger className="cursor-pointer">{icon}</DrawerTrigger>
         {children}
      </DrawerPrimitive>
   );
};
