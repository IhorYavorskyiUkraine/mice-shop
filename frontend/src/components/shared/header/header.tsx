import { Container } from '@/components/ui';
import Link from 'next/link';
import { Burger } from './components/burger';
import { SearchTrigger } from './components/search-trigger';
import { icons, links } from './header.data';

export const Header: React.FC = () => {
   const searchIcon = icons.find(icon => icon.name === 'search');

   return (
      <header className="bg-primary text-secondary sticky top-0 z-50">
         <Container className="py-sm md:py-6">
            {/* Mobile layout (3 columns) */}
            <div className="grid grid-cols-3 items-center md:hidden">
               <div className="flex items-center gap-4">
                  <Burger />
                  {searchIcon && <SearchTrigger data={searchIcon} />}
               </div>

               <h2 className="text-m2 text-center whitespace-nowrap">
                  PIXELMOUSE
               </h2>

               <div className="flex justify-end gap-4">
                  {icons
                     .filter(icon => !['search', 'burger'].includes(icon.name))
                     .map(icon => (
                        <Link key={icon.name} href={icon.url || '#'}>
                           <img
                              src={icon.image}
                              alt={icon.name}
                              className="h-6 w-6"
                           />
                        </Link>
                     ))}
               </div>
            </div>

            {/* Desktop layout (3 columns) */}
            <div className="hidden md:grid grid-cols-[minmax(160px,auto)_1fr_minmax(160px,auto)] items-center gap-8">
               <h2 className="text-l font-medium whitespace-nowrap">
                  PIXELMOUSE
               </h2>

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
                  {icons.map(icon =>
                     icon.name === 'search' ? (
                        <SearchTrigger key={icon.name} data={icon} />
                     ) : (
                        <Link key={icon.name} href={icon.url || '#'}>
                           <img
                              src={icon.image}
                              alt={icon.name}
                              className="h-6 w-6 hover:opacity-80 transition"
                           />
                        </Link>
                     ),
                  )}
               </div>
            </div>
         </Container>
      </header>
   );
};
