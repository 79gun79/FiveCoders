import { create } from 'zustand';
import { client } from '../services/axios';
import { User } from '../types/user';

interface SubscriptionState {
  subscribes: string[];
  setSubscribes: (subs: string[]) => void;
  syncSubscribes: () => Promise<void>;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscribes: [],
  setSubscribes: (subs) => set({ subscribes: subs }),
  syncSubscribes: async () => {
    const { data: user } = await client.get<User>('/auth-user');
    set({ subscribes: user.following.map((follow) => follow.user) });
  },
}));
