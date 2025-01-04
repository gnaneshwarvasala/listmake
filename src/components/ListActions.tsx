import { Plus, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ListActionsProps {
  newItemText: string;
  setNewItemText: (text: string) => void;
  isLocked: boolean;
  onAddItem: () => void;
}

const ListActions = ({ newItemText, setNewItemText, isLocked, onAddItem }: ListActionsProps) => {
  const handleAddItem = () => {
    if (isLocked) {
      toast.error("List is locked. Unlock to add items.");
      return;
    }
    onAddItem();
  };

  return (
    <div className="flex gap-2 mb-6">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Add new item..."
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && !isLocked && handleAddItem()}
          className="w-full pl-4 pr-10 py-2 text-lg rounded-xl border-2 border-purple-100 focus:border-purple-300 focus:ring-purple-200 bg-white/80 backdrop-blur-sm shadow-sm"
          disabled={isLocked}
        />
      </div>
      <Button 
        onClick={handleAddItem} 
        disabled={isLocked}
        className="bg-purple-500 hover:bg-purple-600 transition-colors duration-300 rounded-xl shadow-lg hover:shadow-xl"
      >
        <Plus className="h-5 w-5 text-white" />
      </Button>
      <Button
        variant="outline"
        className="rounded-xl border-2 border-purple-100 hover:border-purple-300 shadow-sm hover:shadow-md"
      >
        <Mic className="h-5 w-5 text-purple-500" />
      </Button>
    </div>
  );
};

export default ListActions;