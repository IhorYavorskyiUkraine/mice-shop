import { Container, Logo } from '@/components/ui';
import Link from 'next/link';
import { footerData } from './footer.data';

export const Footer: React.FC = () => {
   return (
      <footer className="bg-primary text-secondary py-md">
         <Container className="grid md:grid-cols-3 gap-4">
            <div>
               <Logo className="mb-sm" />
               <p className="mb-sm">
                  Мишки для геймерів, що не залишають шансів суперникам.
               </p>
               <div className="flex gap-6 mb-sm">
                  <Link href="">
                     <img src="/images/footer/Tiktok.svg" alt="TikTok" />
                  </Link>
                  <Link href="">
                     <img src="/images/footer/instagram.svg" alt="Instagram" />
                  </Link>
               </div>
               <p>© 2024 PIXELMOUSE. Усі права захищені.</p>
            </div>
            <div className="md:col-span-2 flex gap-4 md:gap-8">
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
         </Container>
      </footer>
   );
};
