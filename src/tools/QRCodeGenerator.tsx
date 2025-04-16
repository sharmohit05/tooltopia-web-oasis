
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { QrCode, Download, Copy, RefreshCw } from "lucide-react";
import QRCode from "qrcode.react";

export default function QRCodeGenerator() {
  const [content, setContent] = useState("");
  const [qrCodeSize, setQrCodeSize] = useState(200);
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [fgColor, setFgColor] = useState("#000000");
  const [activeTab, setActiveTab] = useState("url");
  
  const generateContent = () => {
    switch(activeTab) {
      case "url":
        return content || "https://example.com";
      case "text":
        return content || "Sample Text";
      case "email":
        return content ? `mailto:${content}` : "mailto:example@example.com";
      case "phone":
        return content ? `tel:${content}` : "tel:+1234567890";
      default:
        return content || "https://example.com";
    }
  };
  
  const generateQRCode = () => {
    if (!content.trim()) {
      toast.error("Please enter some content for the QR code");
      return;
    }
    
    toast.success("QR code generated successfully");
  };
  
  const downloadQRCode = () => {
    if (!content.trim()) {
      toast.error("Please enter some content first");
      return;
    }
    
    const canvas = document.getElementById("qr-code") as HTMLCanvasElement;
    if (!canvas) return;
    
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("QR code downloaded successfully");
  };
  
  const copyQRCode = () => {
    if (!content.trim()) {
      toast.error("Please enter some content first");
      return;
    }
    
    const canvas = document.getElementById("qr-code") as HTMLCanvasElement;
    if (!canvas) return;
    
    canvas.toBlob(blob => {
      if (!blob) {
        toast.error("Failed to copy QR code");
        return;
      }
      
      // Use the new clipboard API
      navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]).then(() => {
        toast.success("QR code copied to clipboard");
      }).catch(() => {
        toast.error("Failed to copy QR code");
      });
    });
  };
  
  const resetForm = () => {
    setContent("");
    setQrCodeSize(200);
    setBgColor("#FFFFFF");
    setFgColor("#000000");
    toast.info("Form reset successfully");
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>QR Code Generator</CardTitle>
          <CardDescription>
            Generate QR codes for URLs, text, email addresses, and phone numbers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Tabs defaultValue="url" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-4">
                  <TabsTrigger value="url">URL</TabsTrigger>
                  <TabsTrigger value="text">Text</TabsTrigger>
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="phone">Phone</TabsTrigger>
                </TabsList>
                <TabsContent value="url" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="url-input">Enter URL</Label>
                    <Input
                      id="url-input"
                      placeholder="https://example.com"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="text" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="text-input">Enter Text</Label>
                    <Input
                      id="text-input"
                      placeholder="Your text here"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="email" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-input">Enter Email Address</Label>
                    <Input
                      id="email-input"
                      placeholder="email@example.com"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="phone" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone-input">Enter Phone Number</Label>
                    <Input
                      id="phone-input"
                      placeholder="+1234567890"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="size-input">QR Code Size</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="size-input"
                      type="number"
                      min="100"
                      max="500"
                      value={qrCodeSize}
                      onChange={(e) => setQrCodeSize(Number(e.target.value))}
                    />
                    <span className="text-sm text-gray-500">px</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bg-color">Background Color</Label>
                    <div className="flex">
                      <Input
                        id="bg-color"
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-12 p-1 h-10"
                      />
                      <Input
                        type="text"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="flex-1 ml-2"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fg-color">Foreground Color</Label>
                    <div className="flex">
                      <Input
                        id="fg-color"
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="w-12 p-1 h-10"
                      />
                      <Input
                        type="text"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="flex-1 ml-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg">
              <div className="mb-4 bg-white p-4 rounded-lg shadow-sm">
                <QRCode
                  id="qr-code"
                  value={generateContent()}
                  size={qrCodeSize}
                  bgColor={bgColor}
                  fgColor={fgColor}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <div className="text-sm text-gray-500 mt-2 text-center">
                Scan with a QR Code reader to test
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" onClick={resetForm} className="space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Reset</span>
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={copyQRCode} className="space-x-2">
              <Copy className="h-4 w-4" />
              <span>Copy</span>
            </Button>
            <Button variant="outline" onClick={downloadQRCode} className="space-x-2">
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
            <Button onClick={generateQRCode} className="space-x-2">
              <QrCode className="h-4 w-4" />
              <span>Generate</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
