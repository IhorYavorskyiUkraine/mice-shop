'use client';

import { Container, Title, UniversalSkeleton } from '@/components/ui';
import { cn } from '@/lib';
import { Product } from '@/types/product.type';
import { useQuery } from '@apollo/client';
import { ServerError } from '../errors/server-error';
import { GET_ALL_PRODUCTS } from '../header/header.graphql';
import { ProductBlockItem } from './product-block-item';

interface Props {
   title: string;
   className?: string;
   tag: string;
}

export const ProductBlock: React.FC<Props> = ({ title, className, tag }) => {
   const { data, loading, error, refetch } = useQuery(GET_ALL_PRODUCTS, {
      variables: {
         args: { limit: 4, [tag]: 'desc', offset: 0 },
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
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
               {error?.networkError ? (
                  <div className="col-span-full flex flex-col items-center justify-center">
                     <ServerError
                        onRetry={() => {
                           refetch().catch(err => {
                              console.error(
                                 'Помилка повторної спроби:',
                                 err.message,
                              );
                           });
                        }}
                     />
                  </div>
               ) : loading ? (
                  <UniversalSkeleton productBlockItem />
               ) : data?.getAllProducts?.length ? (
                  data.getAllProducts.map((product: Product) => (
                     <ProductBlockItem key={product.id} product={product} />
                  ))
               ) : (
                  <div className="col-span-full text-center py-10">
                     Товарів не знайдено
                  </div>
               )}
            </div>
         </Container>
      </section>
   );
};
