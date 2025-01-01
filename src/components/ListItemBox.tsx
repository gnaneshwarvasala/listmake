import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Check, Trash2, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ListItemBoxProps {
  id: string;
  index: number;
  text: string;
  isCollected: boolean;
  isLocked: boolean;
  showPricing?: boolean;
  price?: number;
  onToggleCollected: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdatePrice?: (id: string, price: number) => void;
}

const ListItemBox = ({
  id,
  index,
  text,
  isCollected,
  isLocked,
  showPricing,
  price,
  onToggleCollected,
  onDelete,
  onUpdatePrice
}: ListItemBoxProps) => {
  return (
    <Draggable draggableId={id} index={index} isDragDisabled={isLocked}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "group relative flex items-center gap-2 rounded-lg border p-3 shadow-sm transition-all duration-300",
            "max-w-xl mx-auto hover:border-blue-200 hover:shadow-md",
            isCollected && "border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 scale-[0.98]",
            !isLocked && "cursor-grab active:cursor-grabbing"
          )}
        >
          <div
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded-full border transition-colors duration-300",
              isCollected ? "border-green-500 bg-green-500 scale-110" : "border-gray-300"
            )}
            onClick={() => onToggleCollected(id)}
          >
            {isCollected && <Check className="h-3 w-3 text-white animate-scale-in" />}
          </div>
          
          <div className="flex-1 flex items-center gap-2">
            <span
              className={cn(
                "flex-1 text-base font-medium transition-all duration-300",
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
            
            {showPricing && (
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" />
                <Input
                  type="number"
                  value={price || ""}
                  onChange={(e) => onUpdatePrice?.(id, parseFloat(e.target.value) || 0)}
                  className="w-20 h-8 text-sm"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  disabled={isLocked}
                />
              </div>
            )}
          </div>

          {!isLocked && (
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default ListItemBox;