import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";
import CurrencySelector from "./CurrencySelector";
import ShareOptions from "./ShareOptions";
import SearchBar from "./SearchBar";

interface ListControlsProps {
  showPricing: boolean;
  setShowPricing: (show: boolean) => void;
  currencySymbol: string;
  setCurrencySymbol: (symbol: string) => void;
  isLocked: boolean;
  onShare: (method: string) => void;
  onExportPDF: () => void;
  searchTerm: string;
  onSearch: (term: string) => void;
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
  onSearch
}: ListControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 bg-white/80 shadow-sm rounded-xl p-4 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
        <div className="flex items-center space-x-3 bg-neon-blue-50 p-2 rounded-lg hover:bg-neon-blue-100 transition-colors duration-300">
          <DollarSign className="h-4 w-4 text-neon-blue" />
          <Switch
            checked={showPricing}
            onCheckedChange={setShowPricing}
            id="pricing-toggle"
            className="data-[state=checked]:bg-neon-blue"
          />
          <Label htmlFor="pricing-toggle" className="text-sm font-medium text-gray-700">
            Show Pricing
          </Label>
        </div>
        
        <div className="flex-1 min-w-0">
          <SearchBar searchTerm={searchTerm} onSearch={onSearch} />
        </div>
        
        {showPricing && (
          <CurrencySelector
            value={currencySymbol}
            onChange={setCurrencySymbol}
            disabled={isLocked}
          />
        )}
      </div>
      <ShareOptions onShare={onShare} onExportPDF={onExportPDF} />
    </div>
  );
};

export default ListControls;