import { Plus } from "lucide-react";
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
      <Input
        type="text"
        placeholder="Add new item..."
        value={newItemText}
        onChange={(e) => setNewItemText(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && !isLocked && handleAddItem()}
        className="flex-1"
        disabled={isLocked}
      />
      <Button 
        onClick={handleAddItem} 
        disabled={isLocked}
        className="bg-purple-500 hover:bg-purple-600 transition-colors duration-300"
      >
        <Plus className="h-5 w-5 text-white" />
      </Button>
    </div>
  );
};

export default ListActions;