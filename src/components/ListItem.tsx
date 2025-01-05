import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ListItemProps {
  id: string;
  index: number;
  text: string;
  isCollected: boolean;
  isLocked: boolean;
  onToggleCollected: (id: string) => void;
  onDelete: (id: string) => void;
}

const ListItem = ({ 
  id, 
  index, 
  text, 
  isCollected, 
  isLocked,
  onToggleCollected, 
  onDelete 
}: ListItemProps) => {
  return (
    <Draggable draggableId={id} index={index} isDragDisabled={isLocked}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "group relative flex items-center gap-3 rounded-xl border p-4 shadow-lg transition-all duration-300",
            "max-w-xl mx-auto hover:border-primary/20 hover:shadow-xl backdrop-blur-sm",
            "bg-white/80 dark:bg-gray-800/80",
            isCollected && "border-primary-light/30 bg-gradient-to-r from-primary-light/10 to-primary/10 scale-[0.98]",
            !isLocked && "active:cursor-grabbing"
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
          <div
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors duration-300",
              isCollected ? "border-primary bg-primary scale-110" : "border-primary/30 hover:border-primary/60"
            )}
          >
            {isCollected && <Check className="h-4 w-4 text-white" />}
          </div>
          <span
            className={cn(
              "flex-1 text-lg font-medium transition-all duration-300",
              isCollected ? "text-gray-500" : "text-gray-700 dark:text-gray-200"
            )}
          >
            {text}
            {isCollected && (
              <span className="ml-2 text-sm text-primary italic font-normal">
                Completed
              </span>
            )}
          </span>
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
      )}
    </Draggable>
  );
};

export default ListItem;