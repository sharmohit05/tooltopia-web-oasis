
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="hero-gradient"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">All the tools you need in one place</h1>
          <p className="text-xl text-gray-600 mb-8">
            Tooltopia offers 50+ free online tools to help you with everyday tasks. Simple, fast, and free.
          </p>
          
          <form onSubmit={handleSearch} className="relative mx-auto max-w-md mb-10 group">
            <div className="search-gradient"></div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for tools..."
                className="w-full pl-12 pr-4 py-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-tool-purple/50 relative bg-white text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
            </div>
          </form>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-tool-purple hover:bg-tool-purple/90">
              <Link to="/categories">Browse All Tools</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/category/developer">Developer Tools</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
