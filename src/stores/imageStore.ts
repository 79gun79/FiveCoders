import { create } from 'zustand';

interface ImageStore {
  profileImage: File | string | undefined | null;
  setProfileImage: (image: File | string | undefined | null) => void;
}
interface PreviewImageStore {
  previewImage: File | string | undefined | null;
  setPrevImage: (image: File | string | undefined | null) => void;
}

export const useImageStore = create<ImageStore>((set) => ({
  profileImage: null,
  setProfileImage: (image) => set({ profileImage: image }),
}));

export const usePreviewImage = create<PreviewImageStore>((set) => ({
  previewImage: null,
  setPrevImage: (image) => set({ previewImage: image }),
}));
