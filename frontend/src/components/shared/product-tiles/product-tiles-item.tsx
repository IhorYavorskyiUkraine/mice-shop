import { cn } from '@/lib';
import Image from 'next/image';
import { ProductOverflow } from './product-overflow';

interface Props {
   product: any;
   className?: string;
   index: number;
}

export const ProductTilesItem: React.FC<Props> = ({
   product,
   className,
   index,
}) => {
   const minPrice = Math.min(...product.models.map(model => model.price));

   return (
      <div
         className={cn(
            className,
            'bg-primary cursor-pointer group overflow-hidden max-h-[320px] lg:max-h-[636px]! w-full lg:max-w-[512px] p-6 relative flex flex-col',
         )}
      >
         {product.name === '' ? null : (
            <h3 className="text-secondary text-xl absolute">{product.name}</h3>
         )}
         <div className="flex-1 flex justify-center items-center">
            <Image
               src={product.image}
               height={index === 1 || index === 2 ? 300 : 240}
               width={index === 1 || index === 2 ? 300 : 240}
               alt="Product Image"
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
               loading="lazy"
               className="object-contain max-h-full max-w-full transition-transform duration-300 group-hover:scale-105"
            />
         </div>
         <ProductOverflow specs={product.generalSpecs} price={minPrice} />
      </div>
   );
};
