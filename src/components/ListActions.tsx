import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState, useEffect } from "react";

interface ListActionsProps {
  newItemText: string;
  setNewItemText: (text: string) => void;
  isLocked: boolean;
  onAddItem: () => void;
}

const WORD_LIMIT = 25;

const ListActions = ({ newItemText, setNewItemText, isLocked, onAddItem }: ListActionsProps) => {
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const words = newItemText.trim().split(/\s+/);
    setWordCount(words[0] === "" ? 0 : words.length);
  }, [newItemText]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/);
    const currentWordCount = words[0] === "" ? 0 : words.length;

    if (currentWordCount <= WORD_LIMIT) {
      setNewItemText(text);
    } else {
      toast.error("Word limit reached (25 words maximum)", {
        style: {
          background: "#FEE2E2",
          border: "1px solid #FCA5A5",
          color: "#991B1B",
        },
      });
    }
  };

  const handleAddItem = () => {
    if (isLocked) {
      toast.error("List is locked. Unlock to add items.", {
        style: {
          background: "#FEE2E2",
          border: "1px solid #FCA5A5",
          color: "#991B1B",
        },
      });
      return;
    }
    onAddItem();
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Add new item..."
            value={newItemText}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === "Enter" && !isLocked && handleAddItem()}
            className="w-full pl-4 pr-10 py-2 text-sm rounded-xl border border-primary/20 focus:border-primary focus:ring-primary/20 
              bg-white/80 dark:bg-gray-800/80 dark:text-gray-100 dark:placeholder-gray-400 
              backdrop-blur-sm shadow-sm dark:shadow-lg dark:shadow-black/20
              dark:border-gray-700 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
            disabled={isLocked}
          />
        </div>
        <Button 
          onClick={handleAddItem} 
          disabled={isLocked}
          className="bg-primary hover:bg-primary-dark transition-all duration-300 rounded-xl 
            shadow-sm hover:shadow-md dark:bg-blue-500 dark:hover:bg-blue-600
            dark:shadow-lg dark:shadow-black/20"
        >
          <Plus className="h-4 w-4 text-white" />
        </Button>
      </div>
      <div className={`text-xs ${wordCount >= WORD_LIMIT ? 'text-red-500 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
        {wordCount} / {WORD_LIMIT} words
      </div>
    </div>
  );
};

export default ListActions;