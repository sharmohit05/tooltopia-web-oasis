
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Copy, ArrowRightLeft } from "lucide-react";

export default function TextCaseConverter() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [selectedCase, setSelectedCase] = useState("lowercase");

  const convertCase = () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to convert");
      return;
    }

    let result = "";
    switch (selectedCase) {
      case "lowercase":
        result = inputText.toLowerCase();
        break;
      case "uppercase":
        result = inputText.toUpperCase();
        break;
      case "titlecase":
        result = inputText
          .toLowerCase()
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        break;
      case "sentencecase":
        result = inputText.toLowerCase()
          .replace(/(^\s*\w|[.!?]\s*\w)/g, match => match.toUpperCase());
        break;
      case "camelcase":
        result = inputText
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
        break;
      case "pascalcase":
        result = inputText
          .toLowerCase()
          .replace(/(\w)(\w*)/g, (_, g1, g2) => g1.toUpperCase() + g2)
          .replace(/[^a-zA-Z0-9]/g, "");
        break;
      case "snakecase":
        result = inputText
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/[^a-zA-Z0-9_]/g, "");
        break;
      case "kebabcase":
        result = inputText
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-zA-Z0-9-]/g, "");
        break;
      default:
        result = inputText;
    }

    setOutputText(result);
    toast.success("Text converted successfully");
  };

  const copyToClipboard = () => {
    if (!outputText) {
      toast.error("No text to copy");
      return;
    }
    
    navigator.clipboard.writeText(outputText)
      .then(() => toast.success("Text copied to clipboard"))
      .catch(() => toast.error("Failed to copy text"));
  };

  const clearText = () => {
    setInputText("");
    setOutputText("");
    toast.info("Text cleared");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Text Case Converter</CardTitle>
          <CardDescription>
            Convert text between different cases: lowercase, UPPERCASE, Title Case, and more
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input Text
              </label>
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to convert..."
                className="min-h-[200px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Output Text
              </label>
              <Textarea
                value={outputText}
                readOnly
                placeholder="Converted text will appear here..."
                className="min-h-[200px] bg-gray-50"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Case Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: "lowercase", name: "lowercase" },
                { id: "uppercase", name: "UPPERCASE" },
                { id: "titlecase", name: "Title Case" },
                { id: "sentencecase", name: "Sentence case" },
                { id: "camelcase", name: "camelCase" },
                { id: "pascalcase", name: "PascalCase" },
                { id: "snakecase", name: "snake_case" },
                { id: "kebabcase", name: "kebab-case" },
              ].map((caseType) => (
                <Button
                  key={caseType.id}
                  variant={selectedCase === caseType.id ? "default" : "outline"}
                  onClick={() => setSelectedCase(caseType.id)}
                  className="justify-start"
                >
                  {caseType.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            <Button variant="outline" onClick={clearText}>
              Clear
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button onClick={convertCase} className="space-x-2">
              <ArrowRightLeft className="h-4 w-4" />
              <span>Convert</span>
            </Button>
            <Button variant="outline" onClick={copyToClipboard} className="space-x-2">
              <Copy className="h-4 w-4" />
              <span>Copy</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
