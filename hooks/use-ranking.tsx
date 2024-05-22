import { cardType } from "@/constants/constants";
import { rankingDataInterface } from "@/types/global-types";
import { create } from "zustand";

interface useMobileInterface {
  cardType: cardType | string;
  setCardType: (data: string) => void;
  filterType: cardType | string;
  setFilterType: (data: string) => void;
  data: rankingDataInterface[] | [];
  setData: (data: rankingDataInterface[]) => void;
  isLoading: boolean;
  setIsLoading: (data: boolean) => void;
}

export const useRankingModal = create<useMobileInterface>((set) => ({
  cardType: "Overall",
  isLoading: false,
  data: [],
  setCardType: (data: string) => set({ cardType: data }),
  filterType: "Rating",
  setFilterType: (data: string) => set({ filterType: data }),
  setData: (data) => set({ data }),
  setIsLoading: (data: boolean) => set({ isLoading: data }),
}));
