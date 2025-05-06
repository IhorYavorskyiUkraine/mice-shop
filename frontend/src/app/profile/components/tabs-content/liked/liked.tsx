import { LikedModel } from '@/types/product-liked';
import { useQuery } from '@apollo/client';
import { LikedItem } from './liked-item';
import { GET_LIKED_PRODUCTS } from './liked.graphql';

export const Liked: React.FC = () => {
   const { data, loading, error } = useQuery(GET_LIKED_PRODUCTS, {
      fetchPolicy: 'network-only',
   });
   return (
      <div className="px-md py-md">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.getLikedProducts.map((model: LikedModel) => (
               <LikedItem key={model.code} model={model} />
            ))}
         </div>
      </div>
   );
};
