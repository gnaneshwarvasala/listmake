import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type CategoryType = 
  | "grocery" 
  | "travel" 
  | "meal" 
  | "budget" 
  | "event" 
  | "bucket" 
  | "party" 
  | "custom";

interface CategorySelectorProps {
  category: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
}

const categories = [
  { value: "grocery", label: "Grocery List" },
  { value: "travel", label: "Travel Places" },
  { value: "meal", label: "Meal Planner" },
  { value: "budget", label: "Budget List" },
  { value: "event", label: "Event Planning" },
  { value: "bucket", label: "Bucket List" },
  { value: "party", label: "Party Planning" },
  { value: "custom", label: "Custom List" },
];

const CategorySelector = ({ category, onCategoryChange }: CategorySelectorProps) => {
  return (
    <div className="w-full max-w-xs mx-auto mb-6">
      <Select
        value={category}
        onValueChange={(value) => onCategoryChange(value as CategoryType)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.value} value={cat.value}>
              {cat.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategorySelector;