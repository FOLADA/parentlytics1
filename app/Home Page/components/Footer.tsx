'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    product: [
      { name: 'ფუნქციები', href: '#features' },
      { name: 'გზამკვლევი', href: '#roadmap' },
      { name: 'ფასი', href: '#pricing' },
      { name: 'API', href: '#' },
    ],
    company: [
      { name: 'ჩვენ შესახებ', href: '#' },
      { name: 'ბლოგი', href: '#' },
      { name: 'კარიერა', href: '#' },
      { name: 'მედია', href: '#' },
    ],
    support: [
      { name: 'მხარდაჭერა', href: '#' },
      { name: 'კონტაქტი', href: '#' },
      { name: 'კონფიდენციალურობის პოლიტიკა', href: '#' },
      { name: 'მომსახურების პირობები', href: '#' },
    ],
    social: [
      { name: 'Facebook', href: '#', icon: Facebook },
      { name: 'Twitter', href: '#', icon: Twitter },
      { name: 'Instagram', href: '#', icon: Instagram },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Static background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-sky-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg font-bold">P</span>
                </div>
                <span className="text-2xl font-bold">Parentlytics</span>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                AI ტექნოლოგიით უზრუნველყოფილი ბავშვების განვითარება, რომელიც მშობელობას ცვლის დაძაბულობიდან გაძლიერებულ გამოცდილებად.
              </p>
              <div className="flex space-x-4">
                {footerLinks.social.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
                    >
                      <Icon className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors duration-300" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-lg font-semibold mb-6">პროდუქტი</h3>
            <ul className="space-y-4">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-300 hover:text-white transition-colors duration-300 relative group">
                    {link.name}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">კომპანია</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-300 hover:text-white transition-colors duration-300 relative group">
                    {link.name}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">მხარდაჭერა</h3>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-300 hover:text-white transition-colors duration-300 relative group">
                    {link.name}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className="border-t border-white/10 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-sky-400" />
              <span className="text-slate-300">hello@parentlytics.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-sky-400" />
              <span className="text-slate-300">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-sky-400" />
              <span className="text-slate-300">სან ფრანცისკო, CA</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between">
          <div className="text-slate-400 text-sm mb-4 md:mb-0">
            © 2024 Parentlytics. ყველა უფლება დაცულია.
          </div>
          
          <button onClick={scrollToTop} className="w-12 h-12 bg-gradient-to-r from-sky-400 to-blue-500 rounded-xl flex items-center justify-center hover:from-sky-500 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-sky-500/25 group">
            <ArrowUp className="w-5 h-5 text-white group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}