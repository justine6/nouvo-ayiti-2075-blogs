"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Topbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo / Title */}
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Nouvo Ayiti 2075
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <a href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Home
          </a>
          <a href="/blog" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Blog
          </a>
          <a href="/#about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            About
          </a>
          <a href="/#contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Contact
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col px-4 py-2 space-y-2">
            <a href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" onClick={() => setIsOpen(false)}>
              Home
            </a>
            <a href="/blog" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" onClick={() => setIsOpen(false)}>
              Blog
            </a>
            <a href="/#about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" onClick={() => setIsOpen(false)}>
              About
            </a>
            <a href="/#contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" onClick={() => setIsOpen(false)}>
              Contact
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
