import React from "react";
import { Share2, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

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
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <Switch
            checked={showPricing}
            onCheckedChange={setShowPricing}
            disabled={isLocked}
          />
          <span className="text-sm font-medium">Show Pricing</span>
        </div>
        
        {showPricing && (
          <Input
            type="text"
            value={currencySymbol}
            onChange={(e) => setCurrencySymbol(e.target.value)}
            className="w-16 h-8"
            placeholder="$"
            disabled={isLocked}
          />
        )}
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full sm:w-64 h-9"
        />
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => onShare("message")}
          className="h-9 w-9 bg-white"
        >
          <Share2 className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={onExportPDF}
          className="h-9 w-9 bg-white"
        >
          <FileDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ListControls;