'use client';

import { Button, Separator, Title } from '@/components/ui';
import { Color } from '@/types/color.type';
import { Model } from '@/types/model.type';
import { Specs } from '@/types/specs.type';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { GET_PRODUCT } from '../product.graphql';
import { ProductPickColor } from './product-pick-color';
import { ProductPickModel } from './product-pick-model';

interface Props {
   id: number;
}

export const ProductInfo: React.FC<Props> = ({ id }) => {
   const [activeModel, setActiveModel] = useState<Model | null>(null);
   const [activeColor, setActiveColor] = useState<string | null>(null);

   const { data } = useQuery(GET_PRODUCT, {
      variables: { id },
   });

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

      setActiveColor(availableColor?.name || null);
   }, [activeModel]);

   return (
      <div className="grid grid-cols-2">
         <div className="relative lg:size-[722px] bg-primary overflow-hidden">
            <Image
               src={
                  data?.getProductById.image ||
                  'https://placehold.co/722x722/png'
               }
               fill
               style={{ objectFit: 'contain' }}
               alt="Product Image"
               priority
               sizes="(max-width: 768px) 100vw, 722px"
            />
         </div>
         <div>
            <Title
               text={data?.getProductById.name}
               size="xl"
               className="mb-sm"
            />
            <p>Rating: {data?.getProductById.rating}</p>
            <Separator />
            <ul className="list-disc pl-5 space-y-2">
               {activeModel?.specs?.map((spec: Specs) => (
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
               active={activeColor || ''}
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
            <div className="flex gap-[20px] items-center">
               <p className="text-xxl">{activeModel?.price}$</p>
               <Button className="w-full uppercase">Додати в кошик</Button>
            </div>
         </div>
      </div>
   );
};
