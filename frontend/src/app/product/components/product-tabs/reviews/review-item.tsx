import { PixelRating } from '@/components/shared';
import { formatDate } from '@/lib/formateDate';
import { Review } from '@/types/review.type';

interface Props {
   review: Review;
}

export const ReviewItem: React.FC<Props> = ({ review }) => {
   return (
      <article className="w-full border-primary border-2 p-4">
         <div className="flex gap-4">
            <div className="size-[50px] rounded-full bg-primary/30"></div>
            <div className="flex-1">
               <div className="flex justify-between text-m1">
                  <p>{review.user.displayName}</p>
                  <p>{formatDate(review.createdAt)}</p>
               </div>
               <PixelRating
                  showDecimal={false}
                  progressBar={false}
                  className="text-sm!"
                  rating={review.rating}
               />
               <p className="text-m1">{review.comment}</p>
            </div>
         </div>
      </article>
   );
};
