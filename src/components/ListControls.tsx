import React from "react";
import { FileDown, Search, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "./ThemeToggle";
import ShareOptions from "./ShareOptions";

interface ListControlsProps {
  showPricing: boolean;
  setShowPricing: (value: boolean) => void;
  currencySymbol: string;
  setCurrencySymbol: (value: string) => void;
  isLocked: boolean;
  onShare: (method: string) => Promise<void>;
  onExportPDF: () => void;
  searchTerm: string;
  onSearch: (value: string) => void;
}

const ListControls = ({
  showPricing,
  setShowPricing,
  currencySymbol,
  setCurrencySymbol,
  isLocked,
  onShare,
  onExportPDF,
  searchTerm,
  onSearch,
}: ListControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-3 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPricing(!showPricing)}
            className={cn(
              "h-7 text-xs transition-all duration-300 rounded-lg",
              showPricing 
                ? "bg-primary text-white hover:bg-primary-dark" 
                : "hover:bg-primary/10"
            )}
            disabled={isLocked}
          >
            Show Price
          </Button>
        </div>
        
        {showPricing && (
          <Input
            type="text"
            value={currencySymbol}
            onChange={(e) => setCurrencySymbol(e.target.value)}
            className="w-14 h-7 text-xs rounded-lg"
            placeholder="$"
            disabled={isLocked}
          />
        )}
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <div className="relative flex-1 sm:w-48">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary h-3 w-3" />
          <Input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-7 pr-3 h-7 text-xs rounded-lg border-primary/20 focus:border-primary focus:ring-primary/20"
          />
        </div>
        
        <ShareOptions onShare={onShare} onExportPDF={onExportPDF} />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default ListControls;