import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-12 border-t py-8 px-4 bg-white/50 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="font-semibold mb-2">Navigation</h3>
            <Link to="/about" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link to="/privacy" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/faq" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
              FAQ
            </Link>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-600 hover:text-blue-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-600 pt-4 border-t">
          © {new Date().getFullYear()} All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;