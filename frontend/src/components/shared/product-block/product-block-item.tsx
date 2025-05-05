import { Model } from '@/types/model.type';
import { Product } from '@/types/product.type';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
   product: Product;
}

export const ProductBlockItem: React.FC<Props> = ({ product }) => {
   const minPrice = Math.min(
      ...product.models.map((model: Model) => model.price),
   );

   return (
      <div className="w-full h-full bg-secondary flex flex-col">
         <div className="relative w-full pt-[100%] mb-3">
            <Link
               href={`/product/${product.id}`}
               className="absolute inset-0 block"
            >
               <Image
                  src={product.models[0].image}
                  alt={product.name}
                  width={382}
                  height={382}
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
               />
            </Link>
         </div>

         <div className="px-2 pb-3 flex flex-col text-s md:text-[18px]! lg:text-[24px]!">
            <Link href={`/product/${product.id}`} className="line-clamp-2 mb-1">
               {product.name}
            </Link>
            <p>{`Від ${minPrice}$`}</p>
         </div>
      </div>
   );
};
