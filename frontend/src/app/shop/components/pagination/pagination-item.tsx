import { cn } from '@/lib';

interface Props {
   page?: number;
   icon?: React.ReactNode;
   active?: boolean;
   disabled?: boolean;
   onClick: () => void;
}

export const PaginationItem: React.FC<Props> = ({
   page,
   active,
   onClick,
   icon,
   disabled,
}) => {
   return (
      <div
         onClick={onClick}
         className={cn(
            active ? 'bg-primary text-secondary' : 'bg-secondary text-primary',
            'size-10 flex items-center justify-center cursor-pointer border-[2px] border-primary',
            disabled && 'cursor-not-allowed opacity-50',
         )}
      >
         {page ? page : icon}
      </div>
   );
};
