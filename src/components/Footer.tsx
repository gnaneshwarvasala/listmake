import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-12 border-t py-6 px-4 bg-white/50 dark:bg-gray-800/80 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto">
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-6">
          <Link 
            to="/about" 
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            About
          </Link>
          <Link 
            to="/privacy" 
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          <Link 
            to="/faq" 
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            FAQ
          </Link>
        </nav>
        <div className="text-center text-sm text-gray-600 dark:text-gray-400 pt-4 border-t dark:border-gray-700">
          © {new Date().getFullYear()} All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;