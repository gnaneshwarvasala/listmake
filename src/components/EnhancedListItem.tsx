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
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "group relative flex items-start gap-2 p-2.5 transition-all duration-300",
            "max-w-xl mx-auto rounded-lg border shadow-sm hover:shadow-md",
            "bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm",
            "transform hover:-translate-y-0.5 transition-transform duration-200",
            "min-h-[50px] max-h-[100px]",
            isCollected && "bg-gradient-to-r from-primary-light/10 to-primary/10 dark:from-primary/20 dark:to-primary-light/20 scale-[0.98]",
            isHighlighted && "ring-2 ring-primary/30 dark:ring-primary/50",
            !isLocked && "cursor-grab active:cursor-grabbing",
            snapshot.isDragging && "rotate-1 scale-105 shadow-lg"
          )}
          onClick={() => onToggleCollected(id)}
        >
          <div
            className={cn(
              "flex-shrink-0 flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-300 mt-0.5",
              isCollected 
                ? "border-primary-light bg-primary-light dark:border-primary dark:bg-primary scale-110" 
                : "border-gray-300 dark:border-gray-500 hover:border-primary-light dark:hover:border-primary"
            )}
          >
            {isCollected && (
              <Check className="h-2.5 w-2.5 text-white animate-scale-in" />
            )}
          </div>
          
          <div className="flex-1 min-w-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            <span
              className={cn(
                "block text-sm font-medium transition-all duration-300 break-words",
                isCollected 
                  ? "text-gray-500 dark:text-gray-400" 
                  : "text-gray-700 dark:text-gray-200"
              )}
            >
              {text}
              {isCollected && (
                <span className="ml-2 text-xs text-primary-light dark:text-primary italic animate-fade-in">
                  Completed
                </span>
              )}
            </span>
          </div>
          
          {showPricing && (
            <div className="flex-shrink-0 flex items-center gap-1">
              <span className="text-gray-400 dark:text-gray-300 text-xs">{currencySymbol}</span>
              <Input
                type="number"
                value={price || ""}
                onChange={(e) => {
                  e.stopPropagation();
                  onUpdatePrice?.(id, parseFloat(e.target.value) || 0);
                }}
                className="w-14 h-6 text-xs rounded-md bg-white/90 dark:bg-gray-700/90 dark:text-gray-200 px-1"
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
              className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 h-5 w-5 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
            >
              <Trash2 className="h-3 w-3 text-red-500 dark:text-red-400 transform hover:scale-110 transition-transform duration-200" />
            </Button>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default EnhancedListItem;