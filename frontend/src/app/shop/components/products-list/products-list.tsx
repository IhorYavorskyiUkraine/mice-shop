'use client';

import { ProductBlockItem } from '@/components/shared/product-block/product-block-item';
import { ErrorMessage, UniversalSkeleton } from '@/components/ui';
import { Product } from '@/types/product.type';
import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useShopStore } from '../../store';
import { GET_FILTERED_PRODUCTS } from './product-list.graphql';

export const ProductsList: React.FC = () => {
   const filters = useShopStore(state => state.filters);

   const [fetchProducts, { data, loading, error }] = useLazyQuery(
      GET_FILTERED_PRODUCTS,
   );

   useEffect(() => {
      fetchProducts({
         variables: {
            args: filters,
         },
      });
   }, [filters, fetchProducts]);

   if (error) return <ErrorMessage message={error.message} />;

   return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
         {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
               <UniversalSkeleton productBlockItem key={index} />
            ))
         ) : data?.getFilteredProducts?.length ? (
            data.getFilteredProducts.map((product: Product, i: number) => (
               <ProductBlockItem key={i} product={product} />
            ))
         ) : (
            <div className="col-span-full text-center py-10">
               Товарів не знайдено
            </div>
         )}
      </div>
   );
};
