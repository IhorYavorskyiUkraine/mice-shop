'use client';

import { UniversalSkeleton } from '@/components/ui';
import { cn } from '@/lib';
import { Product } from '@/types/product.type';
import { useQuery } from '@apollo/client';
import { ServerError } from '../errors/server-error';
import { GET_TRENDING_PRODUCTS } from '../header/header.graphql';
import { ProductTilesItem } from './product-tiles-item';

export const ProductTilesContent: React.FC = ({}) => {
   const { data, error, loading, refetch } = useQuery(GET_TRENDING_PRODUCTS, {
      variables: {
         args: {
            limit: 4,
            tagId: 1,
            offset: 0,
         },
      },
      notifyOnNetworkStatusChange: true,
   });

   if (error) {
      if (error?.networkError) {
         return (
            <ServerError
               onRetry={() => {
                  refetch().catch(err => {
                     console.error('Помилка повторної спроби:', err.message);
                  });
               }}
            />
         );
      }
   }

   const getClassName = (i: number) => {
      if (i === 0) return 'lg:col-span-1 lg:row-span-2';
      if (i === 3) return 'lg:col-start-3 lg:row-start-1 lg:row-span-2';
      if (i === 1 || i === 2) return 'lg:col-start-2 lg:row-span-1';
      return '';
   };

   return (
      <div className="grid grid-cols-1 lg:grid-rows-[repeat(2,306px)] lg:grid-cols-3 gap-2 lg:gap-6">
         {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                 <UniversalSkeleton key={index} tilesCn={getClassName(index)} />
              ))
            : data?.getAllProducts?.map((product: Product, i: number) => {
                 return (
                    <ProductTilesItem
                       className={cn(getClassName(i))}
                       key={product.id}
                       product={product}
                       index={i}
                    />
                 );
              })}
      </div>
   );
};
