import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationItem } from './pagination-item';

interface Props {
   currentPage: number;
   totalPages: number;
   onPageChange: (page: number) => void;
   noScroll?: boolean;
}

export const Pagination: React.FC<Props> = ({
   currentPage,
   totalPages,
   onPageChange,
   noScroll,
}) => {
   const isFirstPage = currentPage === 1;
   const isLastPage = currentPage === totalPages;
   const hasMultiplePages = totalPages > 1;

   const handlePrev = () => {
      if (!isFirstPage) {
         onPageChange(currentPage - 1);
      }
   };

   const handleClick = (page: number) => {
      onPageChange(page);
      if (!noScroll) {
         window.scrollTo({ top: 0, behavior: 'smooth' });
      }
   };

   const handleNext = () => {
      if (!isLastPage) {
         onPageChange(currentPage + 1);
      }
   };

   return (
      <div className="flex items-center justify-center gap-2">
         <PaginationItem
            icon={<ChevronLeft />}
            onClick={handlePrev}
            disabled={isFirstPage || !hasMultiplePages}
         />
         <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
               <PaginationItem
                  key={page}
                  page={page}
                  active={page === currentPage}
                  onClick={() => handleClick(page)}
               />
            ))}
         </div>
         <PaginationItem
            icon={<ChevronRight />}
            onClick={handleNext}
            disabled={isLastPage || !hasMultiplePages}
         />
      </div>
   );
};
