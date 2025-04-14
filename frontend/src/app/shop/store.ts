'use client';

import { ProductFilters } from '@/types/product-filters.type';
import { create } from 'zustand';

type TShop = {
   filters: ProductFilters;
   setFilters: (filters: ProductFilters) => void;
};

export const useShopStore = create<TShop>(set => ({
   filters: {
      tags: [],
      brands: [],
      price: { min: 0, max: 0 },
      colors: [],
      specs: [],
      limit: 10,
      offset: 0,
   },
   setFilters: filters => {
      set({ filters });
   },
}));
