'use client';

import { ServerError } from '@/components/shared/errors/server-error';
import { Button } from '@/components/ui';
import { renderSectionContent } from './sidebar-content-render';
import { sidebarData } from './sidebar-data.data';
import { SidebarItem } from './sidebar-item';
import { useSidebarFilters } from './use-sidebar-filters';

export const Sidebar: React.FC = () => {
   const {
      changePriceInput,
      priceValues,
      minInput,
      maxInput,
      hasBrand,
      handlePriceChange,
      toggleBrand,
      hasColor,
      toggleColor,
      data,
      isSectionExpanded,
      toggleSection,
      resetAll,
      applyPriceFilter,
      changed,
      loading,
      error,
      refetch,
   } = useSidebarFilters();

   const content = (name: string) =>
      renderSectionContent(
         name,
         data,
         priceValues,
         minInput,
         maxInput,
         changePriceInput,
         applyPriceFilter,
         handlePriceChange,
         hasBrand,
         toggleBrand,
         hasColor,
         toggleColor,
      );

   if (error) {
      if (error?.networkError) {
         return (
            <ServerError
               className="hidden lg:flex"
               text="Вибачте, не вдалося завантажити фільтри. Спробуйте пізніше або оновіть сторінку."
               onRetry={() => {
                  refetch().catch(err => {
                     console.error('Помилка повторної спроби:', err.message);
                  });
               }}
            />
         );
      }
   }

   return (
      <aside className="p-[10px] hidden lg:block sticky top-[108px] z-40 border-2 border-black">
         {sidebarData.map(
            (item, index) =>
               item && (
                  <div key={item.id}>
                     <SidebarItem
                        key={item.id}
                        title={item.title}
                        open={loading ? false : isSectionExpanded(item.name)}
                        setOpen={() => toggleSection(item.name)}
                        content={content(item.name)}
                        loading={loading}
                     />
                     {index !== sidebarData.length - 1 && (
                        <div className="w-full h-[2px] bg-black" />
                     )}
                  </div>
               ),
         )}
         {!loading && changed ? (
            <Button className="w-full mt-[10px]" onClick={resetAll}>
               Очистити
            </Button>
         ) : null}
      </aside>
   );
};
