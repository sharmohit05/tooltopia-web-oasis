
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Minimize2, Copy, FileCode, Trash } from "lucide-react";

export default function CSSMinifier() {
  const [css, setCss] = useState("");
  const [minifiedCss, setMinifiedCss] = useState("");
  const [options, setOptions] = useState({
    removeComments: true,
    removeWhitespace: true,
    removeNewlines: true,
    compressBraces: true,
    compressColors: true,
  });

  const minifyCSS = () => {
    if (!css.trim()) {
      toast.error("Please enter some CSS to minify");
      return;
    }

    let result = css;

    // Remove comments
    if (options.removeComments) {
      result = result.replace(/\/\*[\s\S]*?\*\//g, "");
    }

    // Compress colors - convert #RRGGBB to #RGB when possible
    if (options.compressColors) {
      result = result.replace(/#([0-9a-f])\1([0-9a-f])\2([0-9a-f])\3/gi, "#$1$2$3");
    }

    // Compress braces and colons
    if (options.compressBraces) {
      result = result.replace(/\s*{\s*/g, "{");
      result = result.replace(/\s*}\s*/g, "}");
      result = result.replace(/\s*:\s*/g, ":");
      result = result.replace(/\s*;\s*/g, ";");
      result = result.replace(/;}/g, "}");
    }

    // Remove whitespace
    if (options.removeWhitespace) {
      result = result.replace(/\s+/g, " ");
      result = result.replace(/^\s+|\s+$/g, "");
    }

    // Remove newlines
    if (options.removeNewlines) {
      result = result.replace(/\n/g, "");
    }

    setMinifiedCss(result);
    
    // Calculate size reduction
    const originalSize = new Blob([css]).size;
    const minifiedSize = new Blob([result]).size;
    const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2);
    
    toast.success(`CSS minified successfully! Size reduced by ${reduction}%`);
  };

  const copyToClipboard = () => {
    if (!minifiedCss) {
      toast.error("No minified CSS to copy");
      return;
    }

    navigator.clipboard.writeText(minifiedCss)
      .then(() => toast.success("Minified CSS copied to clipboard"))
      .catch(() => toast.error("Failed to copy CSS"));
  };

  const clearAll = () => {
    setCss("");
    setMinifiedCss("");
    toast.info("Cleared all CSS content");
  };

  const formatCSS = () => {
    if (!css.trim()) {
      toast.error("Please enter some CSS to format");
      return;
    }

    try {
      // Basic CSS formatting
      const formatted = css
        .replace(/\/\*[\s\S]*?\*\//g, match => match.trim())  // Preserve comments
        .replace(/\s*{\s*/g, " {\n  ")
        .replace(/;\s*/g, ";\n  ")
        .replace(/\s*}\s*/g, "\n}\n")
        .replace(/\n\s*\n/g, "\n")  // Remove empty lines
        .replace(/\s*:\s*/g, ": ")
        .replace(/\s*,\s*/g, ", ")
        .trim();
        
      setCss(formatted);
      toast.success("CSS formatted successfully");
    } catch (error) {
      toast.error("Failed to format CSS");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>CSS Minifier</CardTitle>
          <CardDescription>
            Minify your CSS code to reduce file size
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original CSS
                </label>
                <Textarea
                  value={css}
                  onChange={(e) => setCss(e.target.value)}
                  placeholder="Paste your CSS code here..."
                  className="min-h-[300px] font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minified CSS
                </label>
                <Textarea
                  value={minifiedCss}
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
                    id="compressBraces" 
                    checked={options.compressBraces}
                    onCheckedChange={(checked) => 
                      setOptions({...options, compressBraces: !!checked})
                    }
                  />
                  <Label htmlFor="compressBraces">Compress braces & syntax</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="compressColors" 
                    checked={options.compressColors}
                    onCheckedChange={(checked) => 
                      setOptions({...options, compressColors: !!checked})
                    }
                  />
                  <Label htmlFor="compressColors">Compress colors (#RRGGBB → #RGB)</Label>
                </div>
              </div>
              
              <div className="space-y-2">
                {minifiedCss && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-medium mb-2">Statistics</div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Original size:</span>
                        <span>{new Blob([css]).size} bytes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Minified size:</span>
                        <span>{new Blob([minifiedCss]).size} bytes</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Reduction:</span>
                        <span>
                          {(100 - (new Blob([minifiedCss]).size / new Blob([css]).size * 100)).toFixed(2)}%
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
            <Button variant="outline" onClick={formatCSS}>
              <FileCode className="h-4 w-4 mr-2" />
              Format
            </Button>
            <Button variant="outline" onClick={copyToClipboard} disabled={!minifiedCss}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
          <Button onClick={minifyCSS} className="w-full sm:w-auto">
            <Minimize2 className="h-4 w-4 mr-2" />
            Minify CSS
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
