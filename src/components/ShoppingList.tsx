import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import confetti from 'canvas-confetti';
import { CategoryType } from "./CategorySelector";
import ProgressBar from "./Progress";
import ListHeader from "./ListHeader";
import ListItemBox from "./ListItemBox";
import ListActions from "./ListActions";
import ListControls from "./ListControls";
import { generatePDF } from "@/utils/pdfGenerator";
import { showToast } from "@/utils/toastConfig";
import { Item } from "@/types/item";

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
  const [customTitle, setCustomTitle] = useState("");
  const [showPricing, setShowPricing] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState("$");

  useEffect(() => {
    const completedCount = items.filter(item => item.isCollected).length;
    if (completedCount === items.length && items.length > 0) {
      triggerCelebration();
      showToast.success("Congratulations! You completed the list! 🎉");
    }
  }, [items]);

  const triggerCelebration = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { 
      startVelocity: 30, 
      spread: 360, 
      ticks: 60, 
      zIndex: 0,
      shapes: ['square', 'circle'],
      colors: ['#9b87f5', '#1EAEDB', '#7E69AB', '#33C3F0']
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.random(), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const addItem = () => {
    if (isLocked) {
      showToast.error("List is locked. Unlock to add items.");
      return;
    }
    
    if (!newItemText.trim()) {
      showToast.error("Please enter an item");
      return;
    }
    
    const newItem: Item = {
      id: Date.now().toString(),
      text: newItemText.trim(),
      isCollected: false,
      price: showPricing ? 0 : undefined,
    };
    
    setItems([...items, newItem]);
    setNewItemText("");
    showToast.success(`Added "${newItemText}" to your list`);
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
  };

  const deleteItem = (id: string) => {
    if (isLocked) {
      showToast.error("List is locked. Unlock to delete items.");
      return;
    }
    const itemToDelete = items.find(item => item.id === id);
    setItems(items.filter(item => item.id !== id));
    showToast.success(`Deleted "${itemToDelete?.text}"`);
  };

  const updateItemPrice = (id: string, price: number) => {
    if (isLocked) {
      showToast.error("List is locked. Unlock to update prices.");
      return;
    }
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, price } : item
      )
    );
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
    showToast.info(`List ${!isLocked ? 'locked' : 'unlocked'}`);
  };

  const handleShare = async (method: string) => {
    const listText = items
      .map((item, index) => `${index + 1}. ${item.text}${item.price ? ` - ${currencySymbol}${item.price}` : ''}`)
      .join('\n');
    
    try {
      if (method === "email") {
        window.location.href = `mailto:?subject=${encodeURIComponent(customTitle || `${category} List`)}&body=${encodeURIComponent(listText)}`;
      } else if (method === "message") {
        if (navigator.share) {
          await navigator.share({
            title: customTitle || `${category.charAt(0).toUpperCase() + category.slice(1)} List`,
            text: listText,
          });
        } else {
          showToast.error("Sharing not supported on this device");
        }
      }
    } catch (error) {
      showToast.error("Couldn't share the list. Try exporting as PDF instead.");
    }
  };

  const exportToPDF = () => {
    try {
      const pdf = generatePDF(items, customTitle, category, showPricing, currencySymbol);
      pdf.save(`${customTitle || category}-list.pdf`);
      showToast.success("PDF exported successfully!");
    } catch (error) {
      showToast.error("Couldn't export PDF. Please try again.");
    }
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
        
        <ListControls
          showPricing={showPricing}
          setShowPricing={setShowPricing}
          currencySymbol={currencySymbol}
          setCurrencySymbol={setCurrencySymbol}
          isLocked={isLocked}
          onShare={handleShare}
          onExportPDF={exportToPDF}
        />
        
        <ProgressBar total={items.length} completed={completedItems} />
        
        <ListActions
          newItemText={newItemText}
          setNewItemText={setNewItemText}
          isLocked={isLocked}
          onAddItem={addItem}
        />

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
                    showPricing={showPricing}
                    price={item.price}
                    onUpdatePrice={updateItemPrice}
                    currencySymbol={currencySymbol}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {showPricing && items.length > 0 && (
          <div className="mt-4 p-4 bg-white/50 backdrop-blur-sm rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total:</span>
              <span className="text-lg font-bold">
                {currencySymbol}{items.reduce((total, item) => total + (item.price || 0), 0).toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
