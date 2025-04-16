
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy, RefreshCw } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function LoremIpsumGenerator() {
  const [type, setType] = useState("paragraphs");
  const [amount, setAmount] = useState(3);
  const [minWordsPerSentence, setMinWordsPerSentence] = useState(5);
  const [maxWordsPerSentence, setMaxWordsPerSentence] = useState(15);
  const [minSentencesPerParagraph, setMinSentencesPerParagraph] = useState(3);
  const [maxSentencesPerParagraph, setMaxSentencesPerParagraph] = useState(7);
  const [startWithLoremIpsum, setStartWithLoremIpsum] = useState(true);
  const [generatedText, setGeneratedText] = useState("");

  // Words for lorem ipsum generation
  const loremWords = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation",
    "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat",
    "duis", "aute", "irure", "dolor", "in", "reprehenderit", "voluptate", "velit",
    "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "excepteur",
    "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui",
    "officia", "deserunt", "mollit", "anim", "id", "est", "laborum", "sed", "perspiciatis",
    "unde", "omnis", "iste", "natus", "error", "voluptatem", "accusantium", "doloremque",
    "laudantium", "totam", "rem", "aperiam", "eaque", "ipsa", "quae", "ab", "illo",
    "inventore", "veritatis", "quasi", "architecto", "beatae", "vitae", "dicta", "explicabo"
  ];

  const generateLoremIpsum = () => {
    if (amount <= 0) {
      toast.error("Please enter a valid amount greater than 0");
      return;
    }

    let result = "";
    
    // Helper function to get a random number between min and max (inclusive)
    const getRandomInt = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // Helper function to generate a random sentence
    const generateSentence = (isFirst: boolean) => {
      const wordCount = getRandomInt(minWordsPerSentence, maxWordsPerSentence);
      let sentence = [];
      
      for (let i = 0; i < wordCount; i++) {
        let word = loremWords[Math.floor(Math.random() * loremWords.length)];
        
        // Capitalize first word
        if (i === 0) {
          word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        
        sentence.push(word);
      }
      
      // Start with "Lorem ipsum dolor sit amet" for the first sentence if the option is enabled
      if (isFirst && startWithLoremIpsum) {
        sentence = ["Lorem", "ipsum", "dolor", "sit", "amet"];
      }
      
      return sentence.join(" ") + ".";
    };

    // Helper function to generate a paragraph
    const generateParagraph = (isFirst: boolean) => {
      const sentenceCount = getRandomInt(minSentencesPerParagraph, maxSentencesPerParagraph);
      let paragraph = [];
      
      for (let i = 0; i < sentenceCount; i++) {
        paragraph.push(generateSentence(isFirst && i === 0));
      }
      
      return paragraph.join(" ");
    };

    switch (type) {
      case "paragraphs":
        for (let i = 0; i < amount; i++) {
          result += generateParagraph(i === 0) + (i < amount - 1 ? "\n\n" : "");
        }
        break;
      case "sentences":
        for (let i = 0; i < amount; i++) {
          result += generateSentence(i === 0) + (i < amount - 1 ? " " : "");
        }
        break;
      case "words":
        let words = [];
        for (let i = 0; i < amount; i++) {
          words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
        }
        if (startWithLoremIpsum && amount >= 2) {
          words[0] = "Lorem";
          words[1] = "ipsum";
        }
        // Capitalize first word
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        result = words.join(" ");
        break;
    }
    
    setGeneratedText(result);
    toast.success("Lorem Ipsum generated successfully");
  };

  const copyToClipboard = () => {
    if (!generatedText) {
      toast.error("No text to copy");
      return;
    }
    
    navigator.clipboard.writeText(generatedText)
      .then(() => toast.success("Text copied to clipboard"))
      .catch(() => toast.error("Failed to copy text"));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Lorem Ipsum Generator</CardTitle>
          <CardDescription>
            Generate lorem ipsum placeholder text for your designs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Type</Label>
                  <RadioGroup 
                    value={type} 
                    onValueChange={setType}
                    className="flex space-x-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paragraphs" id="paragraphs" />
                      <Label htmlFor="paragraphs">Paragraphs</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sentences" id="sentences" />
                      <Label htmlFor="sentences">Sentences</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="words" id="words" />
                      <Label htmlFor="words">Words</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                    className="mt-1"
                  />
                </div>
                
                <div className="flex items-center space-x-2 mt-4">
                  <input
                    type="checkbox"
                    id="startWithLoremIpsum"
                    checked={startWithLoremIpsum}
                    onChange={(e) => setStartWithLoremIpsum(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="startWithLoremIpsum">Start with "Lorem ipsum dolor sit amet"</Label>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minWordsPerSentence">Min words per sentence</Label>
                    <Input
                      id="minWordsPerSentence"
                      type="number"
                      min="3"
                      max={maxWordsPerSentence}
                      value={minWordsPerSentence}
                      onChange={(e) => setMinWordsPerSentence(parseInt(e.target.value) || 3)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxWordsPerSentence">Max words per sentence</Label>
                    <Input
                      id="maxWordsPerSentence"
                      type="number"
                      min={minWordsPerSentence}
                      value={maxWordsPerSentence}
                      onChange={(e) => setMaxWordsPerSentence(parseInt(e.target.value) || 15)}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minSentencesPerParagraph">Min sentences per paragraph</Label>
                    <Input
                      id="minSentencesPerParagraph"
                      type="number"
                      min="1"
                      max={maxSentencesPerParagraph}
                      value={minSentencesPerParagraph}
                      onChange={(e) => setMinSentencesPerParagraph(parseInt(e.target.value) || 1)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxSentencesPerParagraph">Max sentences per paragraph</Label>
                    <Input
                      id="maxSentencesPerParagraph"
                      type="number"
                      min={minSentencesPerParagraph}
                      value={maxSentencesPerParagraph}
                      onChange={(e) => setMaxSentencesPerParagraph(parseInt(e.target.value) || 7)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Generated Text
                </Label>
                <Textarea
                  value={generatedText}
                  readOnly
                  placeholder="Generated lorem ipsum will appear here..."
                  className="min-h-[300px] bg-gray-50"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={copyToClipboard} className="space-x-2">
            <Copy className="h-4 w-4" />
            <span>Copy</span>
          </Button>
          <Button onClick={generateLoremIpsum} className="space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Generate</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
