import { create } from "zustand";

interface useMobileInterface {
  isOpen: boolean;
  hasCollege: boolean;
  sethasCollege: (data: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const useCollegeModal = create<useMobileInterface>((set) => ({
  isOpen: false,
  hasCollege: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
  sethasCollege: (data: boolean) => set({ hasCollege: data }),
}));
