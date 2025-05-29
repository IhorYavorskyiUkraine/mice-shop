import { cn } from '@/lib';
import { AlertTriangle } from 'lucide-react';

interface Props {
   title?: string;
   onRetry?: () => void;
   text?: string;
   className?: string;
}

export const ServerError: React.FC<Props> = ({
   title,
   onRetry,
   text,
   className,
}) => {
   return (
      <div
         className={cn(
            'w-full flex flex-col h-full items-center justify-center bg-red-50 border border-red-200 p-6 text-center shadow-sm',
            className,
         )}
      >
         <AlertTriangle className="w-10 h-10 text-red-500 mb-3" />
         <h3 className="text-lg font-semibold text-red-700">
            {title
               ? `Помилка завантаження секції: ${title}`
               : 'Сервер недоступний'}
         </h3>
         <p className="text-sm text-red-600 mt-1">
            {text
               ? text
               : 'Вибачте, не вдалося завантажити товари. Спробуйте пізніше або оновіть сторінку.'}
         </p>
         <button
            onClick={onRetry}
            className="mt-4 cursor-pointer px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
         >
            Повторити запит
         </button>
      </div>
   );
};
