import { useShopStore } from '@/app/shop/store';
import { useQuery } from '@apollo/client';
import qs from 'qs';
import { useEffect, useState } from 'react';
import { useDebounce, useSet } from 'react-use';
import { GET_PRODUCT_FILTERS } from './sidebar-data.graphql';

type ParsedQueryParams = {
   brands?: string | string[];
   colors?: string | string[];
   price?: { min?: string; max?: string } | string;
};

const useFilterSet = (initialSet = new Set<string>()) => {
   const [set, { has, toggle, add, reset }] = useSet<string>(initialSet);
   return { set, has, toggle, add, reset };
};

export const useSidebarFilters = () => {
   const [priceValues, setPriceValues] = useState<[number, number]>([0, 0]);
   const [debouncedPrice, setDebouncedPrice] = useState<[number, number]>([
      0, 0,
   ]);
   const [changed, setChanged] = useState(false);

   const [, { has: isSectionExpanded, toggle: toggleSection }] = useSet(
      new Set(['price', 'brand', 'color']),
   );

   const {
      set: selectedBrands,
      has: hasBrand,
      toggle: toggleBrand,
      add: addBrand,
      reset: resetBrands,
   } = useFilterSet(new Set());

   const {
      set: selectedColors,
      has: hasColor,
      toggle: toggleColor,
      add: addColor,
      reset: resetColors,
   } = useFilterSet(new Set());

   const filters = useShopStore(state => state.filters);
   const setFilters = useShopStore(state => state.setFilters);

   const { data, error } = useQuery(GET_PRODUCT_FILTERS);

   const getPriceRange = () => ({
      min: data?.getAllProductFilters?.price.min ?? 0,
      max: data?.getAllProductFilters?.price.max ?? 1000,
   });

   const resetAll = () => {
      resetBrands();
      resetColors();
      const { min, max } = getPriceRange();
      setPriceValues([min, max]);
   };

   const isChanged = () => {
      const { min: serverMin, max: serverMax } = getPriceRange();
      const priceChanged =
         priceValues[0] !== serverMin || priceValues[1] !== serverMax;

      setChanged(
         selectedBrands.size > 0 || selectedColors.size > 0 || priceChanged,
      );
   };

   const parseArrayParam = (param: string | string[] | undefined): string[] => {
      if (!param) return [];
      return Array.isArray(param) ? param : [param];
   };

   const parsePriceParam = (priceParam: ParsedQueryParams['price']) => {
      let min = 0;
      let max = 1000;

      if (typeof priceParam === 'object' && !Array.isArray(priceParam)) {
         min = priceParam?.min ? Number(priceParam.min) : min;
         max = priceParam?.max ? Number(priceParam.max) : max;
      }

      return { min, max };
   };

   useEffect(() => {
      const parsed = qs.parse(window.location.search, {
         ignoreQueryPrefix: true,
         comma: true,
      }) as ParsedQueryParams;

      if (parsed.brands) {
         resetBrands();
         parseArrayParam(parsed.brands).forEach(brand =>
            addBrand(String(brand)),
         );
      }

      if (parsed.colors) {
         resetColors();
         parseArrayParam(parsed.colors).forEach(color =>
            addColor(String(color)),
         );
      }

      if (parsed.price) {
         const { min, max } = parsePriceParam(parsed.price);
         setPriceValues([min, max]);
         setDebouncedPrice([min, max]);
      }
   }, [data]);

   useDebounce(() => setDebouncedPrice(priceValues), 500, [priceValues]);

   useEffect(() => {
      setFilters({
         ...filters,
         brands: Array.from(selectedBrands),
         colors: Array.from(selectedColors),
         price: {
            min: debouncedPrice[0],
            max: debouncedPrice[1],
         },
         offset: 0,
      });

      isChanged();
   }, [selectedBrands, selectedColors, debouncedPrice]);

   useEffect(() => {
      if (data?.getAllProductFilters?.price) {
         const { min: serverMin, max: serverMax } = getPriceRange();

         if (priceValues[0] === 0 && priceValues[1] === 0) {
            setPriceValues([serverMin, serverMax]);
            setDebouncedPrice([serverMin, serverMax]);
         }
      }
   }, [data]);

   return {
      priceValues,
      setPriceValues,
      hasBrand,
      toggleBrand,
      hasColor,
      toggleColor,
      isSectionExpanded,
      toggleSection,
      resetAll,
      isChanged,
      changed,
      data,
      error,
   };
};
