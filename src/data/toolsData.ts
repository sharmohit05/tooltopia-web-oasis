
export type Category = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
};

export type Tool = {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  featured?: boolean;
  popularityScore?: number;
  icon?: string;
};

export const categories: Category[] = [
  {
    id: "text",
    name: "Text Tools",
    description: "Transform, analyze and convert text with these powerful utilities",
    icon: "File",
    color: "tool-purple",
  },
  {
    id: "web",
    name: "Web Tools",
    description: "Useful tools for web developers and designers",
    icon: "Globe",
    color: "tool-blue",
  },
  {
    id: "image",
    name: "Image Tools",
    description: "Create, edit and convert images easily",
    icon: "Image",
    color: "tool-green",
  },
  {
    id: "math",
    name: "Math Tools",
    description: "Calculators and converters for mathematical operations",
    icon: "Calculator",
    color: "tool-red",
  },
  {
    id: "conversion",
    name: "Conversion Tools",
    description: "Convert between different units and formats",
    icon: "RefreshCw",
    color: "tool-yellow",
  },
  {
    id: "security",
    name: "Security Tools",
    description: "Tools for encryption, decryption and security",
    icon: "Lock",
    color: "tool-pink",
  },
  {
    id: "developer",
    name: "Developer Tools",
    description: "Helpful utilities for software developers",
    icon: "Code",
    color: "tool-indigo",
  },
];

