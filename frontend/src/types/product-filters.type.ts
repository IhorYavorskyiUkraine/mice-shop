interface PriceRange {
   min: number;
   max: number;
}

export interface ProductFilters {
   tags: string[];
   brands: string[];
   price: PriceRange;
   colors: string[];
   specs: string[];
   limit: number;
   offset: number;
   sort: [string, 'asc' | 'desc'];
}
