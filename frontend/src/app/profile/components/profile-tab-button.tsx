import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface Props {
   id: number;
   icon: string;
   name: string;
   setActiveTab: (tab: number) => void;
   arrow?: boolean;
   active: boolean; // Активность таба
}

export const ProfileTabButton: React.FC<Props> = ({
   id,
   name,
   icon,
   setActiveTab,
   arrow,
   active,
}) => {
   return (
      <button
         onClick={() => setActiveTab(id)}
         className="uppercase cursor-pointer w-full lg:w-auto"
      >
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
               <Image width={24} height={24} src={icon} alt={name} />
               <span className="text-m1">{name}</span>
            </div>
            {arrow && <ChevronDown className={active ? 'rotate-180' : ''} />}
         </div>
      </button>
   );
};
