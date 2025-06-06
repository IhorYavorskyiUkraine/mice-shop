'use client';

import { TextareaWithValidations } from '@/components/shared/textarea-with-validation';
import { Button } from '@/components/ui';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { PixelRatingInputText } from './input-rating';
import { CREATE_REVIEW } from './reviews.graphql';
import { createReviewSchema, TCreateReview } from './schema';

interface Props {
   productId: number;
   setIsOpen: () => void;
   refetch: () => void;
}

export const Form: React.FC<Props> = ({ setIsOpen, productId, refetch }) => {
   const form = useForm<TCreateReview>({
      resolver: zodResolver(createReviewSchema),
      defaultValues: {
         rating: 5,
         comment: '',
      },
   });

   const [createReview, { loading }] = useMutation(CREATE_REVIEW);

   const onSubmit = async (data: TCreateReview) => {
      try {
         if (loading) return;

         await createReview({
            variables: {
               args: { ...data, productId, comment: data.comment.trim() },
            },
         });

         refetch();
         setIsOpen();
         toast.success('Ви успішно залишили відгук');
         form.reset();
      } catch (error) {
         console.error('Error [CreateReview]', error);
      }
   };

   return (
      <FormProvider {...form}>
         <form
            className="flex flex-1 flex-col gap-2 "
            onSubmit={form.handleSubmit(onSubmit)}
         >
            <PixelRatingInputText
               value={form.watch('rating')}
               onChange={v => form.setValue('rating', v)}
            />
            <TextareaWithValidations
               disabled={loading}
               placeholder="Коментар"
               name="comment"
               label="Коментар"
            />
            <Button
               loading={loading}
               type="submit"
               className="w-full mt-[15px]"
            >
               Додати
            </Button>
         </form>
      </FormProvider>
   );
};
