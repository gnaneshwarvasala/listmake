import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EnhancedListItemProps {
  id: string;
  index: number;
  text: string;
  isCollected: boolean;
  isLocked: boolean;
  showPricing?: boolean;
  price?: number;
  currencySymbol?: string;
  isHighlighted?: boolean;
  onToggleCollected: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdatePrice?: (id: string, price: number) => void;
}

const EnhancedListItem = ({
  id,
  index,
  text,
  isCollected,
  isLocked,
  showPricing,
  price,
  currencySymbol = "$",
  isHighlighted,
  onToggleCollected,
  onDelete,
  onUpdatePrice
}: EnhancedListItemProps) => {
  return (
    <Draggable draggableId={id} index={index} isDragDisabled={isLocked}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "group relative flex items-center gap-3 p-3 transition-all duration-300",
            "max-w-xl mx-auto rounded-custom border shadow-sm hover:shadow-md",
            "bg-gradient-to-r from-gradient-start/5 to-gradient-end/5",
            "dark:from-gray-800 dark:to-gray-700",
            isCollected && "bg-gradient-to-r from-gradient-start/20 to-gradient-end/20 dark:from-gray-700 dark:to-gray-600",
            isHighlighted && "ring-2 ring-gradient-start dark:ring-gradient-end ring-offset-2",
            !isLocked && "cursor-grab active:cursor-grabbing",
            "mb-2"
          )}
          onClick={() => onToggleCollected(id)}
        >
          <div
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors duration-300",
              isCollected ? "border-gradient-start bg-gradient-start dark:border-gradient-end dark:bg-gradient-end" : "border-gray-300 dark:border-gray-600",
              "hover:border-gradient-start dark:hover:border-gradient-end"
            )}
          >
            {isCollected && <Check className="h-3 w-3 text-white animate-scale-in" />}
          </div>
          
          <div className="flex-1 min-w-0">
            <span
              className={cn(
                "block text-sm font-medium transition-all duration-300 truncate",
                isCollected ? "text-gray-500 dark:text-gray-400" : "text-gray-700 dark:text-gray-200"
              )}
            >
              {text}
              {isCollected && (
                <span className="ml-2 text-xs text-gradient-start dark:text-gradient-end italic">
                  Completed
                </span>
              )}
            </span>
          </div>
          
          {showPricing && (
            <div className="flex items-center gap-1">
              <span className="text-gray-400 dark:text-gray-500 text-xs">{currencySymbol}</span>
              <Input
                type="number"
                value={price || ""}
                onChange={(e) => {
                  e.stopPropagation();
                  onUpdatePrice?.(id, parseFloat(e.target.value) || 0);
                }}
                className="w-16 h-7 text-xs rounded-custom bg-white/90 dark:bg-gray-800/90"
                placeholder="0.00"
                step="0.01"
                min="0"
                disabled={isLocked}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {!isLocked && (
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-7 w-7 rounded-custom"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
            >
              <Trash2 className="h-3 w-3 text-red-500" />
            </Button>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default EnhancedListItem;