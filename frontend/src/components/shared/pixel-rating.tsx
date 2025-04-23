import { cn } from '@/lib';

interface Props {
   rating: number;
   max?: number;
   progressBar?: boolean;
   showDecimal?: boolean;
   className?: string;
}

export const PixelRating: React.FC<Props> = ({
   rating,
   max = 5,
   progressBar = true,
   showDecimal = true,
   className,
}) => {
   const rounded = showDecimal
      ? Math.round(rating * 2) / 2
      : Math.round(rating);
   const percentage = Math.min((rounded / max) * 100, 100);

   return (
      <div
         className={cn(
            !progressBar && 'pb-0!',
            'flex flex-col gap-1 items-start pb-[10px]',
         )}
      >
         <div>
            <p className={cn(className, 'text-m1')}>
               Рейтинг: {showDecimal ? rounded.toFixed(1) : rounded} / {max}
            </p>
            {progressBar && (
               <div className="w-full h-[14px] bg-secondary border border-primary">
                  <div
                     className="h-full bg-primary"
                     style={{ width: `${percentage}%` }}
                  />
               </div>
            )}
         </div>
      </div>
   );
};
