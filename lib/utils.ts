import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPercent = (value: number) => `${value}%`;

export const numberFormatter = (value: number) => parseFloat(value.toFixed(1));
