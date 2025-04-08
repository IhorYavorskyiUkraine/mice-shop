'use client';

import { cn } from '@/lib';
import { productTilesData } from './product-tiles-data.data';
import { ProductTilesItem } from './product-tiles-item';

export const ProductTilesContent: React.FC = () => {
   return (
      <div className="grid grid-cols-1 lg:grid-rows-[repeat(2,306px)] lg:grid-cols-3 gap-6">
         {productTilesData.map((product: any, i: number) => {
            const getClassName = () => {
               if (i === 0) return 'lg:col-span-1 lg:row-span-2';
               if (i === 3)
                  return 'lg:col-start-3 lg:row-start-1 lg:row-span-2';
               if (i === 1 || i === 2) return 'lg:col-start-2 lg:row-span-1';
               return '';
            };

            return (
               <ProductTilesItem
                  className={cn(getClassName())}
                  key={product.id}
                  name={product.name}
                  image={product.image}
               />
            );
         })}
      </div>
   );
};
