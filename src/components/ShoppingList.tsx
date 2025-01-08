import React, { useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ListHeader from "./ListHeader";
import EnhancedListItem from "./EnhancedListItem";
import ListActions from "./ListActions";
import ListControls from "./ListControls";
import ProgressBar from "./Progress";
import { showToast } from "@/utils/toastConfig";
import { useListManagement } from "@/hooks/useListManagement";

const ShoppingList = () => {
  const {
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
  } = useListManagement();

  useEffect(() => {
    const completedCount = items.filter(item => item.isCollected).length;
    if (completedCount === items.length && items.length > 0) {
      triggerCelebration();
      showToast.success("Congratulations! You completed the list! 🎉");
    }
  }, [items, triggerCelebration]);

  const filteredItems = items.filter(item =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completedCount = items.filter(item => item.isCollected).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end dark:from-gray-900 dark:to-gray-800 p-3 md:p-6 transition-all duration-500">
      <div className="w-full max-w-4xl mx-auto space-y-4">
        <div className="space-y-4 max-w-2xl mx-auto">
          <ListHeader
            category={category}
            onCategoryChange={setCategory}
            isLocked={isLocked}
            onToggleLock={toggleLock}
            customTitle={customTitle}
            onCustomTitleChange={setCustomTitle}
          />
          
          {items.length > 0 && (
            <ProgressBar
              total={items.length}
              completed={completedCount}
            />
          )}
          
          <ListControls
            showPricing={showPricing}
            setShowPricing={setShowPricing}
            currencySymbol={currencySymbol}
            setCurrencySymbol={setCurrencySymbol}
            isLocked={isLocked}
            onShare={handleShare}
            onExportPDF={exportToPDF}
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
          />
          
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
                  className="space-y-2"
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
            <div className="mt-4 p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-custom shadow-sm">
              <div className="flex justify-between items-center">
                <span className="font-semibold dark:text-gray-200">Total:</span>
                <span className="text-lg font-bold dark:text-gray-200">
                  {currencySymbol}{items.reduce((total, item) => total + (item.price || 0), 0).toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;