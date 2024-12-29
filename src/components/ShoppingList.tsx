import React, { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Plus, Lock, Unlock } from "lucide-react";
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
      toast.error("Please enter an item", {
        style: { background: '#fecaca', color: '#991b1b' }
      });
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
      style: { background: '#D3E4FD', color: '#1e40af' }
    });
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || isLocked) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
  };

  const toggleCollected = (id: string) => {
    if (!isLocked) {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, isCollected: !item.isCollected } : item
        )
      );
      const item = items.find(item => item.id === id);
      if (item) {
        toast.success(`Marked "${item.text}" as ${!item.isCollected ? 'completed' : 'incomplete'}`, {
          style: { background: '#F2FCE2', color: '#166534' }
        });
      }
    }
  };

  const deleteItem = (id: string) => {
    const itemToDelete = items.find(item => item.id === id);
    setItems(items.filter(item => item.id !== id));
    toast(`Deleted "${itemToDelete?.text}"`, {
      style: { background: '#fecaca', color: '#991b1b' }
    });
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
    toast.info(`List ${!isLocked ? 'locked' : 'unlocked'}`, {
      style: { background: '#D3E4FD', color: '#1e40af' }
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
        <Button 
          onClick={addItem} 
          disabled={isLocked}
          className="bg-purple-500 hover:bg-purple-600 transition-colors duration-300"
        >
          <Plus className="h-5 w-5 text-white" />
        </Button>
        <Button 
          variant="outline" 
          onClick={toggleLock}
          className={`transition-colors duration-300 ${isLocked ? "bg-blue-50" : ""}`}
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