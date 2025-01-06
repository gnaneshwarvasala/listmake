import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DollarSign, Share2, FileDown } from "lucide-react";
import CurrencySelector from "./CurrencySelector";
import ShareOptions from "./ShareOptions";

interface ListControlsProps {
  showPricing: boolean;
  setShowPricing: (show: boolean) => void;
  currencySymbol: string;
  setCurrencySymbol: (symbol: string) => void;
  isLocked: boolean;
  onShare: (method: string) => void;
  onExportPDF: () => void;
}

const ListControls = ({
  showPricing,
  setShowPricing,
  currencySymbol,
  setCurrencySymbol,
  isLocked,
  onShare,
  onExportPDF
}: ListControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 bg-white shadow-lg rounded-xl p-4 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
        <div className="flex items-center space-x-3 bg-gray-50 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 w-full sm:w-auto">
          <DollarSign className="h-5 w-5 text-primary animate-bounce" />
          <Switch
            checked={showPricing}
            onCheckedChange={setShowPricing}
            id="pricing-toggle"
            className="data-[state=checked]:bg-primary"
          />
          <Label htmlFor="pricing-toggle" className="font-medium text-gray-700">
            Show Pricing
          </Label>
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