import { UniversalSkeleton } from '@/components/ui';
import { cn } from '@/lib';
import { Color } from '@/types/color.type';
import Image from 'next/image';

interface Props {
   colors: Color[] | undefined;
   active: string | undefined;
   setActive: (color: Color) => void;
   loading: boolean;
}

export const ProductPickColor: React.FC<Props> = ({
   colors,
   active,
   setActive,
   loading,
}) => {
   const flattenedColors = colors?.flat();
   return (
      <div>
         {loading ? (
            <UniversalSkeleton activeColorOrModelText />
         ) : (
            <p className="mb-sm">Колір: {active}</p>
         )}
         <div className="flex gap-[20px] flex-wrap">
            {loading ? (
               <UniversalSkeleton productPickColor />
            ) : (
               flattenedColors?.map((color: Color, i) => (
                  <button
                     key={i}
                     className={cn(
                        active === color.name && 'border-1 border-primary',
                        color.stock === 0 && 'opacity-30 pointer-events-none',
                        'cursor-pointer',
                     )}
                     disabled={color.stock === 0}
                     onClick={() => setActive(color)}
                  >
                     <Image
                        key={i}
                        src={color.image || '/aboba.png'}
                        width={50}
                        height={50}
                        alt="color"
                     />
                  </button>
               ))
            )}
         </div>
      </div>
   );
};
