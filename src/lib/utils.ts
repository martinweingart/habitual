import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNameFirstChars(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("");
}
