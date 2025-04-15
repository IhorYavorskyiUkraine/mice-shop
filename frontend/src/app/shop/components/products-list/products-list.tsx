'use client';

import { ProductBlockItem } from '@/components/shared/product-block/product-block-item';
import { ErrorMessage, UniversalSkeleton } from '@/components/ui';
import { Product } from '@/types/product.type';
import { useLazyQuery } from '@apollo/client';
import qs from 'qs';
import { useEffect, useState } from 'react';
import { useShopStore } from '../../store';
import { Pagination } from '../pagination/pagination';
import { GET_FILTERED_PRODUCTS } from './product-list.graphql';

export const ProductsList: React.FC = () => {
   const filters = useShopStore(state => state.filters);
   const setFilters = useShopStore(state => state.setFilters);

   const [fetchProducts, { data, loading, error }] = useLazyQuery(
      GET_FILTERED_PRODUCTS,
   );

   const [initialized, setInitialized] = useState(false);

   const parseStringArray = (value: any): string[] => {
      if (!value) return [];
      if (Array.isArray(value)) return value.map(String);
      return [String(value)];
   };

   const normalizePrice = (rawPrice: any) => {
      return {
         min: Number(rawPrice?.min) || filters.price.min,
         max: Number(rawPrice?.max) || filters.price.max,
      };
   };

   useEffect(() => {
      const parsed = qs.parse(window.location.search, {
         ignoreQueryPrefix: true,
         comma: true,
      });

      const normalizedFilters = {
         ...filters,
         tags: parseStringArray(parsed.tags),
         brands: parseStringArray(parsed.brands),
         colors: parseStringArray(parsed.colors),
         specs: parseStringArray(parsed.specs),
         price: normalizePrice(parsed.price),
         limit: Number(parsed.limit) || filters.limit,
         offset: Number(parsed.offset) || 0,
      };

      setFilters(normalizedFilters);
      setInitialized(true);
   }, []);

   useEffect(() => {
      if (!initialized) return;

      fetchProducts({
         variables: {
            args: filters,
         },
      });

      const queryString = qs.stringify(filters, {
         addQueryPrefix: true,
         arrayFormat: 'comma',
      });

      window.history.replaceState(null, '', queryString);
   }, [filters, initialized]);

   const onPageChange = (page: number) => {
      setFilters({ ...filters, offset: (page - 1) * filters.limit });
   };

   if (error) return <ErrorMessage message={error.message} />;

   return (
      <>
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {loading ? (
               Array.from({ length: 8 }).map((_, index) => (
                  <UniversalSkeleton productBlockItem key={index} />
               ))
            ) : data?.getFilteredProducts?.products.length ? (
               data.getFilteredProducts.products.map(
                  (product: Product, i: number) => (
                     <ProductBlockItem key={i} product={product} />
                  ),
               )
            ) : (
               <div className="col-span-full text-center py-10">
                  Товарів не знайдено
               </div>
            )}
         </div>
         <Pagination
            currentPage={data?.getFilteredProducts?.currentPage}
            totalPages={data?.getFilteredProducts?.totalPages}
            onPageChange={onPageChange}
         />
      </>
   );
};
