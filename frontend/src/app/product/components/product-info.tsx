'use client';

import { PixelRating } from '@/components/shared';
import { GET_CART } from '@/components/shared/cart/cart.graphql';
import { Button, Separator, Title, UniversalSkeleton } from '@/components/ui';
import { Color } from '@/types/color.type';
import { Model } from '@/types/model.type';
import { Specs } from '@/types/specs.type';
import { useMutation, useQuery } from '@apollo/client';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
   ADD_PRODUCT,
   ADD_TO_LIKED,
   GET_LIKED,
   GET_PRODUCT,
} from '../product.graphql';
import { ProductPickColor } from './product-pick-color';
import { ProductPickModel } from './product-pick-model';

interface Props {
   id: number;
}

export const ProductInfo: React.FC<Props> = ({ id }) => {
   const [activeModel, setActiveModel] = useState<Model | null>(null);
   const [activeColor, setActiveColor] = useState<Color | null>(null);

   const { data, loading } = useQuery(GET_PRODUCT, {
      variables: { id },
   });
   const { data: likedData, refetch: refetchLiked } = useQuery(GET_LIKED, {
      variables: { productCode: activeColor?.code?.[0]?.code },
      skip: !activeColor?.code?.[0]?.code,
   });

   const [addProduct, { loading: addProductLoading }] =
      useMutation(ADD_PRODUCT);
   const [addToLiked, { loading: addLikedLoading }] = useMutation(
      ADD_TO_LIKED,
      {
         onCompleted: data => {
            if (data?.addToLiked?.message) {
               toast.success(data.addToLiked.message);
            }
         },
         onError: error => {
            toast.error(error.message || 'Failed to add to liked');
         },
      },
   );

   const { refetch } = useQuery(GET_CART);

   const addToCart = async () => {
      if (loading) return;
      await addProduct({
         variables: {
            args: {
               modelId: activeModel?.id,
               colorId: activeColor?.id,
            },
         },
      });
      await refetch();
   };

   const handleAddToLiked = async () => {
      if (loading || addLikedLoading || addProductLoading) return;
      if (!activeColor?.code?.[0]?.code) return;
      await addToLiked({
         variables: {
            productCode: activeColor?.code?.[0]?.code,
         },
      });
      await refetchLiked();
   };

   useEffect(() => {
      if (!data?.getProductById?.models?.length) {
         setActiveModel(null);
         setActiveColor(null);
         return;
      }

      const availableModel = data.getProductById.models.find((model: Model) =>
         model.colors.some((color: Color) => color.stock),
      );

      if (availableModel) {
         setActiveModel(availableModel);

         const availableColor = availableModel.colors?.find(
            (color: Color) => color.stock,
         );

         setActiveColor(availableColor.name || null);
      } else {
         setActiveModel(null);
         setActiveColor(null);
      }
   }, [data]);

   useEffect(() => {
      if (!activeModel) {
         setActiveColor(null);
         return;
      }

      const availableColor = activeModel.colors.find(
         (color: Color) => color.stock,
      );

      setActiveColor(availableColor || null);
   }, [activeModel]);

   return (
      <div className="grid lg:grid-cols-2 lg:grid-rows-1 grid-cols-1 gap-6">
         <div className="relative w-full aspect-square max-w-[722px] bg-secondary overflow-hidden mx-auto">
            {loading ? (
               <UniversalSkeleton productImage />
            ) : (
               <Image
                  src={activeColor?.image || 'https://placehold.co/722x722/png'}
                  width={722}
                  height={722}
                  className="object-contain"
                  alt="Product Image"
                  priority
                  sizes="(max-width: 768px) 100vw, 722px"
               />
            )}
         </div>
         <div>
            {loading ? (
               <div className="mb-sm">
                  <UniversalSkeleton productTitle />
               </div>
            ) : (
               <div className="flex items-center justify-between mb-sm">
                  <Title text={data?.getProductById.name} size="xl" />
                  <Heart
                     size="36"
                     onClick={handleAddToLiked}
                     className="cursor-pointer"
                     fill={likedData?.isProductLiked ? 'black' : 'none'}
                  />
               </div>
            )}
            {loading ? (
               <UniversalSkeleton productRating />
            ) : (
               <PixelRating rating={data?.getProductById.rating} />
            )}
            <Separator />
            {loading ? (
               <UniversalSkeleton productSpecs />
            ) : (
               <ul className="list-disc pl-5 space-y-2">
                  {activeModel?.specs?.map((spec: Specs) => (
                     <li key={spec.key}>
                        <p>
                           {spec.key}: {spec.value}
                        </p>
                     </li>
                  ))}
               </ul>
            )}
            <Separator />
            <ProductPickColor
               colors={activeModel?.colors}
               active={activeColor?.name || ''}
               setActive={setActiveColor}
               loading={loading}
            />
            <ProductPickModel
               models={data?.getProductById.models}
               active={activeModel?.name}
               setActive={setActiveModel}
               loading={loading}
            />
            <div className="flex justify-between">
               <p>
                  {activeColor && activeModel
                     ? 'В наявності'
                     : 'Нема в наявності'}
               </p>
               <p className="text-s">
                  Код: {activeColor?.code?.[0]?.code || ''}
               </p>
            </div>
            <div className="flex flex-wrap gap-5 items-center">
               {loading ? (
                  <UniversalSkeleton productPrice />
               ) : (
                  <p className="text-xxl flex-shrink-0">
                     {activeModel?.price}$
                  </p>
               )}
               <Button
                  onClick={addToCart}
                  loading={addProductLoading}
                  className="flex-1 min-w-[200px]"
               >
                  Додати в кошик
               </Button>
            </div>
         </div>
      </div>
   );
};
