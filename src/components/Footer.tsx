import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-12 border-t py-8 px-4 bg-white/50 dark:bg-gray-800/80 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <Link to="/about" className="block text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
              About
            </Link>
            <Link to="/privacy" className="block text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/faq" className="block text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
              FAQ
            </Link>
          </div>
        </div>
        <div className="text-center text-sm text-gray-600 dark:text-gray-400 pt-4 border-t dark:border-gray-700">
          © {new Date().getFullYear()} All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;