import type { foodTiming } from "@prisma/client";

export interface tabsInterface {
  id: number;
  value: foodTiming;
  label: string;
}

export type RankingType = "Wastage" | "Rating";
export type cardType = "Overall" | "7Days";

interface mentionOptionsInterface {
  id: number;
  label: RankingType;
}

interface cardOptionsInterface {
  id: number;
  label: cardType;
}

export const tabsData: tabsInterface[] = [
  { id: 45674567, value: "LUNCH", label: "Lunch" },
  { id: 345345, value: "DINNER", label: "Dinner" },
];

export const mentionOptions: mentionOptionsInterface[] = [
  {
    id: 56856789,
    label: "Rating",
  },
  {
    id: 5688456,
    label: "Wastage",
  },
];

export const cardOptions: cardOptionsInterface[] = [
  {
    id: 678568,
    label: "Overall",
  },
  {
    id: 2325626,
    label: "7Days",
  },
];
