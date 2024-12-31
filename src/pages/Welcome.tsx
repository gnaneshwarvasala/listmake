import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FloatingCircles from "@/components/FloatingCircles";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
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
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-lg transition-all duration-700 hover:scale-105 transform"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;