
import { Link } from "react-router-dom";
import { categories } from "@/data/toolsData";
import * as LucideIcons from "lucide-react";

export default function CategorySection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our collection of tools organized by category to find exactly what you need
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => {
            // Safely get icon component
            const IconComponent = category.icon && LucideIcons[category.icon as keyof typeof LucideIcons] 
              ? LucideIcons[category.icon as keyof typeof LucideIcons] 
              : LucideIcons.Folder;
              
            return (
              <Link 
                key={category.id} 
                to={`/category/${category.id}`}
                className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className={`p-4 rounded-full bg-${category.color}/10 mb-4`}>
                  <IconComponent className={`h-8 w-8 text-${category.color}`} />
                </div>
                <h3 className="text-lg font-medium mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{category.description}</p>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link to="/categories">
            <button className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors">
              View All Categories
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
