
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Copy, Trash, FileText } from "lucide-react";

export default function WordCounter() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    characters: 0,
    charactersWithoutSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  });

  const analyzeText = () => {
    if (!text.trim()) {
      toast.error("Please enter some text to analyze");
      return;
    }

    // Calculate statistics
    const characters = text.length;
    const charactersWithoutSpaces = text.replace(/\s/g, "").length;
    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    
    // Count sentences (rough estimate based on periods, exclamation marks, and question marks)
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    
    // Count paragraphs (separated by at least one empty line)
    const paragraphs = text.split(/\n\s*\n/).filter(paragraph => paragraph.trim().length > 0).length || 1;
    
    // Calculate reading time (average adult reads ~225 words per minute)
    const readingTime = Math.ceil(words / 225);

    setStats({
      characters,
      charactersWithoutSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
    });

    toast.success("Text analyzed successfully");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success("Text copied to clipboard"))
      .catch(() => toast.error("Failed to copy text"));
  };

  const clearText = () => {
    setText("");
    setStats({
      characters: 0,
      charactersWithoutSpaces: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      readingTime: 0,
    });
    toast.info("Text cleared");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Word Counter</CardTitle>
          <CardDescription>
            Count words, characters, sentences, and paragraphs in your text
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input Text
              </label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter or paste your text here..."
                className="min-h-[200px]"
              />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Characters</p>
                <p className="text-2xl font-bold">{stats.characters}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Characters (no spaces)</p>
                <p className="text-2xl font-bold">{stats.charactersWithoutSpaces}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Words</p>
                <p className="text-2xl font-bold">{stats.words}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Sentences</p>
                <p className="text-2xl font-bold">{stats.sentences}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Paragraphs</p>
                <p className="text-2xl font-bold">{stats.paragraphs}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Reading Time</p>
                <p className="text-2xl font-bold">{stats.readingTime} min</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" onClick={clearText} className="space-x-2">
              <Trash className="h-4 w-4" />
              <span>Clear</span>
            </Button>
            <Button variant="outline" onClick={copyToClipboard} className="space-x-2">
              <Copy className="h-4 w-4" />
              <span>Copy</span>
            </Button>
          </div>
          <Button onClick={analyzeText} className="space-x-2">
            <FileText className="h-4 w-4" />
            <span>Analyze Text</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
