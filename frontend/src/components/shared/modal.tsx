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
}

export const Modal: React.FC<Props> = ({ icon, title, children }) => {
   return (
      <Dialog>
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
