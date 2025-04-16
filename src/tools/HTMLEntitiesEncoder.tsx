
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ArrowDownUp, Copy, Trash, Code } from "lucide-react";

export default function HTMLEntitiesEncoder() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [activeTab, setActiveTab] = useState("encode");

  const encodeHTML = () => {
    if (!text.trim()) {
      toast.error("Please enter some text to encode");
      return;
    }

    const htmlEntities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;'
    };

    const encodedText = text.replace(/[&<>"'`=\/]/g, (char) => {
      return htmlEntities[char];
    });

    setResult(encodedText);
    toast.success("Text encoded successfully");
  };

  const decodeHTML = () => {
    if (!text.trim()) {
      toast.error("Please enter some text to decode");
      return;
    }

    const element = document.createElement('textarea');
    element.innerHTML = text;
    const decodedText = element.value;
    
    setResult(decodedText);
    toast.success("Text decoded successfully");
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setResult("");
  };

  const handleAction = () => {
    if (activeTab === "encode") {
      encodeHTML();
    } else {
      decodeHTML();
    }
  };

  const copyToClipboard = () => {
    if (!result) {
      toast.error("No result to copy");
      return;
    }

    navigator.clipboard.writeText(result)
      .then(() => toast.success("Copied to clipboard"))
      .catch(() => toast.error("Failed to copy"));
  };

  const clearAll = () => {
    setText("");
    setResult("");
    toast.info("Cleared all text");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>HTML Entities Encoder/Decoder</CardTitle>
          <CardDescription>
            Convert text to HTML entities and vice versa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="encode" value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="encode">Encode</TabsTrigger>
              <TabsTrigger value="decode">Decode</TabsTrigger>
            </TabsList>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {activeTab === "encode" ? "Text to Encode" : "HTML Entities to Decode"}
                </label>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={
                    activeTab === "encode"
                      ? "Enter text to convert to HTML entities..."
                      : "Enter HTML entities to decode..."
                  }
                  className="min-h-[150px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Result
                </label>
                <Textarea
                  value={result}
                  readOnly
                  placeholder="Result will appear here..."
                  className="min-h-[150px] bg-gray-50"
                />
              </div>
            </div>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" onClick={clearAll}>
              <Trash className="h-4 w-4 mr-2" />
              Clear
            </Button>
            <Button variant="outline" onClick={copyToClipboard} disabled={!result}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
          <Button onClick={handleAction}>
            {activeTab === "encode" ? (
              <>
                <Code className="h-4 w-4 mr-2" />
                Encode HTML
              </>
            ) : (
              <>
                <ArrowDownUp className="h-4 w-4 mr-2" />
                Decode HTML
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
