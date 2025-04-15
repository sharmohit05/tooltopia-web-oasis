
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ToolCard from "@/components/home/ToolCard";
import { searchTools, getCategoryById, Tool } from "@/data/toolsData";

const SearchResults = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const query = new URLSearchParams(location.search).get("q") || "";
    setSearchQuery(query);
    
    if (query) {
      setLoading(true);
      // Simulate network delay for search
      setTimeout(() => {
        const searchResults = searchTools(query);
        setResults(searchResults);
        setLoading(false);
      }, 400);
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [location.search]);
  
  const getCategoryColor = (categoryId: string) => {
    const category = getCategoryById(categoryId);
    return category ? category.color : "tool-purple";
  };
  
  return (
    <Layout>
      <div className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">
              {searchQuery ? `Search Results for "${searchQuery}"` : "Search Results"}
            </h1>
            <p className="text-lg text-gray-600">
              {loading
                ? "Searching for tools..."
                : results.length > 0
                ? `Found ${results.length} tool${results.length === 1 ? "" : "s"} matching your query`
                : "No tools found matching your query"}
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="w-12 h-12 border-t-4 border-tool-purple rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map((tool) => (
                <ToolCard 
                  key={tool.id} 
                  tool={tool} 
                  color={getCategoryColor(tool.category)} 
                />
              ))}
            </div>
          )}
          
          {!loading && results.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">
                We couldn't find any tools matching your search.
              </p>
              <p className="text-gray-500">
                Try using different keywords or browse our categories.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchResults;
