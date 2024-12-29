import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FloatingCircles from "@/components/FloatingCircles";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingCircles />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="animate-scale-in space-y-6 max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Welcome to Smart Lists!
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Your all-in-one solution for organizing everything from groceries to bucket lists.
          </p>
          <Button 
            onClick={() => navigate("/lists")} 
            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-6 text-lg rounded-lg transition-all duration-300 animate-bounce"
          >
            Get Started
          </Button>
          <div className="mt-8 space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/about")}
              className="text-gray-600 hover:text-gray-900"
            >
              About
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/privacy")}
              className="text-gray-600 hover:text-gray-900"
            >
              Privacy Policy
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/faq")}
              className="text-gray-600 hover:text-gray-900"
            >
              FAQ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;