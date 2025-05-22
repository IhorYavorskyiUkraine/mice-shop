'use client';

import { PixelRating } from '@/components/shared';
import { GET_CART } from '@/components/shared/cart/cart.graphql';
import {
   Button,
   ErrorMessage,
   Separator,
   Title,
   UniversalSkeleton,
} from '@/components/ui';
import { Color } from '@/types/color.type';
import { Model } from '@/types/model.type';
import { Specs } from '@/types/specs.type';
import { useMutation, useQuery } from '@apollo/client';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import qs from 'qs';
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

   const [initialized, setInitialized] = useState(false);

   const {
      data,
      loading,
      error: productError,
   } = useQuery(GET_PRODUCT, {
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
      if (!activeColor?.code?.[0]?.code) {
         toast.error('Немає коду товара');
         return;
      }
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
         setInitialized(true);
         return;
      }

      const parsed = qs.parse(window.location.search, {
         ignoreQueryPrefix: true,
         comma: true,
      });

      const modelIdFromQuery = parsed.modelId ? Number(parsed.modelId) : null;
      const colorIdFromQuery = parsed.colorId ? Number(parsed.colorId) : null;

      let foundModel: Model | null = null;
      let foundColor: Color | null = null;

      if (modelIdFromQuery) {
         foundModel =
            data.getProductById.models.find(
               (model: Model) => model.id === modelIdFromQuery,
            ) || null;

         if (foundModel && colorIdFromQuery) {
            foundColor =
               foundModel.colors.find(
                  (color: Color) =>
                     color.id === colorIdFromQuery && color.stock,
               ) || null;
         }
      }

      if (!foundModel || !foundColor) {
         const availableModel = data.getProductById.models.find(
            (model: Model) => model.colors.some((color: Color) => color.stock),
         );

         if (availableModel) {
            foundModel = availableModel;
            foundColor =
               availableModel.colors.find((color: Color) => color.stock) ||
               null;
         }
      }

      setActiveModel(foundModel);
      setActiveColor(foundColor);
      setInitialized(true);
   }, [data]);

   useEffect(() => {
      if (!initialized || !activeModel) return;

      const queryString = qs.stringify(
         {
            modelId: activeModel?.id,
            colorId: activeColor?.id,
         },
         {
            addQueryPrefix: true,
            arrayFormat: 'comma',
         },
      );

      window.history.replaceState(null, '', queryString);
   }, [activeModel, activeColor, initialized]);

   useEffect(() => {
      if (!initialized) return;
      if (!activeModel) {
         setActiveColor(null);
         return;
      }

      const { colorId } = qs.parse(window.location.search, {
         ignoreQueryPrefix: true,
         comma: true,
      });

      const colorFromQuery = activeModel.colors.find(
         (color: Color) => color.id === Number(colorId) && color.stock,
      );

      if (!colorFromQuery) {
         setActiveColor(
            activeModel.colors.find((color: Color) => color.stock) || null,
         );
      }
   }, [activeModel]);

   if (productError) return <ErrorMessage message={productError.message} />;

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
