import { create } from 'zustand';

type ProductStore = {
   error: any | null;
   setError: (error: any) => void;
};

export const useProductStore = create<ProductStore>(set => ({
   error: null,
   setError: error => set({ error }),
}));
