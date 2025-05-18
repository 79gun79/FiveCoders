import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useSubscriptionStore } from './subscriptionStore';

interface AuthStore {
  isLoggedIn: boolean;
  isAdmin: boolean;
  accessToken: string | null;
  login: (accessToken: string, isAdmin: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      isAdmin: false,
      accessToken: null,
      login: (accessToken, isAdmin) =>
        set({ isLoggedIn: true, isAdmin, accessToken }),
      logout: () => {
        set({ isLoggedIn: false, isAdmin: false, accessToken: null });
        //구독 상태 초기화
        useSubscriptionStore.getState().setSubscribes([]);
      },
    }),
    {
      name: 'auth-storage', // sessionStorage 내 key 이름
      storage: createJSONStorage(() => sessionStorage), // sessionStorage 사용
    },
  ),
);
