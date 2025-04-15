
import { Link } from "react-router-dom";
import { Tool } from "@/data/toolsData";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  tool: Tool;
  color: string;
}

export default function ToolCard({ tool, color }: ToolCardProps) {
  // Dynamically get icon from Lucide
  const getIcon = () => {
    let IconComponent: LucideIcon = LucideIcons.Folder;
    
    if (tool.icon && tool.icon in LucideIcons) {
      IconComponent = LucideIcons[tool.icon as keyof typeof LucideIcons] as LucideIcon;
      return <IconComponent className={`h-6 w-6 text-${color}`} />;
    }
    
    // Default icons based on category
    const categoryMap: Record<string, keyof typeof LucideIcons> = {
      text: "FileText",
      web: "Globe",
      image: "Image",
      math: "Calculator",
      conversion: "RefreshCw",
      security: "Lock",
      developer: "Code",
    };
    
    const iconName = categoryMap[tool.category] || "Tool";
    const CategoryIcon = LucideIcons[iconName] as LucideIcon;
    
    return <CategoryIcon className={`h-6 w-6 text-${color}`} />;
  };

  return (
    <Link to={tool.url} className="block">
      <div className="tool-card h-full">
        <div className={`tool-card-gradient from-${color}/20 to-${color}/5`}></div>
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-lg bg-${color}/10`}>
            {getIcon()}
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">{tool.name}</h3>
            <p className="text-gray-600 text-sm">{tool.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
