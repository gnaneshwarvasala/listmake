import { useNavigate } from "react-router-dom";
import ShoppingList from "@/components/ShoppingList";
import FloatingCircles from "@/components/FloatingCircles";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      <FloatingCircles />
      <div className="mx-auto max-w-2xl relative z-10">
        <div className="flex justify-between items-center p-4 md:p-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back
          </Button>
        </div>
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">
          Shopping List
        </h1>
        <ShoppingList />
      </div>
      <Footer />
    </div>
  );
};

export default Index;