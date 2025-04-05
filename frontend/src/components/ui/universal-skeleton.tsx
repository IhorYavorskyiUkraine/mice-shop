import { Skeleton } from './skeleton';

interface Props {
   searchItems?: boolean;
}

export const UniversalSkeleton: React.FC<Props> = ({ searchItems }) => {
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
   }
};
