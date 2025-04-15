
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import CategorySection from "@/components/home/CategorySection";
import ToolsSection from "@/components/home/ToolsSection";
import Benefits from "@/components/home/Benefits";
import { categories, getFeaturedTools, getPopularTools } from "@/data/toolsData";

const getCategoryColors = () => {
  const colorMap: Record<string, string> = {};
  categories.forEach((category) => {
    colorMap[category.id] = category.color;
  });
  return colorMap;
};

const Index = () => {
  const featuredTools = getFeaturedTools();
  const popularTools = getPopularTools(8);
  const colorMap = getCategoryColors();

  return (
    <Layout>
      <Hero />
      
      <CategorySection categories={categories} />
      
      <ToolsSection
        title="Featured Tools"
        description="Our most popular and useful tools to help you with your tasks"
        tools={featuredTools}
        colorMap={colorMap}
      />
      
      <Benefits />
      
      <ToolsSection
        title="Popular Tools"
        description="What others are using right now to get their work done"
        tools={popularTools}
        colorMap={colorMap}
        className="bg-gray-50"
      />
    </Layout>
  );
};

export default Index;
