import { cn } from '@/lib';
import Link from 'next/link';

interface Props {
   className?: string;
}

export const Logo: React.FC<Props> = ({ className }) => {
   return (
      <Link href="/">
         <h2
            className={cn(
               className,
               'md:text-[32px]! text-m2 md:font-medium whitespace-nowrap',
            )}
         >
            PIXELMOUSE
         </h2>
      </Link>
   );
};
