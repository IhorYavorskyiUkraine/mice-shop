'use client';

import { SortingMobile } from '@/components/shared';
import { Modal } from '@/components/shared/modal';
import { Pagination } from '@/components/shared/pagination/pagination';
import { SortByDropdown } from '@/components/shared/sorting-component';
import { ErrorMessage, Title, UniversalSkeleton } from '@/components/ui';
import { Review } from '@/types/review.type';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { useMedia } from 'react-use';
import { Form } from './form';
import { ReviewItem } from './review-item';
import { GET_PRODUCT_REVIEWS } from './reviews.graphql';
import { sortByData } from './sortBy.data';

interface Props {
   id: number;
   active: boolean;
}

export const ProductReviews: React.FC<Props> = ({ id, active }) => {
   const [openModal, setOpenModal] = useState(false);
   const [activeSort, setActiveSort] = useState<[string, 'asc' | 'desc']>([
      'rating',
      'desc',
   ]);
   const isMobile = useMedia('(max-width: 1024px)', false);

   const { data, loading, refetch, error } = useQuery(GET_PRODUCT_REVIEWS, {
      variables: {
         args: {
            productId: id,
            orderBy: [activeSort[0], activeSort[1]],
            limit: 8,
            offset: 0,
         },
      },
   });

   const isNotEmpty = data?.getProductReviews.reviews.length > 0;
   const totalPages = data?.getProductReviews.totalPages;
   const currentPage = data?.getProductReviews.currentPage;

   const onPageChange = async (currentPage: number) => {
      await refetch({
         args: {
            productId: id,
            orderBy: [activeSort[0], activeSort[1]],
            limit: 8,
            offset: (currentPage - 1) * 8,
         },
      });
   };

   if (error) return <ErrorMessage message={error.message} />;

   return (
      active && (
         <div className="py-sm">
            <div className="flex items-center justify-between mb-sm">
               {isNotEmpty && isMobile ? (
                  <SortingMobile
                     data={sortByData}
                     activeSort={activeSort}
                     setActive={setActiveSort}
                  />
               ) : (
                  <SortByDropdown
                     data={sortByData}
                     activeSort={activeSort}
                     setActive={setActiveSort}
                  />
               )}
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
            {loading ? (
               <UniversalSkeleton productReviews />
            ) : data?.getProductReviews.reviews.length === 0 ? (
               <Title text="Відгуків поки що нема :(" className="text-center" />
            ) : (
               <div className="space-y-5">
                  {data.getProductReviews.reviews.map((review: Review) => (
                     <ReviewItem key={review.id} review={review} />
                  ))}
                  <Pagination
                     totalPages={totalPages}
                     currentPage={currentPage}
                     onPageChange={onPageChange}
                     noScroll
                  />
               </div>
            )}
         </div>
      )
   );
};
