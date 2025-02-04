import { List, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <List className="h-6 w-6 text-neon-blue-500 dark:text-neon-blue-400" />
          <Link 
            to="/" 
            className="text-xl font-semibold text-gray-900 dark:text-gray-100 hover:text-neon-blue-500 dark:hover:text-neon-blue-400 transition-colors"
          >
            Smart List
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            to="/settings"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <Settings className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;