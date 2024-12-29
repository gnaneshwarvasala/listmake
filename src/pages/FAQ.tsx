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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-8">
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          ← Back
        </Button>
        <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I create a new list?</AccordionTrigger>
            <AccordionContent>
              Simply click on the "+" button to add new items to your list. You can type your item and press Enter or click the Add button.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What does the lock feature do?</AccordionTrigger>
            <AccordionContent>
              When a list is locked, you can only mark items as complete. You cannot add new items or delete existing ones until you unlock the list.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How do I mark items as complete?</AccordionTrigger>
            <AccordionContent>
              Click the checkbox next to any item to mark it as complete. Completed items will show a checkmark and "Completed" text.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Can I reorder my list items?</AccordionTrigger>
            <AccordionContent>
              Yes! Simply drag and drop items to reorder them when the list is unlocked.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;