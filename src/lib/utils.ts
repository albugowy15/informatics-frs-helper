import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const renderPageTitle = (title: string) => {
  return `${title} - Informatics FRS Helper`;
};

const emptyStringToUndefined = z.literal("").transform(() => undefined);
export function asOptionalField<T extends z.ZodTypeAny>(schema: T) {
  return schema.optional().or(emptyStringToUndefined);
}

export function parseSemester(val: string) {
  try {
    return parseInt(val);
  } catch (error) {
    return 1;
  }
}
