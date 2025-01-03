import React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { isListTypeEnabled, getListTypeMessage } from "@/utils/listTypes";

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
  { value: "grocery", label: "Grocery List", beta: false },
  { value: "meal", label: "Meal Planner", beta: true },
  { value: "budget", label: "Budget List", beta: true },
  { value: "travel", label: "Travel Places", beta: true },
  { value: "event", label: "Event Planning", beta: true },
  { value: "bucket", label: "Bucket List", beta: true },
  { value: "party", label: "Party Planning", beta: true },
  { value: "custom", label: "Custom List", beta: false },
];

const CategorySelector = ({ category, onCategoryChange }: CategorySelectorProps) => {
  return (
    <div className="w-full max-w-xs mx-auto mb-6">
      <Select
        value={category}
        onValueChange={(value) => onCategoryChange(value as CategoryType)}
      >
        <SelectTrigger className="w-full bg-white/50 backdrop-blur-sm border-purple-200 hover:border-purple-300 transition-colors">
          <SelectValue placeholder="Select a category">
            {categories.find(cat => cat.value === category)?.label}
            {categories.find(cat => cat.value === category)?.beta && (
              <span className="ml-2 text-xs px-1.5 py-0.5 bg-purple-100 text-purple-600 rounded-full">
                Beta
              </span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white/80 backdrop-blur-sm">
          {categories.map((cat) => {
            const isEnabled = isListTypeEnabled(cat.value as CategoryType);
            const message = getListTypeMessage(cat.value as CategoryType);
            
            return (
              <TooltipProvider key={cat.value}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <SelectItem 
                        value={cat.value}
                        className={cn(
                          "hover:bg-purple-50 cursor-pointer flex items-center justify-between",
                          !isEnabled && "opacity-50 cursor-not-allowed"
                        )}
                        disabled={!isEnabled}
                      >
                        {cat.label}
                        {cat.beta && (
                          <span className="text-xs px-1.5 py-0.5 bg-purple-100 text-purple-600 rounded-full">
                            Beta
                          </span>
                        )}
                      </SelectItem>
                    </div>
                  </TooltipTrigger>
                  {!isEnabled && (
                    <TooltipContent>
                      <p>{message}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategorySelector;