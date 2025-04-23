import { DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui';
import { cn } from '@/lib';
import { ArrowUpDown } from 'lucide-react';
import { Drawer } from '../drawer';

interface Props {
   data: { id: number; title: string; name: string }[];
   activeSort: [string, 'asc' | 'desc'];
   setActive: (sort: any) => void;
}

export const SortingMobile: React.FC<Props> = ({
   data,
   activeSort,
   setActive,
}) => {
   const handleItemClick = (field?: string, direction?: 'asc' | 'desc') => {
      setActive([field || activeSort[0], direction || activeSort[1]]);
   };

   return (
      <div className="lg:hidden block">
         <Drawer direction="bottom" icon={<ArrowUpDown />}>
            <DrawerContent className="bg-secondary  pt-sm pb-xl px-sm">
               <DrawerHeader>
                  <DrawerTitle className="sr-only">Сортування</DrawerTitle>
               </DrawerHeader>
               <div>
                  <p className="text-left mb-sm">Сортування</p>
                  <div className="flex flex-col gap-4">
                     {data.map((item, i) => {
                        const isActive =
                           item.id === 1 || item.id === 2
                              ? activeSort[0] === item.name
                              : activeSort[1] === item.name;

                        return (
                           <button
                              onClick={() => {
                                 if (item.id === 1 || item.id === 2) {
                                    handleItemClick(item.name, undefined);
                                 } else if (item.id === 3 || item.id === 4) {
                                    handleItemClick(
                                       undefined,
                                       item.name as 'asc' | 'desc',
                                    );
                                 }
                              }}
                              key={i}
                              className="text-left w-full"
                           >
                              <p
                                 className={cn(
                                    'text-left uppercase text-m1 transition-opacity',
                                    isActive ? 'opacity-100' : 'opacity-60',
                                 )}
                              >
                                 {item.title}
                              </p>
                           </button>
                        );
                     })}
                  </div>
               </div>
            </DrawerContent>
         </Drawer>
      </div>
   );
};
