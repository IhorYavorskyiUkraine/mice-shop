import { cn } from '@/lib';
import { Product } from '@/types/product.type';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
   className?: string;
   product: Product;
}

export const SearchItem: React.FC<Props> = ({ product, className }) => {
   return (
      <Link
         href={`/product/${product.id}`}
         className={cn('p-sm text-secondary', className)}
      >
         <div className="flex flex-col gap-4">
            <div className="relative size-[199.42px]">
               <Image
                  src={product.models[0].image}
                  alt={product.name}
                  width={199}
                  height={199}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 200px"
               />
            </div>
            <div className="flex flex-col gap-1">
               <h2 className="text-l">{product.name}</h2>
               <p className="text-md">{product.category?.name}</p>
               <p className="text-md">Rating: {product.rating}</p>
               <p className="text-l">${product.models[0].price}</p>
            </div>
         </div>
      </Link>
   );
};
