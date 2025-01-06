import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import confetti from 'canvas-confetti';
import { CategoryType } from "./CategorySelector";
import { validateListCreation } from "@/utils/listValidation";
import { isListTypeEnabled } from "@/utils/listTypes";
import { getBackgroundClass } from "@/utils/backgroundUtils";
import ProgressBar from "./Progress";
import ListHeader from "./ListHeader";
import EnhancedListItem from "./EnhancedListItem";
import ListActions from "./ListActions";
import ListControls from "./ListControls";
import SearchBar from "./SearchBar";
import { generatePDF } from "@/utils/pdfGenerator";
import { showToast } from "@/utils/toastConfig";
import { Item } from "@/types/item";

const ShoppingList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItemText, setNewItemText] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [category, setCategory] = useState<CategoryType>("grocery");
  const [customTitle, setCustomTitle] = useState("");
  const [showPricing, setShowPricing] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [searchTerm, setSearchTerm] = useState("");

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
      shapes: ['square' as const, 'circle' as const],
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
    if (!isListTypeEnabled(category)) {
      showToast.error("This list type is currently unavailable");
      return;
    }

    if (isLocked) {
      showToast.error("List is locked. Unlock to add items.");
      return;
    }
    
    if (!newItemText.trim()) {
      showToast.error("Please enter an item");
      return;
    }

    if (!validateListCreation(items.length)) {
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
    if (!isListTypeEnabled(category)) {
      showToast.error("This list type is currently unavailable");
      return;
    }
    
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
    if (!isListTypeEnabled(category)) {
      showToast.error("This list type is currently unavailable");
      return;
    }

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
    if (!isListTypeEnabled(category)) {
      showToast.error("This list type is currently unavailable");
      return;
    }

    try {
      const doc = generatePDF(items, customTitle, category, showPricing, currencySymbol);
      doc.save(`${customTitle || category}-list.pdf`);
      showToast.success("PDF exported successfully!");
    } catch (error) {
      console.error("PDF Export Error:", error);
      showToast.error("Couldn't export PDF. Please try again.");
    }
  };

  const completedItems = items.filter(item => item.isCollected).length;

  const filteredItems = items.filter(item =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundClass(category)} p-4 md:p-8 transition-all duration-500`}>
      <div className="w-full max-w-4xl mx-auto space-y-6">
        {/* Ad Space - Top */}
        <div className="h-24 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 mb-8 hidden md:block">
          <div className="flex items-center justify-center h-full text-gray-400">
            Ad Space
          </div>
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
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
          
          <SearchBar 
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
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
                  {filteredItems.map((item, index) => (
                    <EnhancedListItem
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
                      isHighlighted={searchTerm && item.text.toLowerCase().includes(searchTerm.toLowerCase())}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {showPricing && items.length > 0 && (
            <div className="mt-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total:</span>
                <span className="text-lg font-bold">
                  {currencySymbol}{items.reduce((total, item) => total + (item.price || 0), 0).toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Ad Space - Bottom */}
        <div className="h-24 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 mt-8 hidden md:block">
          <div className="flex items-center justify-center h-full text-gray-400">
            Ad Space
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
