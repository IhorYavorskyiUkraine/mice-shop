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
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [debouncedPrice, setDebouncedPrice] = useState<[number, number]>([
      0, 0,
   ]);
   const [changed, setChanged] = useState(false);
   const [minInput, setMinInput] = useState(0);
   const [maxInput, setMaxInput] = useState(0);

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
      setMinInput(min);
      setMaxInput(max);
   };

   const isChanged = () => {
      const { min: serverMin, max: serverMax } = getPriceRange();
      const priceChanged = minInput !== serverMin || maxInput !== serverMax;

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
         offset: 0,
      });

      isChanged();
   }, [selectedBrands, selectedColors]);

   const applyPriceFilter = () => {
      const { min: serverMin, max: serverMax } = getPriceRange();

      let finalMin = minInput;
      let finalMax = maxInput;

      finalMin = Math.max(finalMin, serverMin);
      finalMax = Math.min(finalMax, serverMax);

      if (finalMin > finalMax) {
         finalMin = finalMax = Math.min(finalMin, serverMax);
      }

      setMinInput(finalMin);
      setMaxInput(finalMax);
      setPriceValues([finalMin, finalMax]);

      setFilters({
         ...filters,
         price: {
            min: finalMin,
            max: finalMax,
         },
         offset: 0,
      });

      isChanged();
   };

   const handlePriceChange = (value: [number, number]) => {
      let [min, max] = value;
      const { min: serverMin, max: serverMax } = getPriceRange();

      if (min > max) [min, max] = [max, min];

      const clampedMin = Math.max(min, serverMin);
      const clampedMax = Math.min(max, serverMax);

      setPriceValues([clampedMin, clampedMax]);
      setMinInput(clampedMin);
      setMaxInput(clampedMax);
   };

   const changePriceInput = (
      e: React.ChangeEvent<HTMLInputElement>,
      type: 'min' | 'max',
   ) => {
      const value = +e.target.value;
      if (value < 0 || isNaN(value)) return;
      if (type === 'min') {
         setMinInput(value);
      } else if (type === 'max') {
         setMaxInput(value);
      }
   };

   useEffect(() => {
      if (data?.getAllProductFilters?.price) {
         const { min: serverMin, max: serverMax } = getPriceRange();
         setPriceValues([serverMin, serverMax]);
         setMinInput(serverMin);
         setMaxInput(serverMax);
      }
   }, [data]);

   return {
      changePriceInput,
      priceValues,
      handlePriceChange,
      applyPriceFilter,
      minInput,
      maxInput,
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
