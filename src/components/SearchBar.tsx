import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

const SearchBar = ({ searchTerm, onSearch }: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        placeholder="Search items..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="pl-8 pr-4 py-2 h-9 text-sm bg-white/90 border-gray-200 focus:border-neon-blue focus:ring-neon-blue rounded-md"
      />
    </div>
  );
};

export default SearchBar;