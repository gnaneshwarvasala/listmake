import React from 'react';
import { Button } from "@/components/ui/button";

const FAQ = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Frequently Asked Questions</h1>
      
      <div className="space-y-8 mb-12">
        <div className="bg-card rounded-lg p-6 shadow-sm dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Common Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2 dark:text-gray-200">How do I create a new list?</h3>
              <p className="text-muted-foreground dark:text-gray-300">
                To create a new list, simply click the "+" button on the main page. You can choose from different list types like grocery, todo, or custom lists.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2 dark:text-gray-200">Can I share my lists with others?</h3>
              <p className="text-muted-foreground dark:text-gray-300">
                Yes! Each list has a share button that allows you to share via email or generate a shareable link.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2 dark:text-gray-200">How do I organize items in my list?</h3>
              <p className="text-muted-foreground dark:text-gray-300">
                You can drag and drop items to reorder them. Lists can also be sorted alphabetically or by completion status.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2 dark:text-gray-200">Can I export my lists?</h3>
              <p className="text-muted-foreground dark:text-gray-300">
                Yes, you can export your lists to PDF format for easy sharing or printing. Look for the export option in the list menu.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2 dark:text-gray-200">Is there a limit to how many lists I can create?</h3>
              <p className="text-muted-foreground dark:text-gray-300">
                No, you can create as many lists as you need. There's no limit to the number of lists or items within each list.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2 dark:text-gray-200">Can I use the app offline?</h3>
              <p className="text-muted-foreground dark:text-gray-300">
                Yes, the app works offline. Your lists are stored locally on your device, and any changes will sync when you're back online.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2 dark:text-gray-200">How do I delete a list?</h3>
              <p className="text-muted-foreground dark:text-gray-300">
                To delete a list, open the list menu (three dots) and select the delete option. You'll be asked to confirm before the list is permanently removed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;