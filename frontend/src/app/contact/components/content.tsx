import Image from 'next/image';
import Link from 'next/link';
import { contentData } from './content.data';

export const Content: React.FC = () => {
   return (
      <div className="grid py-[130px] items-center justify-center grid-cols-1 lg:grid-cols-2 gap-4 text-[52px]">
         <h1 className="text-center lg:text-left">
            Вiдправлення замовлення здiйснюється протягом години пiсля покупки з
            10:00 до 23:00 без вихiдних.
         </h1>
         <div className="text-center">
            <p>Kонтакти:</p>
            <p>+38 (096) 666 03 76</p>
            <p className="py-sm text-[36px]">Або</p>
            <ul className="flex justify-center gap-[100px]">
               {contentData.map(item => (
                  <li key={item.id}>
                     <Link href={item.link}>
                        <Image
                           width={56}
                           height={56}
                           src={item.icon}
                           alt={item.name}
                        />
                     </Link>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};
