import { CategoryType } from "@/components/CategorySelector";

export const isListTypeEnabled = (category: CategoryType): boolean => {
  const enabledTypes: CategoryType[] = ["grocery", "custom"];
  return enabledTypes.includes(category);
};

export const getListTypeMessage = (category: CategoryType): string => {
  if (isListTypeEnabled(category)) return "";
  return "This list type is currently unavailable";
};