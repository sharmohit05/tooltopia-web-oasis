
import { Sparkles, Zap, Heart, Lock } from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      icon: <Sparkles className="h-8 w-8 text-tool-purple" />,
      title: "Easy to Use",
      description: "No downloads or installations needed. Our tools are accessible directly in your browser.",
    },
    {
      icon: <Zap className="h-8 w-8 text-tool-blue" />,
      title: "Fast Processing",
      description: "Get results instantly with our optimized tools that process your requests in real-time.",
    },
    {
      icon: <Heart className="h-8 w-8 text-tool-pink" />,
      title: "Completely Free",
      description: "All tools are free to use with no hidden costs or subscription requirements.",
    },
    {
      icon: <Lock className="h-8 w-8 text-tool-green" />,
      title: "Secure & Private",
      description: "Your data never leaves your browser. We prioritize your privacy and security.",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-sm">
              <div className="mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
