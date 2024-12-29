import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
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
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="space-y-4 text-gray-700">
          <p>
            <strong>Data Collection:</strong> Smart Lists does not collect any personal data. All your lists and preferences are stored locally in your browser.
          </p>
          <p>
            <strong>Cookies:</strong> We don't use any tracking cookies or analytics tools.
          </p>
          <p>
            <strong>Third Parties:</strong> We don't share any information with third parties because we don't collect any information in the first place.
          </p>
          <h2 className="text-xl font-semibold mt-8 mb-4">Terms of Use</h2>
          <p>
            By using Smart Lists, you agree to use the service responsibly and understand that we provide this service "as is" without any warranties.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;