
import { Link } from "react-router-dom";
import { Category } from "@/data/toolsData";
import * as LucideIcons from "lucide-react";

interface CategorySectionProps {
  categories: Category[];
}

export default function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find the perfect tool for your needs by exploring our carefully curated categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = LucideIcons[category.icon as keyof typeof LucideIcons] || LucideIcons.Folder;
            
            return (
              <Link 
                key={category.id} 
                to={`/category/${category.id}`} 
                className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`p-4 rounded-full bg-${category.color}/10 mb-4`}>
                    <IconComponent className={`h-8 w-8 text-${category.color}`} />
                  </div>
                  <h3 className="text-xl font-medium mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
