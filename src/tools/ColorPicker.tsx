
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Copy, Pipette } from "lucide-react";

// Define the EyeDropper interface for TypeScript
interface EyeDropperConstructor {
  new(): EyeDropperInstance;
}

interface EyeDropperInstance {
  open(): Promise<{ sRGBHex: string }>;
}

// Add EyeDropper to the global Window interface
declare global {
  interface Window {
    EyeDropper?: EyeDropperConstructor;
  }
}

export default function ColorPicker() {
  const [hexColor, setHexColor] = useState("#6366F1");
  const [rgbColor, setRgbColor] = useState({ r: 99, g: 102, b: 241 });
  const [hslColor, setHslColor] = useState({ h: 239, s: 84, l: 67 });
  const [activeTab, setActiveTab] = useState("hex");

  useEffect(() => {
    if (activeTab === "hex") {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
      if (result) {
        const r = parseInt(result[1], 16);
        const g = parseInt(result[2], 16);
        const b = parseInt(result[3], 16);
        setRgbColor({ r, g, b });
        
        const rNorm = r / 255;
        const gNorm = g / 255;
        const bNorm = b / 255;
        
        const max = Math.max(rNorm, gNorm, bNorm);
        const min = Math.min(rNorm, gNorm, bNorm);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
          h = s = 0; // achromatic
        } else {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case rNorm:
              h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
              break;
            case gNorm:
              h = (bNorm - rNorm) / d + 2;
              break;
            case bNorm:
              h = (rNorm - gNorm) / d + 4;
              break;
            default:
              h = 0;
          }
          h = Math.round(h * 60);
        }
        
        s = Math.round(s * 100);
        l = Math.round(l * 100);
        
        setHslColor({ h, s, l });
      }
    }
  }, [hexColor, activeTab]);

  useEffect(() => {
    if (activeTab === "rgb") {
      const { r, g, b } = rgbColor;
      const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      setHexColor(hex);
    }
  }, [rgbColor, activeTab]);

  useEffect(() => {
    if (activeTab === "hsl") {
      const { h, s, l } = hslColor;
      const sNorm = s / 100;
      const lNorm = l / 100;
      
      const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
      const x = c * (1 - Math.abs((h / 60) % 2 - 1));
      const m = lNorm - c / 2;
      let r, g, b;
      
      if (h >= 0 && h < 60) {
        [r, g, b] = [c, x, 0];
      } else if (h >= 60 && h < 120) {
        [r, g, b] = [x, c, 0];
      } else if (h >= 120 && h < 180) {
        [r, g, b] = [0, c, x];
      } else if (h >= 180 && h < 240) {
        [r, g, b] = [0, x, c];
      } else if (h >= 240 && h < 300) {
        [r, g, b] = [x, 0, c];
      } else {
        [r, g, b] = [c, 0, x];
      }
      
      const rInt = Math.round((r + m) * 255);
      const gInt = Math.round((g + m) * 255);
      const bInt = Math.round((b + m) * 255);
      
      setRgbColor({ r: rInt, g: gInt, b: bInt });
    }
  }, [hslColor, activeTab]);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^#?([a-f\d]{0,6})$/i.test(value)) {
      const formattedValue = value.startsWith('#') ? value : `#${value}`;
      setHexColor(formattedValue);
    }
  };

  const handleRgbChange = (component: 'r' | 'g' | 'b', value: number) => {
    setRgbColor(prev => ({ ...prev, [component]: value }));
  };

  const handleHslChange = (component: 'h' | 's' | 'l', value: number) => {
    setHslColor(prev => ({ ...prev, [component]: value }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success("Color value copied to clipboard"))
      .catch(() => toast.error("Failed to copy color value"));
  };

  const pickColorFromScreen = async () => {
    if (!window.EyeDropper) {
      toast.error("Your browser doesn't support the eyedropper tool");
      return;
    }

    try {
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      setHexColor(result.sRGBHex);
      setActiveTab("hex");
      toast.success("Color picked successfully");
    } catch (error) {
      toast.error("Color picking was cancelled");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Color Picker</CardTitle>
          <CardDescription>
            Select colors and get their HEX, RGB, and HSL values
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-6">
            <div 
              className="w-full h-32 rounded-lg border shadow-sm" 
              style={{ backgroundColor: hexColor }}
              aria-label="Color preview"
            />
            
            <Tabs defaultValue="hex" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="hex">HEX</TabsTrigger>
                <TabsTrigger value="rgb">RGB</TabsTrigger>
                <TabsTrigger value="hsl">HSL</TabsTrigger>
              </TabsList>
              
              <TabsContent value="hex" className="space-y-4 pt-4">
                <div className="flex space-x-2">
                  <Input 
                    value={hexColor} 
                    onChange={handleHexChange}
                    className="font-mono"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => copyToClipboard(hexColor)}
                    aria-label="Copy HEX value"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="rgb" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Red: {rgbColor.r}</label>
                      <span className="text-xs text-gray-500">0-255</span>
                    </div>
                    <Slider 
                      value={[rgbColor.r]} 
                      max={255} 
                      step={1}
                      onValueChange={([value]) => handleRgbChange('r', value)}
                      className="py-1"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Green: {rgbColor.g}</label>
                      <span className="text-xs text-gray-500">0-255</span>
                    </div>
                    <Slider 
                      value={[rgbColor.g]} 
                      max={255} 
                      step={1}
                      onValueChange={([value]) => handleRgbChange('g', value)}
                      className="py-1"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Blue: {rgbColor.b}</label>
                      <span className="text-xs text-gray-500">0-255</span>
                    </div>
                    <Slider 
                      value={[rgbColor.b]} 
                      max={255} 
                      step={1}
                      onValueChange={([value]) => handleRgbChange('b', value)}
                      className="py-1"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Input 
                    value={`rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`} 
                    readOnly
                    className="font-mono"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => copyToClipboard(`rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`)}
                    aria-label="Copy RGB value"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="hsl" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Hue: {hslColor.h}°</label>
                      <span className="text-xs text-gray-500">0-360</span>
                    </div>
                    <Slider 
                      value={[hslColor.h]} 
                      max={360} 
                      step={1}
                      onValueChange={([value]) => handleHslChange('h', value)}
                      className="py-1"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Saturation: {hslColor.s}%</label>
                      <span className="text-xs text-gray-500">0-100</span>
                    </div>
                    <Slider 
                      value={[hslColor.s]} 
                      max={100} 
                      step={1}
                      onValueChange={([value]) => handleHslChange('s', value)}
                      className="py-1"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Lightness: {hslColor.l}%</label>
                      <span className="text-xs text-gray-500">0-100</span>
                    </div>
                    <Slider 
                      value={[hslColor.l]} 
                      max={100} 
                      step={1}
                      onValueChange={([value]) => handleHslChange('l', value)}
                      className="py-1"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Input 
                    value={`hsl(${hslColor.h}, ${hslColor.s}%, ${hslColor.l}%)`} 
                    readOnly
                    className="font-mono"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => copyToClipboard(`hsl(${hslColor.h}, ${hslColor.s}%, ${hslColor.l}%)`)}
                    aria-label="Copy HSL value"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={pickColorFromScreen}
          >
            <Pipette className="h-4 w-4 mr-2" />
            Pick Color from Screen
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
