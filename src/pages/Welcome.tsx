import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sun, Moon, List, Search, FileText } from "lucide-react";
import FloatingCircles from "@/components/FloatingCircles";

const Welcome = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <FloatingCircles />
        
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-yellow-500 animate-scale-in" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700 animate-scale-in" />
            )}
          </Button>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
              Transform Your Task Management Experience
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 animate-fade-in delay-100">
              Welcome to your go-to tool for seamless task management. Our List Manager is crafted with a sleek, 
              intuitive interface, featuring state-of-the-art functionalities to enhance your productivity.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
              <FeatureCard
                icon={<List className="h-6 w-6 text-primary animate-bounce" />}
                title="Get Started Button Effects"
                description="Experience smooth and engaging animations with our 'Get Started' button."
              />
              <FeatureCard
                icon={<Sun className="h-6 w-6 text-primary animate-spin-slow" />}
                title="Dark Mode Option"
                description="Easily switch between light and dark themes to suit your preference."
              />
              <FeatureCard
                icon={<Search className="h-6 w-6 text-primary animate-pulse" />}
                title="Enhanced Search Filter"
                description="Quickly locate tasks with our intuitive search filter and highlighted boxes."
              />
              <FeatureCard
                icon={<List className="h-6 w-6 text-primary animate-bounce" />}
                title="Icon Effects"
                description="Enjoy a visually appealing experience with subtle icon animations."
              />
              <FeatureCard
                icon={<FileText className="h-6 w-6 text-primary animate-pulse" />}
                title="Professional PDF Export"
                description="Generate professionally watermarked PDFs for your lists."
              />
            </div>

            <div className="mt-12">
              <Link to="/lists">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg rounded-full transform hover:scale-105 transition-all duration-300 animate-bounce-slow shadow-lg hover:shadow-xl"
                >
                  Get Started
                  <List className="ml-2 h-5 w-5 animate-bounce" />
                </Button>
              </Link>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-8 animate-fade-in delay-200">
              Get started today and take control of your tasks with our advanced, user-friendly List Manager. 
              Your path to better organization and productivity begins here!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) => (
  <div className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in">
    <div className="rounded-full w-12 h-12 bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300">
      {description}
    </p>
  </div>
);

export default Welcome;