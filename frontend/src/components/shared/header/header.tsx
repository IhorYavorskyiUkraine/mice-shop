import { Container, Logo } from '@/components/ui';
import Image from 'next/image';
import Link from 'next/link';
import { Cart } from '../cart/cart';
import { Modal } from './components/autentification-modal/modal';
import { Burger } from './components/burger';
import { SearchTrigger } from './components/search-trigger';
import { icons, links } from './header.data';

export const Header: React.FC = () => {
   const searchIcon = icons.find(icon => icon.name === 'search');

   return (
      <header className="bg-primary text-secondary sticky top-0 z-50">
         <Container className="py-[10px] md:py-5">
            {/* Mobile layout (3 columns) */}
            <div className="flex justify-between items-center md:hidden px-4 h-14">
               <div className="flex items-center gap-4">
                  <Burger />
                  {searchIcon && <SearchTrigger data={searchIcon} />}
               </div>

               <Logo />

               <div className="flex justify-end items-center gap-4">
                  {icons
                     .filter(icon => !['search', 'burger'].includes(icon.name))
                     .map(icon => (
                        <Image
                           width={24}
                           height={24}
                           src={icon.image}
                           alt={icon.name}
                           className="h-6 w-6"
                        />
                     ))}
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
                  {icons.map(icon => {
                     if (icon.name === 'search') {
                        return <SearchTrigger key={icon.name} data={icon} />;
                     }

                     if (icon.name === 'cart') {
                        return <Cart key={icon.name} />;
                     }

                     if (icon.name === 'user') {
                        return <Modal key={icon.name} />;
                     }
                  })}
               </div>
            </div>
         </Container>
      </header>
   );
};
