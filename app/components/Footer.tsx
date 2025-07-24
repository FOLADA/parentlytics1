'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-gray-700">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-extrabold text-indigo-600 mb-2">Parentlytics</h2>
          <p className="text-sm leading-relaxed">
            Empowering parents with AI to nurture confident, healthy children. Designed with love and data.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-2">ნავიგაცია</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/" className="hover:text-indigo-600 transition">მთავარი</Link></li>
            <li><Link href="/ai" className="hover:text-indigo-600 transition">ასისტენტი</Link></li>
            <li><Link href="/dashboard" className="hover:text-indigo-600 transition">დაშბოარდი</Link></li>
            <li><Link href="/community" className="hover:text-indigo-600 transition">ქომუნითი</Link></li>
          </ul>
        </div>

        {/* Social / Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2">დაგვიკავშირდი</h3>
          <ul className="space-y-1 text-sm">
            <li>Email: support@parentlytics.com</li>
          </ul>
          <div className="flex mt-4 space-x-4 text-indigo-600">
            <a href="#" aria-label="Facebook" className="hover:text-purple-600">
              <Facebook size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-purple-600">
              <Twitter size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-purple-600">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Parentlytics. ყველა უფლება დაცულია.
      </div>
    </footer>
  );
}