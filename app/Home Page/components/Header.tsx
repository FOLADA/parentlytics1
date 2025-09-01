'use client';

import { Button } from "./ui/button";
import { Sparkles, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-sky-200/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-sky-400 to-blue-500 rounded-xl flex items-center justify-center relative overflow-hidden">
              <span className="text-white text-lg">P</span>
            </div>
            <span className="text-slate-800 text-2xl tracking-tight">Parentlytics</span>
            <Sparkles className="w-5 h-5 text-sky-500" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {["ფუნქციები", "გზამკვლევი", "ფასი"].map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-slate-600 hover:text-sky-600 transition-colors duration-200 relative group"
              >
                {item}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button 
              className="hidden md:inline-flex bg-gradient-to-r from-sky-400 to-blue-500 text-white border-0 hover:from-sky-500 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-sky-500/25"
              size="sm"
            >
              დაიწყე
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden ${isMenuOpen ? 'max-h-64' : 'max-h-0'}`}
        >
          <div className="py-4 space-y-4">
            {["ფუნქციები", "გზამკვლევი", "ფასი"].map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-slate-600 hover:text-sky-600 transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div>
              <Button className="w-full bg-gradient-to-r from-sky-400 to-blue-500 text-white">
                დაიწყე
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}