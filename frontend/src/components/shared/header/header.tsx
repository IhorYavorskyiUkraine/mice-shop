import { Container, Logo } from '@/components/ui';
import Link from 'next/link';
import { Cart } from '../cart/cart';
import { Modal } from './components/auth-modal/modal';
import { Burger } from './components/burger';
import { SearchTrigger } from './components/search-trigger';
import { links } from './header.data';

export const Header: React.FC = () => {
   return (
      <header className="bg-primary text-secondary sticky top-0 z-50">
         <Container className="py-[10px] md:py-5">
            {/* Mobile layout (3 columns) */}
            <div className="flex justify-between items-center md:hidden px-4 h-14">
               <div className="flex items-center gap-4">
                  <Burger />
                  <SearchTrigger />
               </div>

               <Logo />

               <div className="flex justify-end items-center gap-4">
                  <Cart />
                  <Modal />
               </div>
            </div>

            {/* Desktop layout (3 columns) */}
            <div className="hidden md:grid grid-cols-[minmax(160px,auto)_1fr_minmax(160px,auto)] items-center gap-8">
               <Logo />

               <nav className="flex justify-center">
                  <ul className="flex gap-8 xl:gap-12">
                     {links.map(link => (
                        <li
                           key={link.name}
                           className="hover:text-[var(--hover-white)] transition"
                        >
                           <Link
                              href={link.path}
                              className="text-default xl:text-base"
                           >
                              {link.name}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </nav>

               <div className="flex justify-end gap-6">
                  <SearchTrigger />
                  <Cart />
                  <Modal />
               </div>
            </div>
         </Container>
      </header>
   );
};
