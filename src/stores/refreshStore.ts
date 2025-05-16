import { create } from 'zustand';

type RefreshStore = {
  refresh: number;
  do: () => void;
  reset: () => void;
};

export const useRefreshStore = create<RefreshStore>((set) => ({
  refresh: 0,
  do: () => set({ refresh: 1 }),
  reset: () => set({ refresh: 0 }),
}));
