import { create } from 'zustand';

interface ModalState {
  isLogInOpen: boolean;
  isLogOutOpen: boolean;

  isLogInModal: (isOpen: boolean) => void;
  isLogOutModal: (isOpen: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isLogInOpen: false,
  isLogOutOpen: false,

  isLogInModal: (isOpen) => set({ isLogInOpen: isOpen }),
  isLogOutModal: (isOpen) => set({ isLogOutOpen: isOpen }),
}));
