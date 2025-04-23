import { cn } from '@/lib';
import { Skeleton } from './skeleton';

interface Props {
   searchItems?: boolean;
   productBlockItem?: boolean;
   tilesCn?: string;
   index?: number;
   categoryTiles?: boolean;
   productTitle?: boolean;
   productRating?: boolean;
   productSpecs?: boolean;
   productPickColor?: boolean;
   productPickModel?: boolean;
   activeColorOrModelText?: boolean;
   productPrice?: boolean;
   cartItems?: boolean;
   productImage?: boolean;
   productReviews?: boolean;
}

export const UniversalSkeleton: React.FC<Props> = ({
   searchItems,
   productBlockItem,
   tilesCn,
   index,
   categoryTiles,
   productTitle,
   productRating,
   productSpecs,
   productPickColor,
   productPickModel,
   activeColorOrModelText,
   productPrice,
   productImage,
   productReviews,
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
      return Array.from({ length: 8 }).map((_, index) => (
         <div key={index} className="w-full h-full  flex flex-col">
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
      ));
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
      return Array.from({ length: 8 }).map((_, index) => (
         <Skeleton key={index} className="h-[300px] md:h-[400px]" />
      ));
   } else if (productTitle) {
      return <Skeleton className="h-[30px] w-[50%] lg:h-[50px]" />;
   } else if (productRating) {
      return <Skeleton className="h-[20px] w-[20%] lg:h-[30px]" />;
   } else if (productSpecs) {
      return Array.from({ length: 6 }).map((_, index) => (
         <Skeleton
            key={index}
            className="h-[20px] w-[50%] lg:h-[30px] mb-2 last:mb-0"
         />
      ));
   } else if (productPickColor) {
      return Array.from({ length: 2 }).map((_, index) => (
         <Skeleton key={index} className="size-[50px]" />
      ));
   } else if (productPickModel) {
      return Array.from({ length: 3 }).map((_, index) => (
         <Skeleton key={index} className="w-[150px] h-[42px]" />
      ));
   } else if (activeColorOrModelText) {
      return <Skeleton className="w-[150px] h-[30px] mb-sm" />;
   } else if (productPrice) {
      return <Skeleton className="size-[70px]" />;
   } else if (productImage) {
      return <Skeleton className="w-full h-full" />;
   } else if (productReviews) {
      return Array.from({ length: 8 }).map((_, index) => (
         <div key={index} className="border-primary border-2 p-4">
            <div className="flex gap-4">
               <div>
                  <Skeleton className="size-[50px] rounded-full" />
               </div>
               <div className="flex-1">
                  <div className="flex justify-between">
                     <Skeleton className="h-[24px] w-[200px] mb-1" />
                     <Skeleton className="h-[24px] w-[100px]" />
                  </div>
                  <Skeleton className="h-[24px] w-[90px] mb-1" />
                  <Skeleton className="h-[24px] w-[50%]" />
               </div>
            </div>
         </div>
      ));
   }

   return null;
};
