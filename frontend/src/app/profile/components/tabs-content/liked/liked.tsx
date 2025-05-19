'use client';

import { ADD_TO_LIKED } from '@/app/product/product.graphql';
import { ErrorMessage, UniversalSkeleton } from '@/components/ui';
import { DivButton } from '@/components/ui/div-button';
import { LikedModel } from '@/types/product-liked';
import { useMutation, useQuery } from '@apollo/client';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { LikedItem } from './liked-item';
import { GET_LIKED_PRODUCTS } from './liked.graphql';

const Liked: React.FC = () => {
   const { data, loading, error, refetch } = useQuery(GET_LIKED_PRODUCTS, {
      fetchPolicy: 'network-only',
   });

   const [deleteLikedProduct] = useMutation(ADD_TO_LIKED, {
      onCompleted: data => {
         if (data?.addToLiked?.message) {
            toast.success(data.addToLiked.message);
         }
         refetch();
      },
   });

   const handleDelete = async (code: string) => {
      await deleteLikedProduct({
         variables: { productCode: code },
      });
   };

   const isEmpty = data?.getLikedProducts.length === 0;

   if (error) return <ErrorMessage message={error.message} />;

   return (
      <div className="lg:min-h-screen px-[10px] py-[10px] lg:px-md lg:py-md">
         {!isEmpty && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
               {loading ? (
                  <UniversalSkeleton likedItems />
               ) : (
                  data?.getLikedProducts.map((model: LikedModel) => (
                     <LikedItem
                        key={model.code}
                        model={model}
                        onDelete={() => handleDelete(model.code)}
                     />
                  ))
               )}
            </div>
         )}
         {isEmpty && (
            <div className="flex flex-col justify-center items-center gap-3 min-h-[40vh] lg:min-h-[60vh] text-center px-4">
               <Heart className="w-10 h-10 text-muted-foreground lg:w-16 lg:h-16" />
               <h2 className="text-base font-semibold sm:text-lg lg:text-2xl">
                  Список вподобаного порожній
               </h2>
               <p className="text-sm text-muted-foreground sm:text-base lg:text-lg max-w-[600px]">
                  Натисніть на <Heart size={16} className="inline-block" /> біля
                  товару, щоб додати його до улюблених. А поки що можете
                  переглянути наш каталог.
               </p>
               <DivButton className="text-sm sm:text-base px-4 py-2">
                  <Link href="/shop">До каталогу</Link>
               </DivButton>
            </div>
         )}
      </div>
   );
};

export default Liked;
