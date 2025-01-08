import React from "react";
import { FileDown, Search, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import ShareOptions from "./ShareOptions";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
    <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-background/80 dark:bg-gray-800/80 backdrop-blur-sm p-2.5 rounded-xl border shadow-sm transition-colors duration-200">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <DollarSign className={cn(
                  "h-4 w-4 transition-colors",
                  showPricing ? "text-primary" : "text-muted-foreground"
                )} />
                <Switch
                  checked={showPricing}
                  onCheckedChange={setShowPricing}
                  disabled={isLocked}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle price display</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {showPricing && (
          <Input
            type="text"
            value={currencySymbol}
            onChange={(e) => setCurrencySymbol(e.target.value)}
            className="w-14 h-8 text-sm rounded-lg bg-background dark:bg-gray-800"
            placeholder="$"
            disabled={isLocked}
          />
        )}
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <div className="relative flex-1 sm:w-48">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-8 pr-3 h-8 text-sm rounded-lg bg-background dark:bg-gray-800"
          />
        </div>
        
        <ShareOptions onShare={onShare} onExportPDF={onExportPDF} />
      </div>
    </div>
  );
};

export default ListControls;