import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-8">
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          ← Back
        </Button>
        <h1 className="text-3xl font-bold mb-6">About Smart Lists</h1>
        <div className="space-y-4 text-gray-700">
          <p>
            Smart Lists is your ultimate companion for organizing every aspect of your life. Whether you're planning groceries, tracking your bucket list, or organizing events, we've got you covered.
          </p>
          <p>
            Our mission is to make list management intuitive, fun, and efficient. With features like list locking, completion tracking, and customizable categories, you can focus on what matters most - getting things done.
          </p>
          <p>
            We believe in simplicity and privacy. That's why Smart Lists is designed to be easy to use while keeping your data secure and private.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;