
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { categories } from "@/data/toolsData";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

const Categories = () => {
  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">All Categories</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our collection of useful online tools organized by category
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => {
              // Safely get the icon component
              let IconComponent: LucideIcon = LucideIcons.Folder;
              
              if (category.icon && category.icon in LucideIcons) {
                IconComponent = LucideIcons[category.icon as keyof typeof LucideIcons] as LucideIcon;
              }
                
              return (
                <Link 
                  key={category.id} 
                  to={`/category/${category.id}`} 
                  className="block"
                >
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 h-full">
                    <div className="flex items-start space-x-4">
                      <div className={`p-4 rounded-full bg-${category.color}/10`}>
                        <IconComponent className={`h-8 w-8 text-${category.color}`} />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold mb-2">{category.name}</h2>
                        <p className="text-gray-600">{category.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
