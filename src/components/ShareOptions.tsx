import { Share2, Download, Mail, MessageSquare, Link2 } from "lucide-react";
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
            size="icon"
            className="h-8 w-8"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => onShare("email")}>
            <Mail className="h-4 w-4 mr-2" />
            <span>Email</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onShare("message")}>
            <MessageSquare className="h-4 w-4 mr-2" />
            <span>Message</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyLink}>
            <Link2 className="h-4 w-4 mr-2" />
            <span>Copy Link</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="outline"
        size="icon"
        onClick={onExportPDF}
        className="h-8 w-8"
      >
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ShareOptions;