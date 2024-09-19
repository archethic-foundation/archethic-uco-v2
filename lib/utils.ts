import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const convertTo8Digit = (num: string) => {
  return `${num.split(".")[0]}${num.split(".")[1]?.length > 0 ? `.${num.split(".")[1].slice(0, 8)}` : ""}`;
};
