'use client';

import { Button, ErrorMessage } from '@/components/ui';
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
      error,
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

   if (error) return <ErrorMessage message={error.message} />;

   return (
      <aside className="p-[10px] hidden lg:block sticky top-[108px] z-40 border-2 border-black">
         {sidebarData.map(
            (item, index) =>
               item && (
                  <div key={item.id}>
                     <SidebarItem
                        key={item.id}
                        title={item.title}
                        open={isSectionExpanded(item.name)}
                        setOpen={() => toggleSection(item.name)}
                        content={content(item.name)}
                     />
                     {index !== sidebarData.length - 1 && (
                        <div className="w-full h-[2px] bg-black" />
                     )}
                  </div>
               ),
         )}
         {changed ? (
            <Button className="w-full mt-[10px]" onClick={resetAll}>
               Очистити
            </Button>
         ) : null}
      </aside>
   );
};
