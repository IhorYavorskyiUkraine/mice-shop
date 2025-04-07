'use client';

import { Container, Title } from '@/components/ui';
import { cn } from '@/lib';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../header/header.graphql';
import { ProductBlockItem } from './product-block-item';

interface Props {
   title: string;
   className?: string;
}

export const ProductBlock: React.FC<Props> = ({ title, className }) => {
   const { data, loading } = useQuery(GET_ALL_PRODUCTS, {
      variables: {
         args: { limit: 4 },
      },
   });

   return (
      <section>
         <Container className={cn(className, 'pb-md')}>
            <Title className="text-center mb-md" text={title} size="xl" />
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
               {data?.getAllProducts?.map((product: any) => (
                  <ProductBlockItem key={product.id} product={product} />
               ))}
            </div>
         </Container>
      </section>
   );
};
