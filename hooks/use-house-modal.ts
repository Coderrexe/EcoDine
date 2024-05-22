import { create } from "zustand";

interface useMobileInterface {
  isOpen: boolean;
  hasHouse: boolean;
  sethasHouse: (data: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const useHouseModal = create<useMobileInterface>((set) => ({
  isOpen: false,
  hasHouse: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
  sethasHouse: (data: boolean) => set({ hasHouse: data }),
}));
