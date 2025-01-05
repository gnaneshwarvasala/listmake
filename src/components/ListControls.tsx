import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 bg-white/80 p-4 rounded-lg shadow-sm backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center space-x-2">
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