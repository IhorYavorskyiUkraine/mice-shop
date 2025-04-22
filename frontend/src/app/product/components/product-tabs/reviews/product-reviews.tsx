'use client';

import { Modal } from '@/components/shared/modal';
import { ErrorMessage, Title } from '@/components/ui';
import { Review } from '@/types/review.type';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { ReviewItem } from '../review-item';
import { Form } from './form';
import { GET_PRODUCT_REVIEWS } from './reviews.graphql';
interface Props {
   id: number;
   active: boolean;
}

export const ProductReviews: React.FC<Props> = ({ id, active }) => {
   const [openModal, setOpenModal] = useState(false);

   const { data, loading, refetch, error } = useQuery(GET_PRODUCT_REVIEWS, {
      variables: {
         args: { productId: id, orderBy: 'desc', limit: 10, offset: 0 },
      },
   });

   const isNotEmpty = data?.getProductReviews.length > 0;

   if (error) return <ErrorMessage message={error.message} />;

   return (
      active && (
         <div className="py-sm">
            <div className="flex items-center mb-sm">
               {isNotEmpty && <button className="mr-auto">Сортувати за</button>}
               <div className={!isNotEmpty ? 'ml-auto' : ''}>
                  <Modal
                     open={openModal}
                     setOpen={setOpenModal}
                     title="Додати відгук"
                     icon={
                        <div className="inline-flex items-center uppercase text-default text-[var(--font-size-xxxl)] justify-center cursor-pointer gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary border border-primary text-secondary hover:bg-primary/90 h-9 px-4 py-5 has-[>img]:px-3">
                           Залишити відгук
                        </div>
                     }
                  >
                     <Form
                        refetch={refetch}
                        productId={id}
                        setIsOpen={() => setOpenModal(false)}
                     />
                  </Modal>
               </div>
            </div>

            <div className="space-y-5">
               {!isNotEmpty ? (
                  <Title
                     text="Відгуків поки що нема :("
                     className="text-center"
                  />
               ) : (
                  data?.getProductReviews.map((review: Review) => (
                     <ReviewItem key={review.id} review={review} />
                  ))
               )}
            </div>
         </div>
      )
   );
};
