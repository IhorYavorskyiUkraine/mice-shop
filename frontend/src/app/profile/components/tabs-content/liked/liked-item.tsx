'use client';

import { LikedModel } from '@/types/product-liked';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
   model: LikedModel;
   onDelete: () => void;
}

export const LikedItem: React.FC<Props> = ({ model, onDelete }) => {
   return (
      <div className="w-full h-full bg-secondary flex flex-col">
         <div className="relative w-full pt-[100%] mb-3">
            <Link
               href={`/product/${model.color.model.productId}?colorId=${model.color.id}&modelId=${model.color.model.id}`}
               className="absolute inset-0 block"
            >
               <Image
                  src={model.color.image}
                  alt={model.color.model.name}
                  width={382}
                  height={382}
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
               />
            </Link>
         </div>
         <div className="px-2 pb-3 flex flex-col text-s md:text-[18px]! lg:text-[24px]!">
            <Link
               href={`/product/${model.color.model.productId}?colorId=${model.color.id}&modelId=${model.color.model.id}`}
               className="line-clamp-2 mb-1"
            >
               {model.color.model.name}
            </Link>
            <div className="flex justify-between">
               <p>{`${model.color.model.price}$`}</p>
               <button
                  className="cursor-pointer lg:text-m1 text-s "
                  onClick={onDelete}
               >
                  Видалити
               </button>
            </div>
         </div>
      </div>
   );
};
