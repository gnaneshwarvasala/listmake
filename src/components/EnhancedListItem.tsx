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
            "group relative flex items-center gap-3 p-2.5 transition-all duration-300",
            "max-w-xl mx-auto rounded-custom border shadow-sm hover:shadow-md",
            "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm",
            isCollected && "bg-gradient-to-r from-primary-light/10 to-primary/10 scale-[0.98]",
            isHighlighted && "ring-2 ring-primary/30",
            !isLocked && "cursor-grab active:cursor-grabbing",
            "transform hover:-translate-y-0.5 transition-transform duration-200"
          )}
          onClick={() => onToggleCollected(id)}
        >
          <div
            className={cn(
              "flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-300",
              isCollected 
                ? "border-primary-light bg-primary-light scale-110" 
                : "border-gray-300 dark:border-gray-600 hover:border-primary-light"
            )}
          >
            {isCollected && <Check className="h-2.5 w-2.5 text-white animate-scale-in" />}
          </div>
          
          <span
            className={cn(
              "flex-1 text-sm font-medium transition-all duration-300",
              isCollected ? "text-gray-500 dark:text-gray-400" : "text-gray-700 dark:text-gray-200"
            )}
          >
            {text}
            {isCollected && (
              <span className="ml-2 text-xs text-primary-light italic">
                Completed
              </span>
            )}
          </span>
          
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
                className="w-16 h-6 text-xs rounded-custom bg-white/90 dark:bg-gray-800/90"
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
              className="opacity-0 group-hover:opacity-100 transition-all duration-200 h-6 w-6 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
            >
              <Trash2 className="h-3 w-3 text-red-500 transform hover:scale-110 transition-transform duration-200" />
            </Button>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default EnhancedListItem;