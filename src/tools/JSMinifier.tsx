
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Minimize2, Copy, FileCode, Trash } from "lucide-react";

export default function JSMinifier() {
  const [js, setJs] = useState("");
  const [minifiedJs, setMinifiedJs] = useState("");
  const [options, setOptions] = useState({
    removeComments: true,
    removeWhitespace: true,
    removeNewlines: true,
    trimSemicolons: true,
  });

  const minifyJS = () => {
    if (!js.trim()) {
      toast.error("Please enter some JavaScript to minify");
      return;
    }

    try {
      let result = js;

      // Remove comments (single line and multi-line)
      if (options.removeComments) {
        // Remove single line comments
        result = result.replace(/\/\/.*$/gm, "");
        // Remove multi-line comments
        result = result.replace(/\/\*[\s\S]*?\*\//g, "");
      }

      // Remove whitespace
      if (options.removeWhitespace) {
        result = result.replace(/^\s+|\s+$/gm, "");  // Trim each line
        result = result.replace(/\s+/g, " ");        // Collapse whitespace
        result = result.replace(/\s*([=:+\-*\/&|!<>{}()\[\],;])\s*/g, "$1"); // Remove space around operators
      }

      // Remove newlines
      if (options.removeNewlines) {
        result = result.replace(/\n/g, "");
      }

      // Trim semicolons
      if (options.trimSemicolons) {
        result = result.replace(/;\s*}/g, "}");      // Remove semicolons before closing braces
      }

      setMinifiedJs(result);
      
      // Calculate size reduction
      const originalSize = new Blob([js]).size;
      const minifiedSize = new Blob([result]).size;
      const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2);
      
      toast.success(`JavaScript minified successfully! Size reduced by ${reduction}%`);
    } catch (error) {
      toast.error("Failed to minify JavaScript: The code may contain syntax errors");
    }
  };

  const copyToClipboard = () => {
    if (!minifiedJs) {
      toast.error("No minified JavaScript to copy");
      return;
    }

    navigator.clipboard.writeText(minifiedJs)
      .then(() => toast.success("Minified JavaScript copied to clipboard"))
      .catch(() => toast.error("Failed to copy JavaScript"));
  };

  const clearAll = () => {
    setJs("");
    setMinifiedJs("");
    toast.info("Cleared all JavaScript content");
  };

  const formatJS = () => {
    if (!js.trim()) {
      toast.error("Please enter some JavaScript to format");
      return;
    }

    try {
      // Basic JS formatting
      let result = js;
      
      // Handle comments
      result = result.replace(/\/\/.*$/gm, match => match.trim());  // Preserve single line comments
      
      // Format structure
      result = result.replace(/\s*{\s*/g, " {\n  ");
      result = result.replace(/;\s*/g, ";\n  ");
      result = result.replace(/\s*}\s*/g, "\n}\n");
      result = result.replace(/\n\s*\n/g, "\n");  // Remove empty lines
      
      // Format operators
      result = result.replace(/\s*([=:+\-*\/&|!<>])\s*/g, " $1 ");
      
      // Clean up multiple spaces
      result = result.replace(/[ \t]+/g, " ");
      
      // Format function declarations
      result = result.replace(/function\s*\(\s*/g, "function(");
      result = result.replace(/\)\s*{/g, ") {");
      
      // Trim each line
      result = result.split('\n').map(line => line.trim()).join('\n');
      
      setJs(result);
      toast.success("JavaScript formatted successfully");
    } catch (error) {
      toast.error("Failed to format JavaScript");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>JavaScript Minifier</CardTitle>
          <CardDescription>
            Minify your JavaScript code to reduce file size
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original JavaScript
                </label>
                <Textarea
                  value={js}
                  onChange={(e) => setJs(e.target.value)}
                  placeholder="Paste your JavaScript code here..."
                  className="min-h-[300px] font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minified JavaScript
                </label>
                <Textarea
                  value={minifiedJs}
                  readOnly
                  placeholder="Minified code will appear here..."
                  className="min-h-[300px] font-mono text-sm bg-gray-50"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="text-sm font-medium">Minification Options</div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="removeComments" 
                    checked={options.removeComments}
                    onCheckedChange={(checked) => 
                      setOptions({...options, removeComments: !!checked})
                    }
                  />
                  <Label htmlFor="removeComments">Remove comments</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="removeWhitespace" 
                    checked={options.removeWhitespace}
                    onCheckedChange={(checked) => 
                      setOptions({...options, removeWhitespace: !!checked})
                    }
                  />
                  <Label htmlFor="removeWhitespace">Remove whitespace</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="removeNewlines" 
                    checked={options.removeNewlines}
                    onCheckedChange={(checked) => 
                      setOptions({...options, removeNewlines: !!checked})
                    }
                  />
                  <Label htmlFor="removeNewlines">Remove newlines</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="trimSemicolons" 
                    checked={options.trimSemicolons}
                    onCheckedChange={(checked) => 
                      setOptions({...options, trimSemicolons: !!checked})
                    }
                  />
                  <Label htmlFor="trimSemicolons">Trim unnecessary semicolons</Label>
                </div>
              </div>
              
              <div className="space-y-2">
                {minifiedJs && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-medium mb-2">Statistics</div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Original size:</span>
                        <span>{new Blob([js]).size} bytes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Minified size:</span>
                        <span>{new Blob([minifiedJs]).size} bytes</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Reduction:</span>
                        <span>
                          {(100 - (new Blob([minifiedJs]).size / new Blob([js]).size * 100)).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                  <div className="text-sm font-medium text-yellow-800 mb-2">Note</div>
                  <p className="text-sm text-yellow-700">
                    This is a basic minifier. For production use, consider using 
                    tools like Terser, UglifyJS, or Webpack's minification plugins 
                    which provide more advanced optimizations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <div className="flex space-x-2 w-full sm:w-auto">
            <Button variant="outline" onClick={clearAll}>
              <Trash className="h-4 w-4 mr-2" />
              Clear
            </Button>
            <Button variant="outline" onClick={formatJS}>
              <FileCode className="h-4 w-4 mr-2" />
              Format
            </Button>
            <Button variant="outline" onClick={copyToClipboard} disabled={!minifiedJs}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
          <Button onClick={minifyJS} className="w-full sm:w-auto">
            <Minimize2 className="h-4 w-4 mr-2" />
            Minify JavaScript
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
