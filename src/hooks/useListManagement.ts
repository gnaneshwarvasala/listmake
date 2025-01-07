import { useState } from 'react';
import { Item } from '@/types/item';
import { CategoryType } from '@/components/CategorySelector';
import { isListTypeEnabled } from '@/utils/listValidation';
import { validateListCreation } from '@/utils/listValidation';
import { showToast } from '@/utils/toastConfig';
import confetti from 'canvas-confetti';
import { generatePDF } from '@/utils/pdfGenerator';

export const useListManagement = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItemText, setNewItemText] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [category, setCategory] = useState<CategoryType>("grocery");
  const [customTitle, setCustomTitle] = useState("");
  const [showPricing, setShowPricing] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [searchTerm, setSearchTerm] = useState("");

  const triggerCelebration = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { 
      startVelocity: 30, 
      spread: 360, 
      ticks: 60, 
      zIndex: 0,
      shapes: ['square' as const, 'circle' as const], // Fix for TS2345
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
      showToast.error("Maximum items limit reached");
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

  const handleDragEnd = (result: any) => {
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

  return {
    items,
    newItemText,
    setNewItemText,
    isLocked,
    category,
    setCategory,
    customTitle,
    setCustomTitle,
    showPricing,
    setShowPricing,
    currencySymbol,
    setCurrencySymbol,
    searchTerm,
    setSearchTerm,
    addItem,
    handleDragEnd,
    toggleCollected,
    deleteItem,
    updateItemPrice,
    toggleLock,
    handleShare,
    exportToPDF,
    triggerCelebration
  };
};