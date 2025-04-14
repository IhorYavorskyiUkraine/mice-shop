'use client';

import { CheckboxWithText } from '@/components/shared';
import { DualRangeSlider, ErrorMessage } from '@/components/ui';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useDebounce, useSet } from 'react-use';
import { useShopStore } from '../../store';
import { sidebarData } from './sidebar-data.data';
import { GET_PRODUCT_FILTERS } from './sidebar-data.graphql';
import { SidebarItem } from './sidebar-item';

export const Sidebar: React.FC = () => {
   const [values, setValues] = useState([0, 0]);
   const [debouncedValue, setDebouncedValue] = useState([0, 0]);

   const [, { has, toggle }] = useSet(new Set(['price', 'brand', 'color']));
   const [brands, { has: brandHas, toggle: brandToggle }] = useSet<string>(
      new Set([]),
   );
   const [colors, { has: colorsHas, toggle: colorsToggle }] = useSet<string>(
      new Set([]),
   );

   const setFilters = useShopStore(state => state.setFilters);

   const { data, error } = useQuery(GET_PRODUCT_FILTERS);

   useDebounce(
      () => {
         setDebouncedValue(values);
         setValues(values);
      },
      500,
      [values],
   );

   useEffect(() => {
      setFilters({
         tags: [],
         brands: Array.from(brands),
         price: { min: debouncedValue[0], max: debouncedValue[1] },
         colors: Array.from(colors),
         specs: [],
      });
   }, [brands, colors, debouncedValue, setFilters]);

   useEffect(() => {
      if (data?.getAllProductFilters?.price) {
         setValues([
            data.getAllProductFilters.price.min,
            data.getAllProductFilters.price.max,
         ]);
      }
   }, [data]);

   if (error) return <ErrorMessage message={error.message} />;

   const getContent = (name: string) => {
      if (name === 'price') {
         return (
            <DualRangeSlider
               label={value => <span>${value}</span>}
               labelPosition="top"
               min={data?.getAllProductFilters.price.min || 0}
               max={data?.getAllProductFilters.price.max || 1000}
               value={values}
               onValueChange={setValues}
               step={1}
            />
         );
      } else if (name === 'brand') {
         return (
            <div className="flex space-y-2 flex-col">
               {data?.getAllProductFilters.brands.map((brand: string) => (
                  <CheckboxWithText
                     key={brand}
                     text={brand}
                     checked={brandHas(brand)}
                     onCheckedChange={() => brandToggle(brand)}
                  />
               ))}
            </div>
         );
      } else if (name === 'color') {
         return (
            <div className="flex space-y-2 flex-col">
               {data?.getAllProductFilters.colors.map((color: string) => (
                  <CheckboxWithText
                     key={color}
                     text={color}
                     checked={colorsHas(color)}
                     onCheckedChange={() => colorsToggle(color)}
                  />
               ))}
            </div>
         );
      }
   };

   return (
      <aside className="p-[10px] hidden lg:block sticky top-[88px] z-40 border border-[2px] border-black">
         {sidebarData.map(
            (item, i) =>
               item && (
                  <div key={item.id}>
                     <SidebarItem
                        title={item.title}
                        open={has(item.name)}
                        setOpen={() => toggle(item.name)}
                        content={getContent(item.name)}
                     />
                     {i !== sidebarData.length - 1 && (
                        <div className="w-full h-[2px] bg-black"></div>
                     )}
                  </div>
               ),
         )}
      </aside>
   );
};
