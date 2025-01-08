import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
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
        <h1 className="text-3xl font-bold mb-6 dark:text-gray-100">Privacy Policy</h1>
        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 dark:text-gray-200">Data Collection & Storage</h2>
            <p>
              Smart Lists is committed to protecting your privacy. We do not collect any personal data or tracking information. All your lists and preferences are stored locally in your browser's storage, ensuring complete privacy and control over your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 dark:text-gray-200">Local Storage</h2>
            <p>
              We use your browser's local storage to save:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Your lists and their contents</li>
              <li>Theme preferences (light/dark mode)</li>
              <li>UI customization settings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 dark:text-gray-200">Cookies & Tracking</h2>
            <p>
              We don't use any tracking cookies or analytics tools. Your usage of the application is completely private and not monitored.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 dark:text-gray-200">Data Sharing</h2>
            <p>
              We don't share any information with third parties because we don't collect any information in the first place. When you choose to share a list, it's done directly through your own email client or by generating a local PDF file.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 dark:text-gray-200">Updates to Privacy Policy</h2>
            <p>
              Any changes to this privacy policy will be posted on this page. As we don't collect user data, any updates will primarily relate to changes in functionality or local storage usage.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 dark:text-gray-200">Contact</h2>
            <p>
              If you have any questions about our privacy practices, please feel free to contact us through the provided support channels.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;