import { Drawer } from '@/components/shared/drawer';
import { Button, ErrorMessage } from '@/components/ui';
import {
   DrawerContent,
   DrawerHeader,
   DrawerTitle,
} from '@/components/ui/drawer';
import { ListFilterPlus } from 'lucide-react';
import { renderSectionContent } from './sidebar-content-render';
import { sidebarData } from './sidebar-data.data';
import { SidebarItem } from './sidebar-item';
import { useSidebarFilters } from './use-sidebar-filters';

export const SidebarMobile: React.FC = () => {
   const {
      changePriceInput,
      priceValues,
      minInput,
      maxInput,
      applyPriceFilter,
      handlePriceChange,
      hasBrand,
      toggleBrand,
      hasColor,
      toggleColor,
      data,
      isSectionExpanded,
      toggleSection,
      resetAll,
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
      <div className="flex lg:hidden">
         <Drawer icon={<ListFilterPlus />}>
            <DrawerContent className="bg-secondary p-4 flex flex-col h-full">
               <DrawerHeader>
                  <DrawerTitle className="sr-only">Фільтри</DrawerTitle>
               </DrawerHeader>
               <div className="flex flex-col flex-1">
                  {sidebarData.map(item => (
                     <SidebarItem
                        key={item.id}
                        title={item.title}
                        open={isSectionExpanded(item.name)}
                        setOpen={() => toggleSection(item.name)}
                        content={content(item.name)}
                     />
                  ))}
                  {changed && (
                     <Button className="w-full mt-auto" onClick={resetAll}>
                        Очистити
                     </Button>
                  )}
               </div>
            </DrawerContent>
         </Drawer>
      </div>
   );
};
