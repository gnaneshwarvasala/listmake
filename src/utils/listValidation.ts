import { toast } from "sonner";

export const MAX_LISTS = 100;

export const validateListCreation = (currentItemsCount: number): boolean => {
  if (currentItemsCount >= MAX_LISTS) {
    toast.error(`You've reached the maximum limit of ${MAX_LISTS} items`);
    return false;
  }
  return true;
};