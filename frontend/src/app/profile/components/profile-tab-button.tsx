import Image from 'next/image';

interface Props {
   id: number;
   icon: string;
   name: string;
   setActiveTab: (tab: number) => void;
}

export const ProfileTabButton: React.FC<Props> = ({
   id,
   name,
   icon,
   setActiveTab,
}) => {
   return (
      <button
         onClick={() => setActiveTab(id)}
         className=" uppercase cursor-pointer"
      >
         <div className="flex items-center gap-2">
            <Image width={24} height={24} src={icon} alt={name} />
            <span className="text-m1">{name}</span>
         </div>
      </button>
   );
};
