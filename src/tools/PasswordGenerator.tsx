
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Copy, RefreshCw } from "lucide-react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    generatePassword();
  }, []);

  useEffect(() => {
    calculatePasswordStrength();
  }, [password]);

  const generatePassword = () => {
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      toast.error("Please include at least one character type");
      return;
    }

    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    let chars = "";
    if (includeUppercase) chars += uppercaseChars;
    if (includeLowercase) chars += lowercaseChars;
    if (includeNumbers) chars += numberChars;
    if (includeSymbols) chars += symbolChars;

    let newPassword = "";
    const charactersLength = chars.length;

    // Ensure at least one of each selected type is included
    let mandatoryChars = "";
    if (includeUppercase) mandatoryChars += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
    if (includeLowercase) mandatoryChars += lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
    if (includeNumbers) mandatoryChars += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
    if (includeSymbols) mandatoryChars += symbolChars.charAt(Math.floor(Math.random() * symbolChars.length));

    // Add mandatory characters
    newPassword = mandatoryChars;

    // Fill the rest randomly
    for (let i = mandatoryChars.length; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * charactersLength));
    }

    // Shuffle the password to mix mandatory characters
    newPassword = newPassword
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");

    setPassword(newPassword);
  };

  const calculatePasswordStrength = () => {
    // Very simple password strength calculation
    let strength = 0;

    if (password.length >= 12) strength += 25;
    else if (password.length >= 8) strength += 15;
    else if (password.length >= 6) strength += 10;
    else strength += 5;

    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;

    // Cap at 100
    strength = Math.min(100, strength);
    setPasswordStrength(strength);
  };

  const getStrengthLabel = () => {
    if (passwordStrength >= 80) return { text: "Strong", color: "bg-green-500" };
    if (passwordStrength >= 60) return { text: "Good", color: "bg-yellow-500" };
    if (passwordStrength >= 40) return { text: "Fair", color: "bg-orange-500" };
    return { text: "Weak", color: "bg-red-500" };
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
      .then(() => toast.success("Password copied to clipboard"))
      .catch(() => toast.error("Failed to copy password"));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Password Generator</CardTitle>
          <CardDescription>
            Generate strong, secure passwords for your accounts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex space-x-2">
            <Input
              value={password}
              readOnly
              className="font-mono"
            />
            <Button
              variant="outline"
              onClick={copyToClipboard}
              aria-label="Copy password"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              onClick={generatePassword}
              aria-label="Generate new password"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Password Strength</label>
              <span className="text-xs font-medium">{getStrengthLabel().text}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${getStrengthLabel().color}`}
                style={{ width: `${passwordStrength}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Password Length: {length}</label>
                <span className="text-xs text-gray-500">6-32</span>
              </div>
              <Slider
                value={[length]}
                min={6}
                max={32}
                step={1}
                onValueChange={([value]) => setLength(value)}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Include Uppercase Letters</label>
                <Switch
                  checked={includeUppercase}
                  onCheckedChange={setIncludeUppercase}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Include Lowercase Letters</label>
                <Switch
                  checked={includeLowercase}
                  onCheckedChange={setIncludeLowercase}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Include Numbers</label>
                <Switch
                  checked={includeNumbers}
                  onCheckedChange={setIncludeNumbers}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Include Symbols</label>
                <Switch
                  checked={includeSymbols}
                  onCheckedChange={setIncludeSymbols}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={generatePassword}
          >
            Generate New Password
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
