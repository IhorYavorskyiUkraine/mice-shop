'use client';

import { CheckboxWithText } from '@/components/shared';
import { DualRangeSlider, ErrorMessage } from '@/components/ui';
import { useQuery } from '@apollo/client';
import qs from 'qs';
import { useEffect, useState } from 'react';
import { useDebounce, useSet } from 'react-use';
import { useShopStore } from '../../store';
import { sidebarData } from './sidebar-data.data';
import { GET_PRODUCT_FILTERS } from './sidebar-data.graphql';
import { SidebarItem } from './sidebar-item';

type ParsedQueryParams = {
   brands?: string | string[];
   colors?: string | string[];
   price?: { min?: string; max?: string } | string;
};

export const Sidebar: React.FC = () => {
   const [priceValues, setPriceValues] = useState<[number, number]>([0, 0]);
   const [debouncedPrice, setDebouncedPrice] = useState<[number, number]>([
      0, 0,
   ]);

   const [, { has: isSectionExpanded, toggle: toggleSection }] = useSet(
      new Set(['price', 'brand', 'color']),
   );

   const [
      selectedBrands,
      { has: hasBrand, toggle: toggleBrand, add: addBrand, reset: resetBrands },
   ] = useSet<string>(new Set());

   const [
      selectedColors,
      { has: hasColor, toggle: toggleColor, add: addColor, reset: resetColors },
   ] = useSet<string>(new Set());

   const filters = useShopStore(state => state.filters);
   const setFilters = useShopStore(state => state.setFilters);

   const { data, error } = useQuery(GET_PRODUCT_FILTERS);

   useEffect(() => {
      const parsed = qs.parse(window.location.search, {
         ignoreQueryPrefix: true,
         comma: true,
      }) as ParsedQueryParams;

      if (parsed.brands) {
         resetBrands();
         const brands = Array.isArray(parsed.brands)
            ? parsed.brands
            : [parsed.brands];
         brands.forEach(brand => addBrand(String(brand)));
      }

      if (parsed.colors) {
         resetColors();
         const colors = Array.isArray(parsed.colors)
            ? parsed.colors
            : [parsed.colors];
         colors.forEach(color => addColor(String(color)));
      }

      if (parsed.price) {
         let min = 0;
         let max = 1000;

         if (typeof parsed.price === 'object' && !Array.isArray(parsed.price)) {
            min = parsed.price.min ? Number(parsed.price.min) : min;
            max = parsed.price.max ? Number(parsed.price.max) : max;
         }

         setPriceValues([min, max]);
         setDebouncedPrice([min, max]);
      }
   }, [data, addBrand, addColor, resetBrands, resetColors]);

   useDebounce(
      () => {
         setDebouncedPrice(priceValues);
      },
      500,
      [priceValues],
   );

   useEffect(() => {
      setFilters({
         ...filters,
         brands: Array.from(selectedBrands),
         colors: Array.from(selectedColors),
         price: {
            min: debouncedPrice[0],
            max: debouncedPrice[1],
         },
      });
   }, [selectedBrands, selectedColors, debouncedPrice, setFilters]);

   useEffect(() => {
      if (data?.getAllProductFilters?.price) {
         const serverMin = data.getAllProductFilters.price.min;
         const serverMax = data.getAllProductFilters.price.max;

         if (priceValues[0] === 0 && priceValues[1] === 0) {
            setPriceValues([serverMin, serverMax]);
            setDebouncedPrice([serverMin, serverMax]);
         }
      }
   }, [data, priceValues]);

   const handlePriceChange = (newValues: [number, number]) => {
      setPriceValues(newValues);
   };

   if (error) {
      return <ErrorMessage message={error.message} />;
   }

   const renderSectionContent = (name: string) => {
      switch (name) {
         case 'price':
            return (
               <DualRangeSlider
                  label={value => <span>${value}</span>}
                  labelPosition="top"
                  min={data?.getAllProductFilters?.price.min || 0}
                  max={data?.getAllProductFilters?.price.max || 1000}
                  value={priceValues}
                  onValueChange={handlePriceChange}
                  step={1}
               />
            );
         case 'brand':
            return (
               <div className="flex flex-col space-y-2 max-h-[286px] overflow-y-auto">
                  {data?.getAllProductFilters?.brands?.map((brand: string) => (
                     <CheckboxWithText
                        key={brand}
                        text={brand}
                        checked={hasBrand(brand)}
                        onCheckedChange={() => toggleBrand(brand)}
                     />
                  ))}
               </div>
            );
         case 'color':
            return (
               <div className="flex flex-col space-y-2 max-h-[286px] overflow-y-auto">
                  {data?.getAllProductFilters?.colors?.map((color: string) => (
                     <CheckboxWithText
                        key={color}
                        text={color}
                        checked={hasColor(color)}
                        onCheckedChange={() => toggleColor(color)}
                     />
                  ))}
               </div>
            );
         default:
            return null;
      }
   };

   return (
      <aside className="p-[10px] hidden lg:block sticky top-[108px] z-40 border-2 border-black">
         {sidebarData.map(
            (item, index) =>
               item && (
                  <div key={item.id}>
                     <SidebarItem
                        title={item.title}
                        open={isSectionExpanded(item.name)}
                        setOpen={() => toggleSection(item.name)}
                        content={renderSectionContent(item.name)}
                     />
                     {index !== sidebarData.length - 1 && (
                        <div className="w-full h-[2px] bg-black" />
                     )}
                  </div>
               ),
         )}
      </aside>
   );
};
