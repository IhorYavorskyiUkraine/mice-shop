import { Title } from '@/components/ui';
import { cn } from '@/lib';

interface Props {
   activeTab: boolean;
   setActiveTab: (activeTab: number) => void;
   text: string;
}

export const ProductTabsButton: React.FC<Props> = ({
   activeTab,
   setActiveTab,
   text,
}) => {
   return (
      <button
         className={cn(
            activeTab && 'border-b-[2px] border-primary',
            'cursor-pointer',
         )}
         onClick={() => setActiveTab(1)}
      >
         <Title className="text-md" text={text} />
      </button>
   );
};
