import { create } from "zustand";

interface useMobileInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAuthModal = create<useMobileInterface>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
