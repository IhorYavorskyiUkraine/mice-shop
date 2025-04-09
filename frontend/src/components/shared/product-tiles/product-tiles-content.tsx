'use client';

import { cn } from '@/lib';
import { useQuery } from '@apollo/client';
import { GET_TRENDING_PRODUCTS } from '../header/header.graphql';
import { ProductTilesItem } from './product-tiles-item';

interface Props {}

export const ProductTilesContent: React.FC<Props> = ({}) => {
   const { data, loading, error } = useQuery(GET_TRENDING_PRODUCTS, {
      variables: {
         args: {
            limit: 4,
            tagId: 1,
         },
      },
   });

   return (
      <div className="grid grid-cols-1 lg:grid-rows-[repeat(2,306px)] lg:grid-cols-3 gap-2 lg:gap-6">
         {data?.getAllProducts?.map((product: any, i: number) => {
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
                  product={product}
                  index={i}
               />
            );
         })}
      </div>
   );
};
