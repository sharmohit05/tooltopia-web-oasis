
import { Link } from "react-router-dom";
import { Tool } from "@/data/toolsData";
import * as LucideIcons from "lucide-react";

interface ToolCardProps {
  tool: Tool;
  color: string;
}

export default function ToolCard({ tool, color }: ToolCardProps) {
  // Dynamically get icon from Lucide
  const getIcon = () => {
    if (tool.icon) {
      const IconComponent = LucideIcons[tool.icon as keyof typeof LucideIcons];
      if (IconComponent) {
        return <IconComponent className={`h-6 w-6 text-${color}`} />;
      }
    }
    
    // Default icons based on category
    const categoryIcons: Record<string, React.ReactNode> = {
      text: <LucideIcons.FileText className={`h-6 w-6 text-${color}`} />,
      web: <LucideIcons.Globe className={`h-6 w-6 text-${color}`} />,
      image: <LucideIcons.Image className={`h-6 w-6 text-${color}`} />,
      math: <LucideIcons.Calculator className={`h-6 w-6 text-${color}`} />,
      conversion: <LucideIcons.RefreshCw className={`h-6 w-6 text-${color}`} />,
      security: <LucideIcons.Lock className={`h-6 w-6 text-${color}`} />,
      developer: <LucideIcons.Code className={`h-6 w-6 text-${color}`} />,
    };
    
    return categoryIcons[tool.category] || <LucideIcons.Tool className={`h-6 w-6 text-${color}`} />;
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
