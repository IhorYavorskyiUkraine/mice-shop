'use client';

import { useQuery } from '@apollo/client';
import { GET_ALL_CATEGORIES } from './categories.graphql';
import { CategoryTilesItem } from './category-tiles-item';

export const CategoriesTilesContent: React.FC = () => {
   const { data, loading } = useQuery(GET_ALL_CATEGORIES);

   return (
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
         {data?.getAllProductCategories?.map((category: any) => {
            return (
               <CategoryTilesItem key={category.id} category={category.name} />
            );
         })}
      </div>
   );
};
