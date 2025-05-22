import { cn } from '@/lib';
import { ChevronDown } from 'lucide-react';
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
   checkoutItems?: boolean;
   productImage?: boolean;
   productReviews?: boolean;
   length?: number;
   likedItems?: boolean;
   orderItems?: boolean;
   displayName?: boolean;
   userInfo?: boolean;
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
   length,
   checkoutItems,
   likedItems,
   orderItems,
   displayName,
   userInfo,
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
      return Array.from({ length: length || 4 }).map((_, index) => (
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
      return Array.from({ length: 2 }).map((_, index) => (
         <Skeleton key={index} className="h-[300px] w-full md:h-[400px]" />
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
   } else if (checkoutItems) {
      return <Skeleton className="w-full h-full" />;
   } else if (likedItems) {
      return Array.from({ length: 4 }).map((_, index) => (
         <div key={index} className="w-full h-full flex flex-col">
            <div className="relative w-full pt-[100%] mb-3">
               <div className="absolute inset-0 block">
                  <Skeleton className="w-full h-full" />
               </div>
            </div>
            <div className="pb-3 flex flex-col gap-2">
               <Skeleton className="w-1/2 h-6" />
               <div className="flex justify-between">
                  <Skeleton className="w-[40px] h-6" />
                  <Skeleton className="w-[78px] h-4" />
               </div>
            </div>
         </div>
      ));
   } else if (orderItems) {
      return Array.from({ length: 4 }).map((_, index) => (
         <div key={index} className="py-sm px-sm border border-primary">
            <div className="grid grid-cols-[auto_1fr_auto] items-center">
               <div className="flex flex-col gap-1">
                  <div className="flex gap-4 items-center">
                     <Skeleton className="w-[50px] h-[28px]" />
                     <Skeleton className="w-[80px] h-5" />
                  </div>
                  <div className="flex mt-1">
                     <Skeleton className="w-[80px] h-[28px]" />
                  </div>
                  <div className="mt-2 flex gap-2 flex-wrap sm:flex sm:justify-start md:hidden">
                     {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="w-[50px] h-[50px]" />
                     ))}
                  </div>
               </div>
               <div className="hidden md:flex justify-center">
                  <div className="flex gap-2 flex-wrap justify-center">
                     {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="w-[50px] h-[50px]" />
                     ))}
                  </div>
               </div>
               <div className="flex justify-end">
                  <button>
                     <ChevronDown />
                  </button>
               </div>
            </div>
         </div>
      ));
   } else if (displayName) {
      return <Skeleton className="w-full h-[30px]" />;
   } else if (userInfo) {
      return Array.from({ length: 5 }).map((_, index) => {
         const labels = [
            "Ім'я",
            'Прізвище',
            'Електронна пошта',
            'Номер телефону',
         ];

         return (
            <div key={index} className="mb-md">
               <p className="mb-2">{labels[index]}</p>
               <Skeleton className="w-[200px] h-[30px] mb-2" />
            </div>
         );
      });
   }
   return null;
};
