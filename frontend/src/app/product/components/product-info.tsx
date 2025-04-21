'use client';

import { GET_CART } from '@/components/shared/cart/cart.graphql';
import { Button, Separator, Title, UniversalSkeleton } from '@/components/ui';
import { Color } from '@/types/color.type';
import { Model } from '@/types/model.type';
import { Specs } from '@/types/specs.type';
import { useMutation, useQuery } from '@apollo/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ADD_PRODUCT, GET_PRODUCT } from '../product.graphql';
import { ProductPickColor } from './product-pick-color';
import { ProductPickModel } from './product-pick-model';

interface Props {
   id: number;
}

export const ProductInfo: React.FC<Props> = ({ id }) => {
   const [activeModel, setActiveModel] = useState<Model | null>(null);
   const [activeColor, setActiveColor] = useState<Color | null>(null);

   const { data, loading, error } = useQuery(GET_PRODUCT, {
      variables: { id },
   });

   const [addProduct, { loading: addProductLoading }] =
      useMutation(ADD_PRODUCT);

   const { refetch } = useQuery(GET_CART);

   const addToCart = async () => {
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
         <div className="relative w-full aspect-square max-w-[722px] bg-primary overflow-hidden mx-auto">
            <Image
               src={activeColor?.image || 'https://placehold.co/722x722/png'}
               fill
               className="object-contain"
               alt="Product Image"
               priority
               sizes="(max-width: 768px) 100vw, 722px"
            />
         </div>
         <div>
            {loading ? (
               <div className="mb-sm">
                  <UniversalSkeleton productTitle />
               </div>
            ) : (
               <Title
                  text={data?.getProductById.name}
                  size="xl"
                  className="mb-sm"
               />
            )}
            {loading ? (
               <UniversalSkeleton productRating />
            ) : (
               <p>Rating: {data?.getProductById.rating}</p>
            )}
            <Separator />
            <ul className="list-disc pl-5 space-y-2">
               {activeModel?.specs?.map((spec: Specs, i: number) => (
                  <li key={spec.key}>
                     <p>
                        {spec.key}: {spec.value}
                     </p>
                  </li>
               ))}
            </ul>
            <Separator />
            <ProductPickColor
               colors={activeModel?.colors}
               active={activeColor?.name || ''}
               setActive={setActiveColor}
            />
            <ProductPickModel
               models={data?.getProductById.models}
               active={activeModel?.name}
               setActive={setActiveModel}
            />
            <p>
               {activeColor && activeModel ? 'В наявності' : 'Нема в наявності'}
            </p>
            <div className="flex flex-wrap gap-5 items-center">
               <p className="text-xxl flex-shrink-0">{activeModel?.price}$</p>
               <Button
                  onClick={addToCart}
                  loading={addProductLoading}
                  className="flex-1 min-w-[200px] uppercase"
               >
                  Додати в кошик
               </Button>
            </div>
         </div>
      </div>
   );
};
