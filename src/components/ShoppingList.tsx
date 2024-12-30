import React, { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Plus, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ListItem from "./ListItem";
import { toast } from "sonner";
import CategorySelector, { CategoryType } from "./CategorySelector";
import ProgressBar from "./Progress";

interface Item {
  id: string;
  text: string;
  isCollected: boolean;
}

const getBackgroundClass = (category: CategoryType) => {
  const backgrounds = {
    grocery: "from-green-100 via-emerald-50 to-teal-50",
    travel: "from-blue-100 via-indigo-50 to-purple-50",
    meal: "from-orange-100 via-amber-50 to-yellow-50",
    budget: "from-emerald-100 via-green-50 to-lime-50",
    event: "from-purple-100 via-fuchsia-50 to-pink-50",
    bucket: "from-cyan-100 via-sky-50 to-blue-50",
    party: "from-pink-100 via-rose-50 to-red-50",
    custom: "from-violet-100 via-purple-50 to-indigo-50"
  };
  return backgrounds[category];
};

const ShoppingList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItemText, setNewItemText] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [category, setCategory] = useState<CategoryType>("grocery");

  const addItem = () => {
    if (!newItemText.trim()) {
      toast.error("Please enter an item", {
        duration: 3000,
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
      duration: 3000,
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
          duration: 3000,
          style: { background: '#F2FCE2', color: '#166534' }
        });
      }
    }
  };

  const deleteItem = (id: string) => {
    const itemToDelete = items.find(item => item.id === id);
    setItems(items.filter(item => item.id !== id));
    toast(`Deleted "${itemToDelete?.text}"`, {
      duration: 3000,
      style: { background: '#fecaca', color: '#991b1b' }
    });
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
    toast.info(`List ${!isLocked ? 'locked' : 'unlocked'}`, {
      duration: 3000,
      style: { background: '#D3E4FD', color: '#1e40af' }
    });
  };

  const completedItems = items.filter(item => item.isCollected).length;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundClass(category)} p-4 md:p-8 transition-colors duration-500`}>
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <CategorySelector category={category} onCategoryChange={setCategory} />
        <ProgressBar total={items.length} completed={completedItems} />
        
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
    </div>
  );
};

export default ShoppingList;