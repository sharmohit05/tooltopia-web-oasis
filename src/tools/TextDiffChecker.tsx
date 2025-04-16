import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Copy, ArrowLeftRight } from "lucide-react";

export default function TextDiffChecker() {
  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");
  const [diffResult, setDiffResult] = useState<string[]>([]);
  const [diffView, setDiffView] = useState("inline");
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);

  const compareTexts = () => {
    if (!leftText.trim() || !rightText.trim()) {
      toast.error("Please enter text in both fields to compare");
      return;
    }
    
    let leftLines = leftText.split('\n');
    let rightLines = rightText.split('\n');
    
    // Preprocessing based on options
    if (!caseSensitive) {
      leftLines = leftLines.map(line => line.toLowerCase());
      rightLines = rightLines.map(line => line.toLowerCase());
    }
    
    if (ignoreWhitespace) {
      leftLines = leftLines.map(line => line.trim().replace(/\s+/g, ' '));
      rightLines = rightLines.map(line => line.trim().replace(/\s+/g, ' '));
    }
    
    // Basic line-by-line diff
    const result: string[] = [];
    const maxLength = Math.max(leftLines.length, rightLines.length);
    
    for (let i = 0; i < maxLength; i++) {
      const leftLine = i < leftLines.length ? leftLines[i] : "";
      const rightLine = i < rightLines.length ? rightLines[i] : "";
      
      if (leftLine === rightLine) {
        // Lines are identical
        result.push(`  ${leftLine}`);
      } else {
        // Lines are different
        if (leftLine) {
          result.push(`- ${leftLine}`);
        }
        if (rightLine) {
          result.push(`+ ${rightLine}`);
        }
      }
    }
    
    setDiffResult(result);
    toast.success("Comparison completed");
  };

  const copyDiffToClipboard = () => {
    if (diffResult.length === 0) {
      toast.error("No diff result to copy");
      return;
    }
    
    const diffText = diffResult.join('\n');
    navigator.clipboard.writeText(diffText)
      .then(() => toast.success("Diff result copied to clipboard"))
      .catch(() => toast.error("Failed to copy diff result"));
  };

  const swapTexts = () => {
    setLeftText(rightText);
    setRightText(leftText);
    toast.info("Texts swapped");
  };

  const clearTexts = () => {
    setLeftText("");
    setRightText("");
    setDiffResult([]);
    toast.info("Texts cleared");
  };

  const getColoredDiffView = () => {
    return (
      <pre className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-[400px] whitespace-pre-wrap">
        {diffResult.map((line, index) => {
          if (line.startsWith('+ ')) {
            return <div key={index} className="bg-green-100 text-green-800">{line}</div>;
          } else if (line.startsWith('- ')) {
            return <div key={index} className="bg-red-100 text-red-800">{line}</div>;
          } else {
            return <div key={index}>{line}</div>;
          }
        })}
      </pre>
    );
  };

  const getSideBySideView = () => {
    // Group diff lines by added/removed/unchanged
    const leftOutput: JSX.Element[] = [];
    const rightOutput: JSX.Element[] = [];
    
    let i = 0;
    while (i < diffResult.length) {
      const line = diffResult[i];
      
      if (line.startsWith('- ')) {
        // Line removed from left
        const nextLine = i + 1 < diffResult.length ? diffResult[i + 1] : "";
        
        if (nextLine.startsWith('+ ')) {
          // Accompanied by an addition on right side
          leftOutput.push(<div key={`left-${i}`} className="bg-red-100 text-red-800">{line.substring(2)}</div>);
          rightOutput.push(<div key={`right-${i}`} className="bg-green-100 text-green-800">{nextLine.substring(2)}</div>);
          i += 2;
        } else {
          // Just a removal
          leftOutput.push(<div key={`left-${i}`} className="bg-red-100 text-red-800">{line.substring(2)}</div>);
          rightOutput.push(<div key={`right-${i}`}>&nbsp;</div>);
          i++;
        }
      } else if (line.startsWith('+ ')) {
        // Line added to right
        leftOutput.push(<div key={`left-${i}`}>&nbsp;</div>);
        rightOutput.push(<div key={`right-${i}`} className="bg-green-100 text-green-800">{line.substring(2)}</div>);
        i++;
      } else {
        // Unchanged line
        leftOutput.push(<div key={`left-${i}`}>{line.substring(2)}</div>);
        rightOutput.push(<div key={`right-${i}`}>{line.substring(2)}</div>);
        i++;
      }
    }
    
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-[400px] whitespace-pre-wrap">
          {leftOutput}
        </div>
        <div className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-[400px] whitespace-pre-wrap">
          {rightOutput}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Text Diff Checker</CardTitle>
          <CardDescription>
            Compare two texts and highlight the differences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Text
                </label>
                <Textarea
                  value={leftText}
                  onChange={(e) => setLeftText(e.target.value)}
                  placeholder="Enter or paste the original text here..."
                  className="min-h-[200px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Modified Text
                </label>
                <Textarea
                  value={rightText}
                  onChange={(e) => setRightText(e.target.value)}
                  placeholder="Enter or paste the modified text here..."
                  className="min-h-[200px]"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="caseSensitive"
                  checked={caseSensitive}
                  onChange={(e) => setCaseSensitive(e.target.checked)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="caseSensitive">Case sensitive</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="ignoreWhitespace"
                  checked={ignoreWhitespace}
                  onChange={(e) => setIgnoreWhitespace(e.target.checked)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="ignoreWhitespace">Ignore whitespace</label>
              </div>
            </div>
            
            {diffResult.length > 0 && (
              <div className="border rounded-lg overflow-hidden">
                <Tabs 
                  defaultValue="inline" 
                  value={diffView}
                  onValueChange={setDiffView}
                  className="w-full"
                >
                  <div className="border-b px-4 py-2 bg-gray-50">
                    <TabsList className="grid w-[400px] grid-cols-2">
                      <TabsTrigger value="inline">Inline View</TabsTrigger>
                      <TabsTrigger value="sideBySide">Side by Side</TabsTrigger>
                    </TabsList>
                  </div>
                  <div className="p-4">
                    <TabsContent value="inline" className="mt-0">
                      {getColoredDiffView()}
                    </TabsContent>
                    <TabsContent value="sideBySide" className="mt-0">
                      {getSideBySideView()}
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" onClick={clearTexts}>
              Clear
            </Button>
            <Button variant="outline" onClick={swapTexts} className="space-x-2">
              <ArrowLeftRight className="h-4 w-4" />
              <span>Swap</span>
            </Button>
          </div>
          <div className="flex space-x-2">
            {diffResult.length > 0 && (
              <Button variant="outline" onClick={copyDiffToClipboard} className="space-x-2">
                <Copy className="h-4 w-4" />
                <span>Copy Diff</span>
              </Button>
            )}
            <Button onClick={compareTexts}>
              Compare
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
