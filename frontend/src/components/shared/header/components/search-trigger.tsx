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

   const clearHistory = () => {
      setSearchHistory([]);
   };

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
            <div className="p-4 grid grid-cols-2 gap-4 md:px-[25px] md:py-[22px] md:flex md:gap-[25px] md:flex-wrap">
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
               Помилка при завантаженні товарів
            </p>
         );
      }

      if (shouldShowEmptyState) {
         return (
            <p className="py-sm text-center text-primary md:text-secondary">
               Товарів не знайдено за запитом <span>"{debouncedValue}"</span>
            </p>
         );
      }

      if (!debouncedValue.trim() && searchHistory.length > 0) {
         return (
            <div className="p-4 md:px-[25px] md:py-[22px]">
               <div className="text-sm flex justify-between font-medium text-gray-500">
                  <h3>Нещодавні запити</h3>
                  <button
                     onClick={clearHistory}
                     className="cursor-pointer uppercase"
                  >
                     Очистити
                  </button>
               </div>
               <div className="flex flex-wrap gap-2 pt-4 ">
                  {searchHistory.map((query, index) =>
                     query === '' ? null : (
                        <button
                           key={index}
                           onClick={() => {
                              setSearch(query);
                              setDebouncedValue(query);
                           }}
                           className="px-3 uppercase transition cursor-pointer py-1 bg-primary md:bg-secondary text-sm text-secondary md:text-primary hover:bg-[var(--hover-white)]"
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
            <div className="p-4 md:px-[25px] md:py-[22px]">
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
            Введіть запит для пошуку товарів
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
                                 className="w-full !text-b text-secondary border-0 rounded-none py-4 text-lg"
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
