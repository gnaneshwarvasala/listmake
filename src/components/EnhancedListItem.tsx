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
            "group relative flex flex-col sm:flex-row items-start sm:items-center gap-2 rounded-lg border p-3 shadow-sm transition-all duration-300",
            "max-w-xl mx-auto hover:border-blue-200 hover:shadow-md cursor-pointer",
            isCollected && "border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 scale-[0.98]",
            !isLocked && "cursor-grab active:cursor-grabbing"
          )}
          onClick={() => onToggleCollected(id)}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onToggleCollected(id);
            }
          }}
        >
          <div className="flex items-center gap-2 w-full">
            <div
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full border transition-colors duration-300",
                isCollected ? "border-green-500 bg-green-500 scale-110" : "border-gray-300",
                "flex-shrink-0"
              )}
            >
              {isCollected && <Check className="h-3 w-3 text-white animate-scale-in" />}
            </div>
            
            <div className="flex-1 min-w-0">
              <span
                className={cn(
                  "block text-base font-medium transition-all duration-300 truncate",
                  isCollected ? "text-gray-600" : "text-gray-800"
                )}
              >
                {text}
                {isCollected && (
                  <span className="ml-2 text-sm text-green-600 italic">
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
                  className="w-20 h-8 text-sm"
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
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"
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