import { create } from 'zustand';

interface SubscriptionState {
  subscribes: string[];
  setSubscribes: (subs: string[]) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscribes: [],
  setSubscribes: (subs) => set({ subscribes: subs }),
}));
