'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const navLinks = [
  { name: 'მთავარი', href: '/' },
  { name: 'ასისტენტი', href: '/ai' },
  { name: 'კვება', href: '/diet' },
  { name: 'დაშბოარდი', href: '/dashboard' },
  { name: 'ქომუნითი', href: '/community' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-lg shadow-lg font-sans">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-extrabold text-indigo-600 tracking-tight"
        >
          Parentlytics
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative group text-[16px] text-gray-700 hover:text-indigo-600 transition font-medium"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          {/* Desktop Login Button */}
          <Link
            href="/login"
            className="ml-4 inline-block px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-md hover:shadow-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
          >
            შესვლა
          </Link>
        </div>

        {/* Mobile Icon */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 hover:text-indigo-600 transition"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="md:hidden overflow-hidden bg-white/90 px-6 pb-6 backdrop-blur-md shadow-md"
          >
            <div className="flex flex-col space-y-4 mt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-indigo-600 transition font-medium border-b pb-2"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Login Button */}
              <Link
                href="/login"
                className="mt-2 inline-block w-full text-center px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                შესვლა
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}