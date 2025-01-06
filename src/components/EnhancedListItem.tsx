import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Check, Trash2, Package } from "lucide-react";
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
            "group relative flex flex-col sm:flex-row items-start sm:items-center gap-2 rounded-xl border p-4 shadow-sm transition-all duration-300",
            "max-w-xl mx-auto hover:border-primary/20 hover:shadow-md backdrop-blur-sm",
            "bg-white/80 dark:bg-gray-800/80",
            isCollected && "border-primary-light/30 bg-gradient-to-r from-primary-light/10 to-primary/10 scale-[0.98]",
            isHighlighted && "ring-2 ring-primary ring-offset-2 bg-primary/5",
            !isLocked && "cursor-grab active:cursor-grabbing",
            "mb-3 sm:mb-4"
          )}
        >
          <div className="flex items-center gap-3 w-full">
            <div className="flex items-center gap-2">
              <Package className={cn(
                "h-5 w-5 transition-colors duration-300",
                isCollected ? "text-primary" : "text-gray-400"
              )} />
              <div
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-300",
                  isCollected ? "border-primary bg-primary scale-110" : "border-gray-300",
                  "hover:border-primary/60"
                )}
                onClick={() => onToggleCollected(id)}
              >
                {isCollected && <Check className="h-3 w-3 text-white animate-scale-in" />}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <span
                className={cn(
                  "block text-base font-medium transition-all duration-300 truncate",
                  isCollected ? "text-gray-500" : "text-gray-700"
                )}
              >
                {text}
                {isCollected && (
                  <span className="ml-2 text-sm text-primary italic">
                    Completed
                  </span>
                )}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
            {showPricing && (
              <div className="flex items-center gap-1 flex-1 sm:flex-initial">
                <span className="text-gray-400">{currencySymbol}</span>
                <Input
                  type="number"
                  value={price || ""}
                  onChange={(e) => {
                    e.stopPropagation();
                    onUpdatePrice?.(id, parseFloat(e.target.value) || 0);
                  }}
                  className="w-24 h-8 text-sm bg-white/90"
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
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50"
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