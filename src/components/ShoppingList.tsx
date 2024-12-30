import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Plus, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ListItemBox from "./ListItemBox";
import { toast } from "sonner";
import { CategoryType } from "./CategorySelector";
import ProgressBar from "./Progress";
import confetti from 'canvas-confetti';
import ListHeader from "./ListHeader";

interface Item {
  id: string;
  text: string;
  isCollected: boolean;
}

const getBackgroundClass = (category: CategoryType) => {
  const backgrounds = {
    grocery: "from-green-100/80 via-emerald-50/80 to-teal-50/80",
    travel: "from-blue-100/80 via-indigo-50/80 to-purple-50/80",
    meal: "from-orange-100/80 via-amber-50/80 to-yellow-50/80",
    budget: "from-emerald-100/80 via-teal-50/80 to-green-50/80",
    event: "from-purple-100/80 via-fuchsia-50/80 to-pink-50/80",
    bucket: "from-cyan-100/80 via-sky-50/80 to-blue-50/80",
    party: "from-pink-100/80 via-rose-50/80 to-red-50/80",
    custom: "from-violet-100/80 via-purple-50/80 to-indigo-50/80"
  };
  return backgrounds[category];
};

const ShoppingList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItemText, setNewItemText] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [category, setCategory] = useState<CategoryType>("grocery");
  const [isListening, setIsListening] = useState(false);
  const [customTitle, setCustomTitle] = useState("");

  useEffect(() => {
    const completedCount = items.filter(item => item.isCollected).length;
    if (completedCount === items.length && items.length > 0) {
      triggerCelebration();
    }
  }, [items]);

  const triggerCelebration = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const startListening = async () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error("Speech recognition is not supported in this browser");
      return;
    }

    try {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        toast.info("Listening...");
      };

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setNewItemText(text);
        addItem(text);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        toast.error("Error with speech recognition");
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (error) {
      console.error('Speech recognition error:', error);
      toast.error("Error initializing speech recognition");
    }
  };

  const addItem = (text?: string) => {
    if (isLocked) return;
    
    const itemText = text || newItemText;
    if (!itemText.trim()) {
      toast.error("Please enter an item");
      return;
    }
    
    const newItem: Item = {
      id: Date.now().toString(),
      text: itemText.trim(),
      isCollected: false,
    };
    
    setItems([...items, newItem]);
    setNewItemText("");
    toast.success(`Added "${itemText}" to your list`, {
      style: { background: '#22c55e', color: 'white' }
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
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isCollected: !item.isCollected } : item
      )
    );
    const item = items.find(item => item.id === id);
    if (item) {
      toast.success(`Marked "${item.text}" as ${!item.isCollected ? 'completed' : 'incomplete'}`, {
        style: { background: '#3b82f6', color: 'white' }
      });
    }
  };

  const deleteItem = (id: string) => {
    if (!isLocked) {
      const itemToDelete = items.find(item => item.id === id);
      setItems(items.filter(item => item.id !== id));
      toast(`Deleted "${itemToDelete?.text}"`, {
        style: { background: '#ef4444', color: 'white' }
      });
    }
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
    toast.info(`List ${!isLocked ? 'locked' : 'unlocked'}`, {
      duration: 3000,
    });
  };

  const completedItems = items.filter(item => item.isCollected).length;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundClass(category)} backdrop-blur-sm p-4 md:p-8 transition-all duration-500`}>
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <ListHeader
          category={category}
          onCategoryChange={setCategory}
          isLocked={isLocked}
          onToggleLock={toggleLock}
          customTitle={customTitle}
          onCustomTitleChange={setCustomTitle}
        />
        
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
            onClick={() => addItem()} 
            disabled={isLocked}
            className="bg-purple-500 hover:bg-purple-600 transition-colors duration-300"
          >
            <Plus className="h-5 w-5 text-white" />
          </Button>
          <Button
            onClick={startListening}
            disabled={isLocked || isListening}
            className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
          >
            <Mic className={`h-5 w-5 text-white ${isListening ? 'animate-pulse' : ''}`} />
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
                  <ListItemBox
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