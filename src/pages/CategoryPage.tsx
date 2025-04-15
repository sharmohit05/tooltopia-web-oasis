
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ToolCard from "@/components/home/ToolCard";
import { getCategoryById, getToolsByCategory } from "@/data/toolsData";
import * as LucideIcons from "lucide-react";

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  const category = categoryId ? getCategoryById(categoryId) : undefined;
  const tools = categoryId ? getToolsByCategory(categoryId) : [];
  
  useEffect(() => {
    if (!category) {
      navigate("/categories", { replace: true });
    }
  }, [category, navigate]);
  
  if (!category) {
    return null;
  }
  
  const IconComponent = category.icon && LucideIcons[category.icon as keyof typeof LucideIcons] 
    ? LucideIcons[category.icon as keyof typeof LucideIcons] 
    : LucideIcons.Folder;
  
  return (
    <Layout>
      <div className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center mb-10">
            <div className={`p-4 rounded-full bg-${category.color}/10 mb-4 md:mb-0 md:mr-6`}>
              <IconComponent className={`h-8 w-8 text-${category.color}`} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{category.name}</h1>
              <p className="text-lg text-gray-600">{category.description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <ToolCard 
                key={tool.id} 
                tool={tool} 
                color={category.color} 
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
