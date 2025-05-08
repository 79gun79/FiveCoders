import { create } from "zustand";

interface AuthStore {
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  accessToken: null,
  login: (accessToken: string) => set({ isLoggedIn: true, accessToken }),
  logout: () => set({ isLoggedIn: false, accessToken: null }),
}));
