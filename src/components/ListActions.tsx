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
    <div className="flex gap-2 mb-4">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Add new item..."
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && !isLocked && handleAddItem()}
          className="w-full pl-4 pr-10 py-2 text-sm rounded-xl border border-primary/20 focus:border-primary focus:ring-primary/20 bg-white/80 backdrop-blur-sm shadow-sm"
          disabled={isLocked}
        />
      </div>
      <Button 
        onClick={handleAddItem} 
        disabled={isLocked}
        className="bg-primary hover:bg-primary-dark transition-all duration-300 rounded-xl shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
      >
        <Plus className="h-4 w-4 text-white" />
      </Button>
    </div>
  );
};

export default ListActions;