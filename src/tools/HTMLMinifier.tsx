
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Minimize2, Copy, FileCode, Trash, ArrowLeftRight } from "lucide-react";

export default function HTMLMinifier() {
  const [html, setHtml] = useState("");
  const [minifiedHtml, setMinifiedHtml] = useState("");
  const [options, setOptions] = useState({
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    collapseWhitespace: true,
    removeOptionalTags: false,
  });

  const minifyHTML = () => {
    if (!html.trim()) {
      toast.error("Please enter some HTML to minify");
      return;
    }

    let result = html;

    // Remove comments
    if (options.removeComments) {
      result = result.replace(/<!--[\s\S]*?-->/g, "");
    }

    // Remove empty attributes
    if (options.removeEmptyAttributes) {
      result = result.replace(/\s+(\w+)=""/g, "");
    }

    // Remove redundant attributes
    if (options.removeRedundantAttributes) {
      // Remove type="text" from input
      result = result.replace(/\s+type="text"/g, "");
      // Remove method="get" from form
      result = result.replace(/\s+method="get"/g, "");
    }

    // Collapse whitespace
    if (options.collapseWhitespace) {
      result = result.replace(/\s{2,}/g, " ");
      result = result.replace(/>\s+</g, "><");
      result = result.trim();
    }

    // Remove optional tags (simplified version)
    if (options.removeOptionalTags) {
      result = result.replace(/<\/li>/g, "");
      result = result.replace(/<\/dt>/g, "");
      result = result.replace(/<\/dd>/g, "");
      result = result.replace(/<\/p>/g, "");
      result = result.replace(/<\/option>/g, "");
    }

    setMinifiedHtml(result);
    
    // Calculate size reduction
    const originalSize = new Blob([html]).size;
    const minifiedSize = new Blob([result]).size;
    const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2);
    
    toast.success(`HTML minified successfully! Size reduced by ${reduction}%`);
  };

  const copyToClipboard = () => {
    if (!minifiedHtml) {
      toast.error("No minified HTML to copy");
      return;
    }

    navigator.clipboard.writeText(minifiedHtml)
      .then(() => toast.success("Minified HTML copied to clipboard"))
      .catch(() => toast.error("Failed to copy HTML"));
  };

  const clearAll = () => {
    setHtml("");
    setMinifiedHtml("");
    toast.info("Cleared all HTML content");
  };

  const formatHTML = () => {
    if (!html.trim()) {
      toast.error("Please enter some HTML to format");
      return;
    }

    try {
      const formatted = html
        .replace(/></g, ">\n<")
        .replace(/(<[^<]+>)/g, match => {
          return match.replace(/\s+/g, " ");
        });
        
      // Basic indentation (simplified)
      let formattedHTML = "";
      let indent = 0;
      const lines = formatted.split("\n");
      
      for (let line of lines) {
        const trimmedLine = line.trim();
        
        if (trimmedLine.match(/<\/[^>]+>/)) {
          indent = Math.max(0, indent - 1);
        }
        
        formattedHTML += "  ".repeat(indent) + trimmedLine + "\n";
        
        if (trimmedLine.match(/<[^\/][^>]*>(?!.*<\/[^>]+>)/)) {
          indent++;
        }
      }
      
      setHtml(formattedHTML.trim());
      toast.success("HTML formatted successfully");
    } catch (error) {
      toast.error("Failed to format HTML");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>HTML Minifier</CardTitle>
          <CardDescription>
            Minify your HTML code to reduce file size
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original HTML
                </label>
                <Textarea
                  value={html}
                  onChange={(e) => setHtml(e.target.value)}
                  placeholder="Paste your HTML code here..."
                  className="min-h-[300px] font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minified HTML
                </label>
                <Textarea
                  value={minifiedHtml}
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
                    id="removeEmptyAttributes" 
                    checked={options.removeEmptyAttributes}
                    onCheckedChange={(checked) => 
                      setOptions({...options, removeEmptyAttributes: !!checked})
                    }
                  />
                  <Label htmlFor="removeEmptyAttributes">Remove empty attributes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="removeRedundantAttributes" 
                    checked={options.removeRedundantAttributes}
                    onCheckedChange={(checked) => 
                      setOptions({...options, removeRedundantAttributes: !!checked})
                    }
                  />
                  <Label htmlFor="removeRedundantAttributes">Remove redundant attributes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="collapseWhitespace" 
                    checked={options.collapseWhitespace}
                    onCheckedChange={(checked) => 
                      setOptions({...options, collapseWhitespace: !!checked})
                    }
                  />
                  <Label htmlFor="collapseWhitespace">Collapse whitespace</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="removeOptionalTags" 
                    checked={options.removeOptionalTags}
                    onCheckedChange={(checked) => 
                      setOptions({...options, removeOptionalTags: !!checked})
                    }
                  />
                  <Label htmlFor="removeOptionalTags">Remove optional tags</Label>
                </div>
              </div>
              
              <div className="space-y-2">
                {minifiedHtml && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-medium mb-2">Statistics</div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Original size:</span>
                        <span>{new Blob([html]).size} bytes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Minified size:</span>
                        <span>{new Blob([minifiedHtml]).size} bytes</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Reduction:</span>
                        <span>
                          {(100 - (new Blob([minifiedHtml]).size / new Blob([html]).size * 100)).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}
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
            <Button variant="outline" onClick={formatHTML}>
              <FileCode className="h-4 w-4 mr-2" />
              Format
            </Button>
            <Button variant="outline" onClick={copyToClipboard} disabled={!minifiedHtml}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
          <Button onClick={minifyHTML} className="w-full sm:w-auto">
            <Minimize2 className="h-4 w-4 mr-2" />
            Minify HTML
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
