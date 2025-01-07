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
            className="h-7 w-7 rounded-lg hover:bg-orange-50 hover:text-orange-500 dark:hover:bg-orange-900/20"
          >
            <Share2 className="h-3.5 w-3.5 transform hover:scale-110 transition-transform duration-200" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => onShare("email")} className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
            <Mail className="h-4 w-4 mr-2 text-blue-500" />
            <span>Email</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onShare("message")} className="hover:bg-green-50 dark:hover:bg-green-900/20">
            <MessageSquare className="h-4 w-4 mr-2 text-green-500" />
            <span>Message</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyLink} className="hover:bg-purple-50 dark:hover:bg-purple-900/20">
            <Link2 className="h-4 w-4 mr-2 text-purple-500" />
            <span>Copy Link</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="outline"
        size="icon"
        onClick={onExportPDF}
        className="h-7 w-7 rounded-lg hover:bg-primary/10 hover:text-primary dark:hover:bg-primary-dark/20"
      >
        <Download className="h-3.5 w-3.5 transform hover:scale-110 transition-transform duration-200" />
      </Button>
    </div>
  );
};

export default ShareOptions;