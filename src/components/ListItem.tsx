import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ListItemProps {
  id: string;
  index: number;
  text: string;
  isCollected: boolean;
  onToggleCollected: (id: string) => void;
}

const ListItem = ({ id, index, text, isCollected, onToggleCollected }: ListItemProps) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "group relative flex items-center gap-2 rounded-lg border p-4 shadow-sm transition-all",
            "hover:border-blue-200 hover:shadow-md",
            isCollected && "border-green-200 bg-green-50"
          )}
          onClick={() => onToggleCollected(id)}
        >
          <div
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full border",
              isCollected ? "border-green-500 bg-green-500" : "border-gray-300"
            )}
          >
            {isCollected && <Check className="h-4 w-4 text-white" />}
          </div>
          <span
            className={cn(
              "flex-1 text-lg",
              isCollected && "text-gray-500 line-through"
            )}
          >
            {text}
          </span>
        </div>
      )}
    </Draggable>
  );
};

export default ListItem;