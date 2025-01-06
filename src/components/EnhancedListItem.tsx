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
            "max-w-xl mx-auto rounded-lg border shadow-sm hover:shadow-md",
            "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm",
            isCollected && "bg-neon-blue-50 border-neon-blue-200 scale-[0.98]",
            isHighlighted && "ring-2 ring-neon-blue ring-offset-2",
            !isLocked && "cursor-grab active:cursor-grabbing",
            "mb-2"
          )}
        >
          <div
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors duration-300",
              isCollected ? "border-neon-blue bg-neon-blue" : "border-gray-300",
              "hover:border-neon-blue/60"
            )}
            onClick={() => onToggleCollected(id)}
          >
            {isCollected && <Check className="h-3 w-3 text-white animate-scale-in" />}
          </div>
          
          <div className="flex-1 min-w-0">
            <span
              className={cn(
                "block text-sm font-medium transition-all duration-300 truncate",
                isCollected ? "text-gray-500" : "text-gray-700"
              )}
            >
              {text}
              {isCollected && (
                <span className="ml-2 text-xs text-neon-blue italic">
                  Completed
                </span>
              )}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {showPricing && (
              <div className="flex items-center gap-1">
                <span className="text-gray-400 text-sm">{currencySymbol}</span>
                <Input
                  type="number"
                  value={price || ""}
                  onChange={(e) => {
                    e.stopPropagation();
                    onUpdatePrice?.(id, parseFloat(e.target.value) || 0);
                  }}
                  className="w-20 h-8 text-sm bg-white/90"
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
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id);
                }}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default EnhancedListItem;