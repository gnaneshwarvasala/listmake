import { Share2, Download, Mail, Link2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface ShareOptionsProps {
  onShare: (method: string) => void;
  onExportPDF: () => void;
}

const ShareOptions = ({ onShare, onExportPDF }: ShareOptionsProps) => {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="flex space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 px-2.5 h-8"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span className="text-sm">Share</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => onShare("email")}>
            <Mail className="h-3.5 w-3.5 mr-2" />
            <span className="text-sm">Email</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onShare("message")}>
            <MessageSquare className="h-3.5 w-3.5 mr-2" />
            <span className="text-sm">Message</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyLink}>
            <Link2 className="h-3.5 w-3.5 mr-2" />
            <span className="text-sm">Copy Link</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="outline"
        size="sm"
        onClick={onExportPDF}
        className="flex items-center gap-1.5 px-2.5 h-8"
      >
        <Download className="h-3.5 w-3.5" />
        <span className="text-sm">Export PDF</span>
      </Button>
    </div>
  );
};

export default ShareOptions;