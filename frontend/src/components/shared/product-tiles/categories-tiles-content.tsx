'use client';

import { ErrorMessage, UniversalSkeleton } from '@/components/ui';
import { Category } from '@/types/category.type';
import { useQuery } from '@apollo/client';
import { GET_ALL_CATEGORIES } from './categories.graphql';
import { CategoryTilesItem } from './category-tiles-item';

export const CategoriesTilesContent: React.FC = () => {
   const { data, loading, error } = useQuery(GET_ALL_CATEGORIES);

   if (error) return <ErrorMessage message={error.message} />;

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
