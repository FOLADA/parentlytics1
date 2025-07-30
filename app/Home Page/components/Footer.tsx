'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Roadmap', href: '#roadmap' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'API', href: '#' },
    ],
    company: [
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
    social: [
      { name: 'Facebook', href: '#', icon: Facebook },
      { name: 'Twitter', href: '#', icon: Twitter },
      { name: 'Instagram', href: '#', icon: Instagram },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Matrix-like Code Rain */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px bg-gradient-to-b from-transparent via-sky-400/20 to-transparent"
            style={{
              left: `${(i * 7) + Math.random() * 5}%`,
              height: '100%'
            }}
            animate={{
              y: ['-100%', '100%'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear"
            }}
          />
        ))}

        {/* Glowing Orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl"
          animate={{
            scale: [1.1, 0.9, 1.1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-sky-400 to-blue-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg font-bold">P</span>
                  </div>
                  <span className="text-2xl font-bold">Parentlytics</span>
                </div>
                <p className="text-slate-300 leading-relaxed mb-6">
                  AI-powered child development tracking that transforms parenting from overwhelming to empowering.
                </p>
                <div className="flex space-x-4">
                  {footerLinks.social.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors duration-300" />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Product Links */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Product</h3>
              <ul className="space-y-4">
                {footerLinks.product.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link 
                      href={link.href}
                      className="text-slate-300 hover:text-white transition-colors duration-300 relative group"
                    >
                      {link.name}
                      <motion.div
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 group-hover:w-full transition-all duration-300"
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-4">
                {footerLinks.company.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link 
                      href={link.href}
                      className="text-slate-300 hover:text-white transition-colors duration-300 relative group"
                    >
                      {link.name}
                      <motion.div
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 group-hover:w-full transition-all duration-300"
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Support Links */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-4">
                {footerLinks.support.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link 
                      href={link.href}
                      className="text-slate-300 hover:text-white transition-colors duration-300 relative group"
                    >
                      {link.name}
                      <motion.div
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 group-hover:w-full transition-all duration-300"
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Contact Information */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-white/10 py-8"
        >
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
              <span className="text-slate-300">San Francisco, CA</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between"
        >
          <div className="text-slate-400 text-sm mb-4 md:mb-0">
            © 2024 Parentlytics. All rights reserved.
          </div>
          
          <motion.button
            onClick={scrollToTop}
            className="w-12 h-12 bg-gradient-to-r from-sky-400 to-blue-500 rounded-xl flex items-center justify-center hover:from-sky-500 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-sky-500/25 group"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ArrowUp className="w-5 h-5 text-white group-hover:-translate-y-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}