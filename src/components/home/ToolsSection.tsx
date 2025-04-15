
import ToolCard from "./ToolCard";
import { Tool } from "@/data/toolsData";

interface ToolsSectionProps {
  title: string;
  description: string;
  tools: Tool[];
  colorMap: Record<string, string>;
  className?: string;
}

export default function ToolsSection({ title, description, tools, colorMap, className = "" }: ToolsSectionProps) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <ToolCard 
              key={tool.id} 
              tool={tool} 
              color={colorMap[tool.category] || "tool-purple"} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
