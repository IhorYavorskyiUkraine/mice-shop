'use client';

import { Title } from '@/components/ui';
import { Specs } from '@/types/specs.type';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { GET_PRODUCT } from '../product.graphql';

interface Props {
   id: number;
}

export const ProductInfo: React.FC<Props> = ({ id }) => {
   const { data } = useQuery(GET_PRODUCT, {
      variables: { id },
   });

   return (
      <div className="grid grid-cols-2">
         <div className="relative lg:size-[600px] bg-primary overflow-hidden">
            <Image
               src={data?.getProductById.image}
               fill
               style={{ objectFit: 'contain' }}
               alt="Product Image"
               priority
               sizes="(max-width: 768px) 100vw, 600px"
            />
         </div>
         <div>
            <Title
               text={data?.getProductById.name}
               size="xl"
               className="mb-sm"
            />
            <p>Rating: {data?.getProductById.rating}</p>
            <div className="my-sm w-full h-[2px] bg-primary"></div>
            <ul className="list-disc pl-5 space-y-2">
               {data?.getProductById.generalSpecs.map((spec: Specs) => (
                  <li key={spec.key}>
                     <p>
                        {spec.key}: {spec.value}
                     </p>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};
