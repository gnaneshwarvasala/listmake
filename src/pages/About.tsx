import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
      <div className="max-w-2xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4 dark:text-gray-300 dark:hover:text-white"
        >
          ← Back
        </Button>
        <h1 className="text-3xl font-bold mb-6 dark:text-gray-100">About Smart Lists</h1>
        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <p>
            Smart Lists is your ultimate companion for organizing every aspect of your life. Whether you're planning groceries, tracking your bucket list, or organizing events, we've got you covered with our intuitive and powerful list management system.
          </p>
          <h2 className="text-xl font-semibold mt-8 mb-4 dark:text-gray-200">Our Mission</h2>
          <p>
            Our mission is to make list management intuitive, fun, and efficient. We believe that staying organized shouldn't be a chore, but rather an enjoyable experience that helps you achieve your goals and maintain peace of mind.
          </p>
          <h2 className="text-xl font-semibold mt-8 mb-4 dark:text-gray-200">Key Features</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Intuitive drag-and-drop interface</li>
            <li>Smart categorization system</li>
            <li>Progress tracking</li>
            <li>Dark mode support</li>
            <li>Mobile-friendly design</li>
            <li>List sharing capabilities</li>
          </ul>
          <h2 className="text-xl font-semibold mt-8 mb-4 dark:text-gray-200">Our Team</h2>
          <p>
            We're a dedicated team of developers and designers passionate about creating tools that make life easier. Our diverse backgrounds in UX design, web development, and productivity management come together to deliver an exceptional list management experience.
          </p>
          <h2 className="text-xl font-semibold mt-8 mb-4 dark:text-gray-200">Privacy & Security</h2>
          <p>
            We believe in simplicity and privacy. That's why Smart Lists is designed to be easy to use while keeping your data secure and private. We never share your information with third parties, and your lists are protected with industry-standard security measures.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;