'use client';

import { Container, Input, Overlay } from '@/components/ui';
import {
   Carousel,
   CarouselContent,
   CarouselItem,
} from '@/components/ui/carousel';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { UniversalSkeleton } from '@/components/ui/universal-skeleton';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useDebounce, useMedia } from 'react-use';
import { GET_ALL_PRODUCTS } from '../header.graphql';
import { SearchItem } from './search-item';

interface Props {
   data: { image?: string; name: string };
}

export const SearchTrigger: React.FC<Props> = ({ data }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [search, setSearch] = useState('');
   const [debouncedValue, setDebouncedValue] = useState('');
   const [searchHistory, setSearchHistory] = useState<string[]>([]);
   const isMobile = useMedia('(max-width: 768px)', false);

   useDebounce(
      () => {
         setDebouncedValue(search);
         setSearchHistory(prev =>
            prev.includes(search.trim()) ? prev : [...prev, search.trim()],
         );
      },
      500,
      [search],
   );

   const onClose = () => {
      setIsOpen(false);
      setSearch('');
      setDebouncedValue('');
   };

   const {
      data: products,
      loading,
      error,
   } = useQuery(GET_ALL_PRODUCTS, {
      variables: {
         args: {
            name: debouncedValue.trim(),
         },
      },
      skip: !debouncedValue.trim(),
   });

   useEffect(() => {
      if (!isOpen) {
         setSearch('');
         setDebouncedValue('');
      }
   }, [isOpen]);

   useEffect(() => {
      const savedHistory = localStorage.getItem('searchHistory');
      if (savedHistory) {
         setSearchHistory(JSON.parse(savedHistory));
      }
   }, []);

   useEffect(() => {
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
   }, [searchHistory]);

   const hasQueryExecuted = !loading && !!debouncedValue.trim();
   const hasSearchResults = products?.getAllProducts?.length > 0;
   const shouldShowEmptyState = hasQueryExecuted && !hasSearchResults;

   const renderContent = () => {
      if (loading) {
         return (
            <div
               className={
                  isMobile
                     ? 'p-4 grid grid-cols-2 gap-4'
                     : 'px-[25px] py-[22px] flex gap-[25px] flex-wrap'
               }
            >
               {Array.from({ length: isMobile ? 6 : 4 }).map((_, i) => (
                  <div key={i}>
                     <UniversalSkeleton searchItems />
                  </div>
               ))}
            </div>
         );
      }

      if (error) {
         return (
            <p className="py-sm text-center text-primary md:text-secondary">
               ПОМИЛКА ЗАВАНТАЖЕННЯ
            </p>
         );
      }

      if (shouldShowEmptyState) {
         return (
            <p className="py-sm text-center text-primary md:text-secondary">
               ТОВАРИ НЕ ЗНАЙДЕНО
            </p>
         );
      }

      if (!debouncedValue.trim() && searchHistory.length > 0) {
         return (
            <div className={isMobile ? 'p-4' : 'px-[25px] py-[22px]'}>
               <h3 className="text-sm font-medium text-gray-500">
                  НЕЩОДАВНІ ЗАПИТИ
               </h3>
               <div className="flex flex-wrap gap-2 pt-4 ">
                  {searchHistory.map((query, index) =>
                     query === '' ? null : (
                        <button
                           key={index}
                           onClick={() => {
                              setSearch(query);
                              setDebouncedValue(query);
                           }}
                           className="px-3 cursor-pointer uppercase  py-1 bg-gray-100 text-sm text-gray-800 hover:bg-gray-200"
                        >
                           {query}
                        </button>
                     ),
                  )}
               </div>
            </div>
         );
      }

      if (hasSearchResults) {
         return (
            <div className={isMobile ? 'p-4' : 'px-[25px] py-[22px]'}>
               {isMobile ? (
                  <Carousel
                     opts={{
                        dragFree: true,
                     }}
                     onPointerDown={e => e.stopPropagation()}
                  >
                     <CarouselContent>
                        {products.getAllProducts.map((product: any) => (
                           <CarouselItem key={product.id} className="basis-1/2">
                              <SearchItem
                                 className="!text-primary"
                                 product={product}
                              />
                           </CarouselItem>
                        ))}
                     </CarouselContent>
                  </Carousel>
               ) : (
                  <div className="flex gap-[25px] flex-wrap">
                     {products.getAllProducts.map((product: any) => (
                        <SearchItem key={product.id} product={product} />
                     ))}
                  </div>
               )}
            </div>
         );
      }

      return (
         <div className="px-[25px] py-[22px] text-center text-secondary">
            ВВЕДІТЬ ЗАПИТ ДЛЯ ПОШУКУ ТОВАРІВ
         </div>
      );
   };

   return (
      <>
         <div>
            {isOpen ? (
               <>
                  {isMobile ? (
                     <Drawer
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        direction="left"
                     >
                        <DrawerTitle className="sr-only">
                           Input search
                        </DrawerTitle>
                        <DrawerContent className="w-full h-auto  bg-secondary">
                           <div className="flex flex-col h-full">
                              <div className="p-4 border-b border-gray-200">
                                 <Input
                                    autoFocus
                                    value={search}
                                    placeholder="ПОШУК"
                                    className="w-full !text-b text-gray-900 border-0 py-3 text-lg"
                                    onChange={e => setSearch(e.target.value)}
                                 />
                              </div>
                              <div className="flex-1 overflow-y-auto">
                                 {renderContent()}
                              </div>
                           </div>
                        </DrawerContent>
                     </Drawer>
                  ) : (
                     <Drawer
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        direction="top"
                     >
                        <DrawerContent className="py-md w-full flex items-center">
                           <Container className="px-0 w-full bg-primary">
                              <DrawerTitle className="sr-only">
                                 Input search
                              </DrawerTitle>
                              <Input
                                 autoFocus
                                 value={search}
                                 placeholder="Пошук"
                                 className="w-full !text-b uppercase text-secondary border-0 rounded-none py-4 text-lg"
                                 onChange={e => setSearch(e.target.value)}
                                 onKeyDown={e =>
                                    e.key === 'Escape' && onClose()
                                 }
                              />
                              {renderContent()}
                           </Container>
                        </DrawerContent>
                     </Drawer>
                  )}
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
