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
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;