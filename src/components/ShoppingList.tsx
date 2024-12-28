import React, { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Plus, Lock, Unlock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ListItem from "./ListItem";
import { toast } from "sonner";

interface Item {
  id: string;
  text: string;
  isCollected: boolean;
}

const ShoppingList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItemText, setNewItemText] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const addItem = () => {
    if (!newItemText.trim()) {
      toast.error("Please enter an item");
      return;
    }
    
    const newItem: Item = {
      id: Date.now().toString(),
      text: newItemText.trim(),
      isCollected: false,
    };
    
    setItems([...items, newItem]);
    setNewItemText("");
    toast.success(`Added "${newItemText}" to your list`, {
      style: { background: '#8B5CF6', color: 'white' }
    });
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
  };

  const toggleCollected = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isCollected: !item.isCollected } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    const itemToDelete = items.find(item => item.id === id);
    setItems(items.filter(item => item.id !== id));
    toast(`Deleted "${itemToDelete?.text}"`, {
      style: { background: '#EF4444', color: 'white' }
    });
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
    toast.info(`List ${!isLocked ? 'locked' : 'unlocked'}`, {
      style: { background: '#3B82F6', color: 'white' }
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Add new item..."
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && !isLocked && addItem()}
          className="flex-1"
          disabled={isLocked}
        />
        <Button onClick={addItem} disabled={isLocked}>
          <Plus className="h-5 w-5" />
        </Button>
        <Button 
          variant="outline" 
          onClick={toggleLock}
          className={isLocked ? "bg-blue-50" : ""}
        >
          {isLocked ? (
            <Lock className="h-5 w-5 text-blue-500" />
          ) : (
            <Unlock className="h-5 w-5" />
          )}
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="shopping-list">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >
              {items.map((item, index) => (
                <ListItem
                  key={item.id}
                  id={item.id}
                  index={index}
                  text={item.text}
                  isCollected={item.isCollected}
                  onToggleCollected={toggleCollected}
                  onDelete={deleteItem}
                  isLocked={isLocked}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ShoppingList;