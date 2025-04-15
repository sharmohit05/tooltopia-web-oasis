
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { categories, getToolsByCategory } from "@/data/toolsData";
import ToolCard from "@/components/home/ToolCard";
import * as LucideIcons from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  
  return (
    <Layout>
      <div className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">All Tools</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse through our comprehensive collection of online tools
            </p>
          </div>
          
          <Tabs 
            defaultValue={activeCategory} 
            value={activeCategory} 
            onValueChange={setActiveCategory}
            className="space-y-8"
          >
            <div className="flex justify-center">
              <TabsList className="bg-white p-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-1">
                {categories.map((category) => {
                  const IconComponent = LucideIcons[category.icon as keyof typeof LucideIcons] || LucideIcons.Folder;
                  
                  return (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 px-4 py-2"
                    >
                      <div className="flex items-center space-x-2">
                        <IconComponent className={`h-4 w-4 text-${category.color}`} />
                        <span className="hidden sm:inline">{category.name}</span>
                      </div>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>
              
            {categories.map((category) => {
              const tools = getToolsByCategory(category.id);
              
              return (
                <TabsContent key={category.id} value={category.id} className="animate-fade-in">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center mb-8">
                      {LucideIcons[category.icon as keyof typeof LucideIcons] && (
                        <div className={`p-3 rounded-full bg-${category.color}/10 mr-4`}>
                          {React.createElement(
                            LucideIcons[category.icon as keyof typeof LucideIcons], 
                            { className: `h-6 w-6 text-${category.color}` }
                          )}
                        </div>
                      )}
                      <div>
                        <h2 className="text-2xl font-bold">{category.name}</h2>
                        <p className="text-gray-600">{category.description}</p>
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
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
