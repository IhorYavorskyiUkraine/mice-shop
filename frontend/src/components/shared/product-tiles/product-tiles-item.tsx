import { cn } from '@/lib';
import Image from 'next/image';

interface Props {
   name: string;
   image: string;
   className?: string;
}

export const ProductTilesItem: React.FC<Props> = ({
   name,
   image,
   className,
}) => {
   return (
      <div
         className={cn(
            className,
            'bg-primary max-h-[636px] max-w-[512px] p-6 relative',
         )}
      >
         <h3 className="text-secondary">{name}</h3>
         <Image src={image} fill alt="Product Image" />
      </div>
   );
};
