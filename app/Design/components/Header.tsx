import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-50">
      <div className="bg-gradient-to-r from-sky-50 to-blue-50 backdrop-blur-md border-b border-sky-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white">P</span>
              </div>
              <span className="text-slate-800 text-xl tracking-tight">Parentlytics</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-sky-600 transition-colors">
                Features
              </a>
              <a href="#ai-benefits" className="text-slate-600 hover:text-sky-600 transition-colors">
                Why AI
              </a>
              <a href="#roadmap" className="text-slate-600 hover:text-sky-600 transition-colors">
                Roadmap
              </a>
              <a href="#pricing" className="text-slate-600 hover:text-sky-600 transition-colors">
                Pricing
              </a>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className="text-slate-600 hover:text-sky-600">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-sky-400 to-blue-500 text-white border-0 hover:from-sky-500 hover:to-blue-600">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-sky-200/50">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-slate-600 hover:text-sky-600 transition-colors">
                  Features
                </a>
                <a href="#ai-benefits" className="text-slate-600 hover:text-sky-600 transition-colors">
                  Why AI
                </a>
                <a href="#roadmap" className="text-slate-600 hover:text-sky-600 transition-colors">
                  Roadmap
                </a>
                <a href="#pricing" className="text-slate-600 hover:text-sky-600 transition-colors">
                  Pricing
                </a>
                <div className="flex flex-col space-y-2 pt-4">
                  <Button variant="ghost" className="text-slate-600 hover:text-sky-600 justify-start">
                    Sign In
                  </Button>
                  <Button className="bg-gradient-to-r from-sky-400 to-blue-500 text-white border-0 hover:from-sky-500 hover:to-blue-600 justify-start">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}