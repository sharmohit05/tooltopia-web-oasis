
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Copy, ArrowDown, RefreshCw } from "lucide-react";

export default function TextToSlugConverter() {
  const [inputText, setInputText] = useState("");
  const [outputSlug, setOutputSlug] = useState("");
  const [separator, setSeparator] = useState("-");
  const [lowercase, setLowercase] = useState(true);
  const [removeStopWords, setRemoveStopWords] = useState(false);
  const [maxLength, setMaxLength] = useState(0);

  // Common English stop words
  const stopWords = [
    "a", "an", "the", "and", "or", "but", "is", "are", "was", "were", "be", "been", "being",
    "in", "on", "at", "to", "for", "with", "by", "about", "of", "from", "as", "into", "through",
    "during", "before", "after", "above", "below", "under", "over", "between", "among", "this",
    "that", "these", "those", "my", "your", "his", "her", "its", "our", "their", "which", "who",
    "whom", "whose", "what", "why", "when", "where", "how", "all", "any", "both", "each", "few",
    "more", "most", "some", "such", "no", "not", "only", "own", "same", "so", "than", "too",
    "very", "can", "will", "just", "should", "now"
  ];

  const convertToSlug = () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to convert");
      return;
    }

    let slug = inputText;
    
    // Convert to lowercase if option is enabled
    if (lowercase) {
      slug = slug.toLowerCase();
    }
    
    // Remove accents/diacritics
    slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Handle specific characters before general replacement
    slug = slug
      .replace(/&/g, " and ")    // Replace & with "and"
      .replace(/\+/g, " plus ")  // Replace + with "plus"
      .replace(/@/g, " at ")     // Replace @ with "at"
      .replace(/#/g, " hash ");  // Replace # with "hash"
    
    // Remove stop words if option is enabled
    if (removeStopWords) {
      const words = slug.split(/\s+/);
      slug = words.filter(word => !stopWords.includes(word.toLowerCase())).join(" ");
    }
    
    // Replace non-alphanumeric characters with separator
    slug = slug.replace(/[^a-zA-Z0-9]+/g, separator);
    
    // Replace multiple consecutive separators with a single one
    const escapedSeparator = separator.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const separatorRegex = new RegExp(`${escapedSeparator}+`, 'g');
    slug = slug.replace(separatorRegex, separator);
    
    // Remove separator from start and end
    slug = slug.replace(new RegExp(`^${escapedSeparator}|${escapedSeparator}$`, 'g'), '');
    
    // Enforce max length if specified
    if (maxLength > 0 && slug.length > maxLength) {
      // Try to cut at the last separator before maxLength
      const lastSepIndex = slug.lastIndexOf(separator, maxLength);
      if (lastSepIndex > 0) {
        slug = slug.substring(0, lastSepIndex);
      } else {
        slug = slug.substring(0, maxLength);
      }
    }
    
    setOutputSlug(slug);
    toast.success("Text converted to slug successfully");
  };

  const copyToClipboard = () => {
    if (!outputSlug) {
      toast.error("No slug to copy");
      return;
    }
    
    navigator.clipboard.writeText(outputSlug)
      .then(() => toast.success("Slug copied to clipboard"))
      .catch(() => toast.error("Failed to copy slug"));
  };

  const clearText = () => {
    setInputText("");
    setOutputSlug("");
    toast.info("Text cleared");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Text to Slug Converter</CardTitle>
          <CardDescription>
            Convert text to URL-friendly slug format
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input Text
              </label>
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to convert to slug..."
                className="min-h-[100px]"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="separator" className="block text-sm font-medium text-gray-700 mb-2">
                    Separator
                  </label>
                  <div className="flex space-x-2">
                    <Button 
                      variant={separator === "-" ? "default" : "outline"}
                      onClick={() => setSeparator("-")}
                      className="flex-1"
                    >
                      Hyphen (-)
                    </Button>
                    <Button 
                      variant={separator === "_" ? "default" : "outline"}
                      onClick={() => setSeparator("_")}
                      className="flex-1"
                    >
                      Underscore (_)
                    </Button>
                    <Button 
                      variant={separator === "." ? "default" : "outline"}
                      onClick={() => setSeparator(".")}
                      className="flex-1"
                    >
                      Dot (.)
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="lowercase"
                      checked={lowercase}
                      onChange={(e) => setLowercase(e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="lowercase">Convert to lowercase</label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="removeStopWords"
                      checked={removeStopWords}
                      onChange={(e) => setRemoveStopWords(e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="removeStopWords">Remove common stop words</label>
                  </div>
                  
                  <div>
                    <label htmlFor="maxLength" className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum Length (0 for no limit)
                    </label>
                    <Input
                      id="maxLength"
                      type="number"
                      min="0"
                      value={maxLength}
                      onChange={(e) => setMaxLength(parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Output Slug
                </label>
                <div className="relative">
                  <Input
                    value={outputSlug}
                    readOnly
                    className="bg-gray-50 pr-10"
                    placeholder="Converted slug will appear here..."
                  />
                  {outputSlug && (
                    <button
                      onClick={copyToClipboard}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      title="Copy to clipboard"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  )}
                </div>
                
                <div className="flex justify-center py-4">
                  <ArrowDown className="h-8 w-8 text-gray-300" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Preview
                  </label>
                  <div className="p-3 bg-gray-50 border rounded-md text-sm text-gray-500 break-all">
                    {outputSlug 
                      ? `https://example.com/${outputSlug}` 
                      : "URL preview will appear here..."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={clearText}>
            Clear
          </Button>
          <Button onClick={convertToSlug} className="space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Convert to Slug</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
