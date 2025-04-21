'use client';

import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui';

interface Props {
   icon: React.ReactNode;
   title: string;
   children: React.ReactNode;
   open: boolean;
   setOpen: (open: boolean) => void;
}

export const Modal: React.FC<Props> = ({
   open,
   setOpen,
   icon,
   title,
   children,
}) => {
   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger className="cursor-pointer">{icon}</DialogTrigger>
         <DialogContent className="bg-secondary">
            <DialogHeader>
               <DialogTitle className="font-medium text-m2">
                  {title}
               </DialogTitle>
            </DialogHeader>
            {children}
         </DialogContent>
      </Dialog>
   );
};
