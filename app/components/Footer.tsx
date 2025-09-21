import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-8 transition-colors">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        {/* Left side */}
        <div className="text-center md:text-left text-gray-600 dark:text-gray-300">
          <p>© {new Date().getFullYear()} Nouvo Ayiti 2075. All rights reserved.</p>
          <p className="mt-1">
            Built with <span className="text-red-500">♥</span> and hope for Haiti’s future.
          </p>
        </div>

        {/* Right side - Social Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" aria-label="Facebook">
            <Facebook size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" aria-label="Twitter">
            <Twitter size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" aria-label="Instagram">
            <Instagram size={20} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" aria-label="YouTube">
            <Youtube size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
