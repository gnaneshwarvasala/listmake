import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Unlock, Sun, Moon } from "lucide-react";
import CategorySelector, { CategoryType } from "./CategorySelector";
import { useTheme } from "next-themes";

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
  const { theme, setTheme } = useTheme();

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
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="w-8 h-8 rounded-lg transition-colors hover:bg-accent"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-orange-500" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-purple-500" />
            <span className="sr-only">Toggle theme</span>
          </Button>
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
      </div>
      <CategorySelector category={category} onCategoryChange={onCategoryChange} />
    </div>
  );
};

export default ListHeader;