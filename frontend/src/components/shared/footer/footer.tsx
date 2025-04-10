import { Container, Logo } from '@/components/ui';
import Image from 'next/image';
import Link from 'next/link';
import { footerData } from './footer.data';

export const Footer: React.FC = () => {
   return (
      <footer className="bg-primary text-secondary py-md">
         <Container className="grid md:grid-cols-2 md:gap-[100px]">
            <div className="max-w-[400px]">
               <Logo className="mb-sm" />
               <p className="mb-sm">
                  Мишки для геймерів, що не залишають шансів суперникам.
               </p>
               <div className="flex gap-6 mb-sm">
                  <Link href="/">
                     <Image
                        width={30}
                        height={30}
                        src="/images/footer/Tiktok.svg"
                        alt="TikTok"
                     />
                  </Link>
                  <Link href="/">
                     <Image
                        width={30}
                        height={30}
                        src="/images/footer/instagram.svg"
                        alt="Instagram"
                     />
                  </Link>
               </div>
               <p className="hidden md:block">
                  © 2024 PIXELMOUSE. Усі права захищені.
               </p>
            </div>
            <div className="flex gap-4 md:gap-8 mb-sm md:mb-0">
               {footerData.map(data => (
                  <div key={data.title}>
                     <h3 className="text-m2 mb-sm">{data.title}</h3>
                     <ul className="flex flex-col gap-2">
                        {data.items.map(item => (
                           <Link href={item.link} key={item.title}>
                              <li key={item.title}>{item.title}</li>
                           </Link>
                        ))}
                     </ul>
                  </div>
               ))}
            </div>
            <p className="block md:hidden text-t1">
               © 2024 PIXELMOUSE. Усі права захищені.
            </p>
         </Container>
      </footer>
   );
};
