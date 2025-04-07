'use client';

import { Container, Title } from '@/components/ui';
import { cn } from '@/lib';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../header/header.graphql';
import { ProductTilesItem } from './product-tiles-item';

interface Props {
   title: string;
   className?: string;
}

export const ProductTiles: React.FC<Props> = ({ title, className }) => {
   const { data, loading } = useQuery(GET_ALL_PRODUCTS, {
      variables: {
         args: { limit: 4 },
      },
   });

   return (
      <section>
         <Container className={cn(className, 'py-md')}>
            <Title className="text-center mb-md" text={title} size="xl" />
            <div className="grid grid-cols-1 md:grid-rows-[repeat(2,306px)] md:grid-cols-3 gap-6">
               {data?.getAllProducts?.map((product: any, i: number) => {
                  const getClassName = () => {
                     if (i === 0) return 'md:col-span-1 md:row-span-2';
                     if (i === 3)
                        return 'md:col-start-3 md:row-start-1 md:row-span-2';
                     if (i === 1 || i === 2)
                        return 'md:col-start-2 md:row-span-1';
                     return '';
                  };

                  return (
                     <ProductTilesItem
                        className={cn(getClassName())}
                        key={product.id}
                        name={product.name}
                        image={''}
                     />
                  );
               })}
            </div>
         </Container>
      </section>
   );
};
