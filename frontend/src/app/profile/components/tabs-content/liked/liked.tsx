'use client';

import { ADD_TO_LIKED } from '@/app/product/product.graphql';
import { ErrorMessage, Title } from '@/components/ui';
import { DivButton } from '@/components/ui/div-button';
import { LikedModel } from '@/types/product-liked';
import { useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import { toast } from 'sonner';
import { LikedItem } from './liked-item';
import { GET_LIKED_PRODUCTS } from './liked.graphql';

const Liked: React.FC = () => {
   const { data, error, refetch } = useQuery(GET_LIKED_PRODUCTS, {
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

   if (error) return <ErrorMessage message={error.message} />;

   return (
      <div className="px-[10px] py-[10px] lg:px-md lg:py-md">
         {data?.getLikedProducts.length === 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
               {data?.getLikedProducts.map((model: LikedModel) => (
                  <LikedItem
                     key={model.code}
                     model={model}
                     onDelete={() => handleDelete(model.code)}
                  />
               ))}
            </div>
         )}
         <div className="flex flex-col items-center gap-4 items-center">
            <Title text="Ви ще не вподобали жодного товару" />
            <p>
               Переглядайте наші товари та натискайте ❤️, щоб додати їх до
               списку вподобаного.
            </p>
            <DivButton>
               <Link href="/shop">До каталогу</Link>
            </DivButton>
         </div>
      </div>
   );
};

export default Liked;
