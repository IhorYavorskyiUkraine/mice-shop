'use client';

import { Container, Input, Overlay } from '@/components/ui';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { useQuery } from '@apollo/client';
import { useRef, useState } from 'react';
import { useClickAway, useDebounce } from 'react-use';
import { GET_ALL_PRODUCTS } from '../header.graphql';
import { SearchItem } from './search-item';

interface Props {
   data: { image?: string; name: string };
}

export const SearchTrigger: React.FC<Props> = ({ data }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [search, setSearch] = useState('');
   const [debouncedValue, setDebouncedValue] = useState('');

   const ref = useRef(null);

   useClickAway(ref, () => {
      onClose();
   });

   useDebounce(
      () => {
         setDebouncedValue(search);
      },
      300,
      [search],
   );

   const onClose = () => {
      setIsOpen(false);
      setSearch('');
   };

   const {
      data: products,
      loading,
      error,
   } = useQuery(GET_ALL_PRODUCTS, {
      variables: {
         args: {
            name: debouncedValue,
         },
      },
      skip: !debouncedValue,
   });

   return (
      <>
         <div>
            {isOpen ? (
               <>
                  <Drawer
                     open={isOpen}
                     direction="top"
                     onOpenChange={setIsOpen}
                  >
                     <DrawerContent className="py-md w-full flex items-center">
                        <Container className="w-full bg-primary">
                           <DrawerTitle className="sr-only">
                              Input search
                           </DrawerTitle>
                           <Input
                              ref={ref}
                              autoFocus
                              value={search}
                              placeholder="Пошук"
                              className="w-full !text-b uppercase text-secondary border-0 rounded-none py-4 text-lg"
                              onChange={e => setSearch(e.target.value)}
                              onKeyDown={e =>
                                 e.key === 'Enter' ||
                                 (e.key === 'Escape' && onClose())
                              }
                           />
                           <div>
                              {products?.getAllProducts.map((product: any) => (
                                 <SearchItem
                                    key={product.id}
                                    product={product}
                                 />
                              ))}
                           </div>
                        </Container>
                     </DrawerContent>
                  </Drawer>
               </>
            ) : (
               <img
                  onClick={() => setIsOpen(true)}
                  className="cursor-pointer h-6 w-6"
                  src={data.image}
                  alt={data.name}
               />
            )}
         </div>
         {isOpen && <Overlay />}
      </>
   );
};
