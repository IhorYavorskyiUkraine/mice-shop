import { create } from 'zustand';

type AuthStore = {
   isAuthenticated: boolean;
   userId: string | null;
   setAuth: (auth: { isAuthenticated: boolean; userId: string | null }) => void;
};

export const useAuthStore = create<AuthStore>(set => ({
   isAuthenticated: false,
   userId: null,
   setAuth: ({ isAuthenticated, userId }) => set({ isAuthenticated, userId }),
}));
