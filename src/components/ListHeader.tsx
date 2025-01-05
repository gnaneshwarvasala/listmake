import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Unlock } from "lucide-react";
import CategorySelector, { CategoryType } from "./CategorySelector";

interface ListHeaderProps {
  category: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
  isLocked: boolean;
  onToggleLock: () => void;
  customTitle: string;
  onCustomTitleChange: (title: string) => void;
}

const ListHeader = ({
  category,
  onCategoryChange,
  isLocked,
  onToggleLock,
  customTitle,
  onCustomTitleChange
}: ListHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {category === "custom" ? (
            <Input
              type="text"
              value={customTitle}
              onChange={(e) => onCustomTitleChange(e.target.value)}
              placeholder="Enter list title..."
              className="text-2xl font-bold bg-transparent border-none focus:ring-0 placeholder:text-gray-400"
            />
          ) : (
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light animate-gradient">
              {category.charAt(0).toUpperCase() + category.slice(1)} List
            </h1>
          )}
        </div>
        <Button
          variant="outline"
          onClick={onToggleLock}
          className={`transition-colors duration-300 ${isLocked ? "bg-primary/10" : ""}`}
        >
          {isLocked ? (
            <Lock className="h-5 w-5 text-primary" />
          ) : (
            <Unlock className="h-5 w-5" />
          )}
        </Button>
      </div>
      <CategorySelector category={category} onCategoryChange={onCategoryChange} />
    </div>
  );
};

export default ListHeader;