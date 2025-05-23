
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { getCategoryById, getToolById } from "@/data/toolsData";
import * as LucideIcons from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { LucideIcon } from "lucide-react";

// Import all tools components
import TextCaseConverter from "@/tools/TextCaseConverter";
import ColorPicker from "@/tools/ColorPicker";
import PasswordGenerator from "@/tools/PasswordGenerator";
import WordCounter from "@/tools/WordCounter";
import LoremIpsumGenerator from "@/tools/LoremIpsumGenerator";
import TextDiffChecker from "@/tools/TextDiffChecker";
import TextToSlugConverter from "@/tools/TextToSlugConverter";
import QRCodeGenerator from "@/tools/QRCodeGenerator";
import HTMLEntitiesEncoder from "@/tools/HTMLEntitiesEncoder";
import HTMLMinifier from "@/tools/HTMLMinifier";
import CSSMinifier from "@/tools/CSSMinifier";
import JSMinifier from "@/tools/JSMinifier";

// Tool component mapping
const toolComponents: Record<string, React.ComponentType> = {
  "text-case-converter": TextCaseConverter,
  "color-picker": ColorPicker,
  "password-generator": PasswordGenerator,
  "word-counter": WordCounter,
  "lorem-ipsum-generator": LoremIpsumGenerator,
  "text-diff-checker": TextDiffChecker,
  "text-to-slug": TextToSlugConverter,
  "qr-code-generator": QRCodeGenerator,
  "html-entities-encoder": HTMLEntitiesEncoder,
  "html-minifier": HTMLMinifier,
  "css-minifier": CSSMinifier,
  "js-minifier": JSMinifier,
};

const ToolPage = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  
  const tool = toolId ? getToolById(toolId) : undefined;
  const category = tool ? getCategoryById(tool.category) : undefined;
  
  useEffect(() => {
    if (!tool || !category) {
      navigate("/categories", { replace: true });
    }
  }, [tool, category, navigate]);
  
  if (!tool || !category) {
    return null;
  }
  
  const ToolComponent = toolComponents[tool.id];
  
  let CategoryIcon: LucideIcon = LucideIcons.Folder;
  if (category.icon && category.icon in LucideIcons) {
    CategoryIcon = LucideIcons[category.icon as keyof typeof LucideIcons] as LucideIcon;
  }
  
  return (
    <Layout>
      <div className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-4"
              onClick={() => navigate(`/category/${category.id}`)}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to {category.name}
            </Button>
            
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className={`p-4 rounded-full bg-${category.color}/10`}>
                <CategoryIcon className={`h-8 w-8 text-${category.color}`} />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{tool.name}</h1>
                <p className="text-lg text-gray-600">{tool.description}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6">
            {ToolComponent ? (
              <ToolComponent />
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">
                  This tool is currently under development. Please check back later!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ToolPage;
