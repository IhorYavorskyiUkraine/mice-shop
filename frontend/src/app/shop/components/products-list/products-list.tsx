'use client';

import { SortingMobile } from '@/components/shared';
import { ServerError } from '@/components/shared/errors/server-error';
import { ProductBlockItem } from '@/components/shared/product-block/product-block-item';
import { SortByDropdown } from '@/components/shared/sorting-component';
import { Title, UniversalSkeleton } from '@/components/ui';
import { Product } from '@/types/product.type';
import { useQuery } from '@apollo/client';
import qs from 'qs';
import { useEffect, useState } from 'react';
import { Pagination } from '../../../../components/shared/pagination/pagination';
import { useShopStore } from '../../store';
import { dropdownData } from '../dropdown.data';
import { SidebarMobile } from '../sidebar/sidebar-mobile';
import { GET_FILTERED_PRODUCTS } from './product-list.graphql';

export const ProductsList: React.FC = () => {
   const filters = useShopStore(state => state.filters);
   const setFilters = useShopStore(state => state.setFilters);
   const [initialized, setInitialized] = useState(false);

   const { data, loading, error, refetch } = useQuery(GET_FILTERED_PRODUCTS, {
      variables: {
         args: filters,
      },
      notifyOnNetworkStatusChange: true,
   });

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
      const queryString = qs.stringify(filters, {
         addQueryPrefix: true,
         arrayFormat: 'comma',
      });
      window.history.replaceState(null, '', queryString);
   }, [filters, initialized]);

   const onPageChange = (page: number) => {
      setFilters({ ...filters, offset: (page - 1) * filters.limit });
   };

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

   return (
      <div>
         <div className="flex items-center justify-between mb-md">
            <Title text="Магазин" className="hidden lg:block" />
            <SortByDropdown
               data={dropdownData}
               activeSort={filters.sort}
               setActive={newSort => setFilters({ ...filters, sort: newSort })}
            />
            <SortingMobile
               data={dropdownData}
               activeSort={filters.sort}
               setActive={newSort => setFilters({ ...filters, sort: newSort })}
            />
            <SidebarMobile />
         </div>
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {loading ? (
               <UniversalSkeleton productBlockItem length={8} />
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
      </div>
   );
};
