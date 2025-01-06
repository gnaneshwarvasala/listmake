import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

const SearchBar = ({ searchTerm, onSearch }: SearchBarProps) => {
  return (
    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <Input
        type="text"
        placeholder="Search items..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="pl-10 pr-4 py-2 w-full bg-white/80 backdrop-blur-sm border-2 border-primary/20 focus:border-primary rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
      />
    </div>
  );
};

export default SearchBar;