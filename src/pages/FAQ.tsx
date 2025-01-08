import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
      <div className="max-w-2xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4 dark:text-gray-300 dark:hover:text-white"
        >
          ← Back
        </Button>
        <h1 className="text-3xl font-bold mb-6 dark:text-gray-100">Frequently Asked Questions</h1>
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="item-1" className="dark:border-gray-700">
            <AccordionTrigger className="dark:text-gray-200">How do I create and manage lists?</AccordionTrigger>
            <AccordionContent className="dark:text-gray-300">
              Creating a list is simple! Click the "+" button to add new items. You can drag and drop items to reorder them, mark them as complete with a checkbox, and delete items using the trash icon. Lists can be categorized and customized with different titles and settings.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="dark:border-gray-700">
            <AccordionTrigger className="dark:text-gray-200">What does the lock feature do?</AccordionTrigger>
            <AccordionContent className="dark:text-gray-300">
              The lock feature prevents accidental changes to your list. When locked, you can't add, delete, or reorder items, but you can still mark items as complete. This is particularly useful when sharing lists with others or when you want to preserve a specific order.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="dark:border-gray-700">
            <AccordionTrigger className="dark:text-gray-200">How does the pricing feature work?</AccordionTrigger>
            <AccordionContent className="dark:text-gray-300">
              The pricing feature allows you to add costs to list items. Toggle it on using the price switch, then enter prices for each item. The total is automatically calculated and displayed at the bottom of your list. You can also customize the currency symbol.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="dark:border-gray-700">
            <AccordionTrigger className="dark:text-gray-200">Can I share my lists with others?</AccordionTrigger>
            <AccordionContent className="dark:text-gray-300">
              Yes! You can share lists via email or generate a shareable link. You can also export lists as PDF files for easy sharing or printing. Consider locking the list before sharing to prevent unwanted changes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5" className="dark:border-gray-700">
            <AccordionTrigger className="dark:text-gray-200">How do I use dark mode?</AccordionTrigger>
            <AccordionContent className="dark:text-gray-300">
              Click the sun/moon icon in the top right corner to toggle between light and dark modes. Your preference will be saved automatically for future visits.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6" className="dark:border-gray-700">
            <AccordionTrigger className="dark:text-gray-200">Is my data saved automatically?</AccordionTrigger>
            <AccordionContent className="dark:text-gray-300">
              Yes, all changes are saved automatically to your browser's local storage. However, clearing your browser data will remove your lists, so consider exporting important lists as PDFs for backup.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;