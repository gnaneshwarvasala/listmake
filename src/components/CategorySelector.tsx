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
  { value: "meal", label: "Meal Planner" },
  { value: "budget", label: "Budget List" },
  { value: "travel", label: "Travel Places" },
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
        <SelectTrigger className="w-full bg-white/50 backdrop-blur-sm border-purple-200 hover:border-purple-300 transition-colors">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent className="bg-white/80 backdrop-blur-sm">
          {categories.map((cat) => (
            <SelectItem 
              key={cat.value} 
              value={cat.value}
              className="hover:bg-purple-50 cursor-pointer"
            >
              {cat.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategorySelector;