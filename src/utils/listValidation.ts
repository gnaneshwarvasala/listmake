import { CategoryType } from "@/components/CategorySelector";

export const isListTypeEnabled = (category: CategoryType): boolean => {
  const enabledTypes: CategoryType[] = ["grocery", "custom"];
  return enabledTypes.includes(category);
};

export const validateListCreation = (currentItemsCount: number): boolean => {
  if (currentItemsCount >= 100) { // Maximum 100 items
    return false;
  }
  return true;
};