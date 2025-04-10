'use client';

import {
   Container,
   ErrorMessage,
   Title,
   UniversalSkeleton,
} from '@/components/ui';
import { cn } from '@/lib';
import { Product } from '@/types/product.type';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../header/header.graphql';
import { ProductBlockItem } from './product-block-item';

interface Props {
   title: string;
   className?: string;
   tag: string;
}

export const ProductBlock: React.FC<Props> = ({ title, className, tag }) => {
   const { data, loading, error } = useQuery(GET_ALL_PRODUCTS, {
      variables: {
         args: { limit: 4, [tag]: 'desc' },
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
   });

   if (error) return <ErrorMessage message={error.message} />;

   return (
      <section>
         <Container className={cn(className, 'pb-sm lg:pb-md')}>
            <Title
               className="text-center mb-sm lg:mb-md"
               text={title}
               size="xl"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
               {loading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                     <UniversalSkeleton productBlockItem key={index} />
                  ))
               ) : data?.getAllProducts?.length ? (
                  data.getAllProducts.map((product: Product) => (
                     <ProductBlockItem key={product.id} product={product} />
                  ))
               ) : (
                  <div className="col-span-full text-center py-10">
                     Товарів не знайдено
                  </div>
               )}
            </div>
         </Container>
      </section>
   );
};
