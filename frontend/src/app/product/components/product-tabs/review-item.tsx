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
               <div className="flex justify-between">
                  <p className="text-primary">{review.user.displayName}</p>
                  <p>{formatDate(review.createdAt)}</p>
               </div>
               <p className="text-primary text-m1">{review.comment}</p>
            </div>
         </div>
      </article>
   );
};
