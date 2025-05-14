import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthStore {
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      login: (accessToken: string) => set({ isLoggedIn: true, accessToken }),
      logout: () => set({ isLoggedIn: false, accessToken: null }),
    }),
    {
      name: 'auth-storage', // sessionStorage 내 key 이름
      storage: createJSONStorage(() => sessionStorage), // sessionStorage 사용
    },
  ),
);
