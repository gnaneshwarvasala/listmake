import React from "react";
import { Share2, FileDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "./ThemeToggle";

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
    <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-3 rounded-custom border border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <Switch
            checked={showPricing}
            onCheckedChange={setShowPricing}
            disabled={isLocked}
          />
          <span className="text-sm font-medium dark:text-gray-200">Show Pricing</span>
        </div>
        
        {showPricing && (
          <Input
            type="text"
            value={currencySymbol}
            onChange={(e) => setCurrencySymbol(e.target.value)}
            className="w-16 h-8 rounded-custom"
            placeholder="$"
            disabled={isLocked}
          />
        )}
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <div className="relative flex-1 sm:w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-8 pr-4 h-9 rounded-custom"
          />
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => onShare("email")}
          className="h-9 w-9 rounded-custom bg-white dark:bg-gray-800"
        >
          <Share2 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={onExportPDF}
          className="h-9 w-9 rounded-custom bg-white dark:bg-gray-800"
        >
          <FileDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </Button>

        <ThemeToggle />
      </div>
    </div>
  );
};

export default ListControls;