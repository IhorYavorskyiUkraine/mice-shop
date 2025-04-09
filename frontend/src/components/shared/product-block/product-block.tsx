'use client';

import { Container, Title } from '@/components/ui';
import { cn } from '@/lib';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../header/header.graphql';
import { ProductBlockItem } from './product-block-item';

interface Props {
   title: string;
   className?: string;
   tag: string;
}

export const ProductBlock: React.FC<Props> = ({ title, className, tag }) => {
   const { data, loading } = useQuery(GET_ALL_PRODUCTS, {
      variables: {
         args: { limit: 4, [tag]: 'desc' },
      },
   });

   return (
      <section>
         <Container className={cn(className, 'pb-sm lg:pb-md')}>
            <Title
               className="text-center mb-sm lg:mb-md"
               text={title}
               size="xl"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
               {data?.getAllProducts?.map(product => (
                  <ProductBlockItem key={product.id} product={product} />
               ))}
            </div>
         </Container>
      </section>
   );
};
