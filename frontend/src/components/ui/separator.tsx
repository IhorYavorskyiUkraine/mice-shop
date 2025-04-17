import { cn } from '@/lib';

interface Props {
   className?: string;
}

export const Separator: React.FC<Props> = ({ className }) => {
   return (
      <div className={cn(className, 'my-sm w-full h-[2px] bg-primary')}></div>
   );
};
