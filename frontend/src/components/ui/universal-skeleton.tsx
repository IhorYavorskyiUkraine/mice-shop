import { cn } from '@/lib';
import { Skeleton } from './skeleton';

interface Props {
   searchItems?: boolean;
   productBlockItem?: boolean;
   tilesCn?: string;
   index?: number;
   categoryTiles?: boolean;
}

export const UniversalSkeleton: React.FC<Props> = ({
   searchItems,
   productBlockItem,
   tilesCn,
   index,
   categoryTiles,
}) => {
   if (searchItems) {
      return (
         <div>
            <div className="flex flex-col gap-6">
               <Skeleton className="size-[199px]" />
               <div className="flex flex-col gap-3">
                  <Skeleton className="w-[199px] h-[36px]" />
                  <Skeleton className="w-[150px] h-[24px]" />
                  <Skeleton className="w-[130px] h-[24px]" />
                  <Skeleton className="w-[70px] h-[36px]" />
               </div>
            </div>
         </div>
      );
   } else if (productBlockItem) {
      return (
         <div className="w-full h-full  flex flex-col">
            <div className="relative w-full pt-[100%] mb-3">
               <div className="absolute inset-0 block">
                  <Skeleton className="w-full h-full" />
               </div>
            </div>
            <div className="pb-3 flex flex-col gap-2">
               <Skeleton className="w-full h-6" />
               <Skeleton className="w-1/2 h-5" />
            </div>
         </div>
      );
   } else if (tilesCn) {
      return (
         <Skeleton
            className={cn(
               tilesCn,
               'cursor-pointer group overflow-hidden w-full p-6 relative flex flex-col',
            )}
         >
            <div className="flex-1 opacity-0! flex justify-center items-center">
               <Skeleton
                  className={cn(
                     index === 1 || index === 2
                        ? 'size-[300px]'
                        : 'size-[240px]',
                     'max-h-full max-w-full',
                  )}
               />
            </div>
            <div className="w-full opacity-0! h-[50px] mt-4">
               <Skeleton className="w-full h-full" />
            </div>
         </Skeleton>
      );
   } else if (categoryTiles) {
      return <Skeleton className="h-[300px] md:h-[400px]" />;
   }

   return null;
};
