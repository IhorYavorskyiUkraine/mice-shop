import { cn } from '@/lib';

interface IErrorMessageProps {
   message?: string;
   className?: string;
}

export const ErrorMessage = ({
   message = 'сталася помилка',
   className = '',
}: IErrorMessageProps) => {
   return (
      <div className={cn('text-center py-10 text-red-500', className)}>
         {message}
      </div>
   );
};
