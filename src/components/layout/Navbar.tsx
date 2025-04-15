
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-tool-purple to-tool-blue bg-clip-text text-transparent">
                Tooltopia
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative group hidden sm:block">
              <div className="search-gradient"></div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tools..."
                  className="w-[200px] md:w-[300px] pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-tool-purple/50 relative bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </form>
            <Link to="/categories">
              <Button variant="outline">All Tools</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