export const tools: Tool[] = [
  // Text Tools
  {
    id: "text-case-converter",
    name: "Text Case Converter",
    description: "Convert text between different cases: lowercase, UPPERCASE, Title Case, and more",
    category: "text",
    url: "/tool/text-case-converter",
    featured: true,
    popularityScore: 98,
  },
  {
    id: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, sentences and paragraphs in your text",
    category: "text",
    url: "/tool/word-counter",
    featured: true,
    popularityScore: 95,
  },
  {
    id: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    description: "Generate lorem ipsum placeholder text for your designs",
    category: "text",
    url: "/tool/lorem-ipsum-generator",
    popularityScore: 88,
  },
  {
    id: "text-diff-checker",
    name: "Text Diff Checker",
    description: "Compare two texts and highlight the differences",
    category: "text",
    url: "/tool/text-diff-checker",
    popularityScore: 85,
  },
  {
    id: "text-to-slug",
    name: "Text to Slug Converter",
    description: "Convert text to URL-friendly slug format",
    category: "text",
    url: "/tool/text-to-slug",
    popularityScore: 80,
  },
  {
    id: "find-and-replace",
    name: "Find and Replace",
    description: "Find and replace text in a string or paragraph",
    category: "text",
    url: "/tool/find-and-replace",
    popularityScore: 78,
  },
  {
    id: "remove-line-breaks",
    name: "Remove Line Breaks",
    description: "Remove line breaks from your text",
    category: "text",
    url: "/tool/remove-line-breaks",
    popularityScore: 75,
  },
  {
    id: "remove-duplicate-lines",
    name: "Remove Duplicate Lines",
    description: "Remove duplicate lines from your text",
    category: "text",
    url: "/tool/remove-duplicate-lines",
    popularityScore: 73,
  },

  // Web Tools
  {
    id: "color-picker",
    name: "Color Picker",
    description: "Select colors and get their HEX, RGB, and HSL values",
    category: "web",
    url: "/tool/color-picker",
    featured: true,
    popularityScore: 97,
  },
  {
    id: "qr-code-generator",
    name: "QR Code Generator",
    description: "Generate QR codes for URLs, text, contact details, and more",
    category: "web",
    url: "/tool/qr-code-generator",
    featured: true,
    popularityScore: 96,
  },
  {
    id: "html-entities-encoder",
    name: "HTML Entities Encoder/Decoder",
    description: "Encode or decode HTML entities in your text",
    category: "web",
    url: "/tool/html-entities-encoder",
    popularityScore: 87,
  },
  {
    id: "url-encoder",
    name: "URL Encoder/Decoder",
    description: "Encode or decode URLs for use in web applications",
    category: "web",
    url: "/tool/url-encoder",
    popularityScore: 86,
  },
  {
    id: "meta-tag-generator",
    name: "Meta Tag Generator",
    description: "Generate meta tags for your website's SEO",
    category: "web",
    url: "/tool/meta-tag-generator",
    popularityScore: 84,
  },
  {
    id: "css-minifier",
    name: "CSS Minifier",
    description: "Minify your CSS code to reduce file size",
    category: "web",
    url: "/tool/css-minifier",
    popularityScore: 83,
  },
  {
    id: "js-minifier",
    name: "JavaScript Minifier",
    description: "Minify your JavaScript code to reduce file size",
    category: "web",
    url: "/tool/js-minifier",
    popularityScore: 82,
  },
  {
    id: "html-minifier",
    name: "HTML Minifier",
    description: "Minify your HTML code to reduce file size",
    category: "web",
    url: "/tool/html-minifier",
    popularityScore: 81,
  },

  // Image Tools
  {
    id: "image-converter",
    name: "Image Converter",
    description: "Convert images between different formats",
    category: "image",
    url: "/tool/image-converter",
    featured: true,
    popularityScore: 94,
  },
  {
    id: "image-resizer",
    name: "Image Resizer",
    description: "Resize images to specific dimensions",
    category: "image",
    url: "/tool/image-resizer",
    featured: true,
    popularityScore: 93,
  },
  {
    id: "image-compressor",
    name: "Image Compressor",
    description: "Compress images to reduce file size",
    category: "image",
    url: "/tool/image-compressor",
    popularityScore: 92,
  },
  {
    id: "image-cropper",
    name: "Image Cropper",
    description: "Crop images to specific dimensions",
    category: "image",
    url: "/tool/image-cropper",
    popularityScore: 90,
  },
  {
    id: "image-color-picker",
    name: "Image Color Picker",
    description: "Pick colors from an image",
    category: "image",
    url: "/tool/image-color-picker",
    popularityScore: 89,
  },
  {
    id: "image-to-base64",
    name: "Image to Base64",
    description: "Convert images to Base64 encoding",
    category: "image",
    url: "/tool/image-to-base64",
    popularityScore: 87,
  },
  {
    id: "svg-to-png",
    name: "SVG to PNG Converter",
    description: "Convert SVG images to PNG format",
    category: "image",
    url: "/tool/svg-to-png",
    popularityScore: 85,
  },
  {
    id: "image-watermark",
    name: "Image Watermark",
    description: "Add watermarks to your images",
    category: "image",
    url: "/tool/image-watermark",
    popularityScore: 83,
  },

  // Math Tools
  {
    id: "calculator",
    name: "Scientific Calculator",
    description: "Perform complex mathematical calculations",
    category: "math",
    url: "/tool/calculator",
    featured: true,
    popularityScore: 91,
  },
  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Calculate percentages, increases, decreases, and more",
    category: "math",
    url: "/tool/percentage-calculator",
    popularityScore: 89,
  },
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index",
    category: "math",
    url: "/tool/bmi-calculator",
    popularityScore: 87,
  },
  {
    id: "random-number-generator",
    name: "Random Number Generator",
    description: "Generate random numbers within a range",
    category: "math",
    url: "/tool/random-number-generator",
    popularityScore: 86,
  },
  {
    id: "number-to-words",
    name: "Number to Words Converter",
    description: "Convert numbers to words",
    category: "math",
    url: "/tool/number-to-words",
    popularityScore: 84,
  },
  {
    id: "gcd-lcm-calculator",
    name: "GCD & LCM Calculator",
    description: "Calculate Greatest Common Divisor and Least Common Multiple",
    category: "math",
    url: "/tool/gcd-lcm-calculator",
    popularityScore: 80,
  },
  {
    id: "age-calculator",
    name: "Age Calculator",
    description: "Calculate age based on date of birth",
    category: "math",
    url: "/tool/age-calculator",
    popularityScore: 83,
  },
  {
    id: "date-calculator",
    name: "Date Calculator",
    description: "Calculate days, weeks, months between two dates",
    category: "math",
    url: "/tool/date-calculator",
    popularityScore: 81,
  },

  // Conversion Tools
  {
    id: "unit-converter",
    name: "Unit Converter",
    description: "Convert between different units of measurement",
    category: "conversion",
    url: "/tool/unit-converter",
    featured: true,
    popularityScore: 95,
  },
  {
    id: "currency-converter",
    name: "Currency Converter",
    description: "Convert between different currencies",
    category: "conversion",
    url: "/tool/currency-converter",
    popularityScore: 94,
  },
  {
    id: "temperature-converter",
    name: "Temperature Converter",
    description: "Convert between Celsius, Fahrenheit, and Kelvin",
    category: "conversion",
    url: "/tool/temperature-converter",
    popularityScore: 92,
  },
  {
    id: "length-converter",
    name: "Length Converter",
    description: "Convert between different units of length",
    category: "conversion",
    url: "/tool/length-converter",
    popularityScore: 90,
  },
  {
    id: "weight-converter",
    name: "Weight Converter",
    description: "Convert between different units of weight",
    category: "conversion",
    url: "/tool/weight-converter",
    popularityScore: 89,
  },
  {
    id: "time-converter",
    name: "Time Converter",
    description: "Convert between different units of time",
    category: "conversion",
    url: "/tool/time-converter",
    popularityScore: 88,
  },
  {
    id: "speed-converter",
    name: "Speed Converter",
    description: "Convert between different units of speed",
    category: "conversion",
    url: "/tool/speed-converter",
    popularityScore: 86,
  },
  {
    id: "area-converter",
    name: "Area Converter",
    description: "Convert between different units of area",
    category: "conversion",
    url: "/tool/area-converter",
    popularityScore: 85,
  },

  // Security Tools
  {
    id: "password-generator",
    name: "Password Generator",
    description: "Generate strong, secure passwords",
    category: "security",
    url: "/tool/password-generator",
    featured: true,
    popularityScore: 96,
  },
  {
    id: "md5-generator",
    name: "MD5 Generator",
    description: "Generate MD5 hash for your text",
    category: "security",
    url: "/tool/md5-generator",
    popularityScore: 87,
  },
  {
    id: "sha1-generator",
    name: "SHA-1 Generator",
    description: "Generate SHA-1 hash for your text",
    category: "security",
    url: "/tool/sha1-generator",
    popularityScore: 86,
  },
  {
    id: "sha256-generator",
    name: "SHA-256 Generator",
    description: "Generate SHA-256 hash for your text",
    category: "security",
    url: "/tool/sha256-generator",
    popularityScore: 85,
  },
  {
    id: "base64-encoder",
    name: "Base64 Encoder/Decoder",
    description: "Encode or decode text to/from Base64",
    category: "security",
    url: "/tool/base64-encoder",
    popularityScore: 84,
  },
  {
    id: "password-strength-checker",
    name: "Password Strength Checker",
    description: "Check the strength of your passwords",
    category: "security",
    url: "/tool/password-strength-checker",
    popularityScore: 88,
  },
  {
    id: "htpasswd-generator",
    name: "Htpasswd Generator",
    description: "Generate Htpasswd entries for basic authentication",
    category: "security",
    url: "/tool/htpasswd-generator",
    popularityScore: 78,
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Generate random UUID/GUID values",
    category: "security",
    url: "/tool/uuid-generator",
    popularityScore: 82,
  },

  // Developer Tools
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Format and validate JSON data",
    category: "developer",
    url: "/tool/json-formatter",
    featured: true,
    popularityScore: 97,
  },
  {
    id: "sql-formatter",
    name: "SQL Formatter",
    description: "Format and beautify SQL queries",
    category: "developer",
    url: "/tool/sql-formatter",
    popularityScore: 89,
  },
  {
    id: "code-formatter",
    name: "Code Formatter",
    description: "Format and beautify code in various languages",
    category: "developer",
    url: "/tool/code-formatter",
    popularityScore: 91,
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    description: "Test and debug regular expressions",
    category: "developer",
    url: "/tool/regex-tester",
    popularityScore: 93,
  },
  {
    id: "jwt-decoder",
    name: "JWT Decoder",
    description: "Decode and verify JWT tokens",
    category: "developer",
    url: "/tool/jwt-decoder",
    popularityScore: 88,
  },
  {
    id: "cron-expression-generator",
    name: "Cron Expression Generator",
    description: "Generate and validate cron expressions",
    category: "developer",
    url: "/tool/cron-expression-generator",
    popularityScore: 85,
  },
  {
    id: "xml-formatter",
    name: "XML Formatter",
    description: "Format and validate XML data",
    category: "developer",
    url: "/tool/xml-formatter",
    popularityScore: 84,
  },
  {
    id: "yaml-formatter",
    name: "YAML Formatter",
    description: "Format and validate YAML data",
    category: "developer",
    url: "/tool/yaml-formatter",
    popularityScore: 83,
  },
];

export const getFeaturedTools = (): Tool[] => {
  return tools.filter(tool => tool.featured);
};

export const getPopularTools = (limit: number = 8): Tool[] => {
  return [...tools]
    .sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0))
    .slice(0, limit);
};

export const getToolsByCategory = (categoryId: string): Tool[] => {
  return tools.filter(tool => tool.category === categoryId);
};

export const getCategoryById = (categoryId: string): Category | undefined => {
  return categories.find(category => category.id === categoryId);
};

export const getToolById = (toolId: string): Tool | undefined => {
  return tools.find(tool => tool.id === toolId);
};

export const searchTools = (query: string): Tool[] => {
  const lowerQuery = query.toLowerCase();
  return tools.filter(
    tool => 
      tool.name.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery)
  );
};
