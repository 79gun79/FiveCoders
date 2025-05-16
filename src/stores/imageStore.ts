import { create } from 'zustand';

interface ImageStore {
  profileImage: File | string | undefined | null;
  setProfileImage: (image: File | string | undefined | null) => void;
}

export const useImageStore = create<ImageStore>((set) => ({
  profileImage: null,
  setProfileImage: (image) => set({ profileImage: image }),
}));
