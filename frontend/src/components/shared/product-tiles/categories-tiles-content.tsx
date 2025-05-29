'use client';

import { UniversalSkeleton } from '@/components/ui';
import { Category } from '@/types/category.type';
import { useQuery } from '@apollo/client';
import { ServerError } from '../errors/server-error';
import { GET_ALL_CATEGORIES } from './categories.graphql';
import { CategoryTilesItem } from './category-tiles-item';

export const CategoriesTilesContent: React.FC = () => {
   const { data, loading, error, refetch } = useQuery(GET_ALL_CATEGORIES, {
      notifyOnNetworkStatusChange: true,
   });

   if (error) {
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
   }

   return (
      <div className="grid md:grid-cols-2 grid-cols-1 pb-6 gap-6">
         {loading ? (
            <UniversalSkeleton categoryTiles />
         ) : (
            data?.getAllProductCategories?.map((category: Category) => {
               return (
                  <CategoryTilesItem
                     key={category.id}
                     category={category.name}
                  />
               );
            })
         )}
      </div>
   );
};
