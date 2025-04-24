'use client';

import { Container, Logo } from '@/components/ui';
import { useAuthStore } from '@/lib/utils/useAuth/store';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cart } from '../cart/cart';
import { Modal } from './components/auth-modal/modal';
import { Burger } from './components/burger';
import { SearchTrigger } from './components/search-trigger';
import { links } from './header.data';

export const Header: React.FC = () => {
   const isAuthenticated = useAuthStore(state => state.isAuthenticated);
   const pathname = usePathname();
   const isProfilePage = pathname === '/profile';

   const renderProfileIcon = () => {
      if (!isAuthenticated && !isProfilePage) {
         return <Modal />;
      }

      if (isProfilePage) {
         return null;
      }

      return (
         <Link href="/profile">
            <Image
               width={24}
               height={24}
               src="/images/header/user.svg"
               alt="user"
               className="h-6 w-6 hover:opacity-80 transition"
            />
         </Link>
      );
   };

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
                  {renderProfileIcon()}
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
                  {renderProfileIcon()}
               </div>
            </div>
         </Container>
      </header>
   );
};
