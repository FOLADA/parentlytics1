import { Separator } from "./ui/separator";
import { Heart, Mail, Twitter, Linkedin, Github, ArrowUp, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Footer() {
  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Roadmap", href: "#roadmap" },
      { name: "AI Technology", href: "#ai-benefits" }
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press Kit", href: "#" }
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Community", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "Status", href: "#" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Data Protection", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: "#", color: "hover:text-sky-500", name: "Twitter" },
    { icon: Linkedin, href: "#", color: "hover:text-blue-600", name: "LinkedIn" },
    { icon: Github, href: "#", color: "hover:text-slate-700", name: "GitHub" },
    { icon: Mail, href: "#", color: "hover:text-red-500", name: "Email" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      ref={footerRef}
      className="bg-gradient-to-br from-slate-50 to-sky-50 border-t border-sky-200/50 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle Wave Animation */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 opacity-10"
          animate={{
            background: [
              "linear-gradient(90deg, rgba(56, 189, 248, 0.1) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(99, 102, 241, 0.1) 100%)",
              "linear-gradient(90deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(56, 189, 248, 0.1) 100%)",
              "linear-gradient(90deg, rgba(56, 189, 248, 0.1) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(99, 102, 241, 0.1) 100%)"
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-sky-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10"
      >
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex items-center space-x-3 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="w-10 h-10 bg-gradient-to-r from-sky-400 to-blue-500 rounded-xl flex items-center justify-center relative overflow-hidden group"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-white text-lg">P</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <span className="text-slate-800 text-2xl tracking-tight">Parentlytics</span>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-sky-500" />
              </motion.div>
            </motion.div>

            <p className="text-slate-600 mb-8 max-w-sm leading-relaxed">
              AI-powered parental development dashboard that helps you track your child's growth 
              and feel confident in your parenting journey.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className={`w-10 h-10 bg-white/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-slate-400 ${social.color} transition-all duration-300 hover:bg-white/70 hover:shadow-lg border border-slate-200/50 hover:border-slate-300/50`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -2,
                      rotate: 5
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 300
                    }}
                    viewport={{ once: true }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: categoryIndex * 0.1
              }}
              viewport={{ once: true }}
            >
              <motion.h4 
                className="text-slate-800 mb-6 capitalize"
                whileHover={{ color: "rgb(56, 189, 248)" }}
                transition={{ duration: 0.2 }}
              >
                {category}
              </motion.h4>
              <ul className="space-y-4">
                {links.map((link, linkIndex) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: categoryIndex * 0.1 + linkIndex * 0.05,
                      duration: 0.4
                    }}
                    viewport={{ once: true }}
                  >
                    <motion.a
                      href={link.href}
                      className="text-slate-600 hover:text-sky-600 transition-colors duration-200 inline-block relative group"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {link.name}
                      <motion.div
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"
                      />
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Separator className="bg-sky-200/50 mb-8" />
        </motion.div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-8">
          <motion.div 
            className="flex items-center space-x-4 text-slate-600"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span>&copy; 2025 Parentlytics. All rights reserved.</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-2 text-slate-600"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span>Made with</span>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-4 h-4 text-red-500" />
            </motion.div>
            <span>for parents everywhere</span>
          </motion.div>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="w-10 h-10 bg-sky-500 hover:bg-sky-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/25"
            whileHover={{ 
              scale: 1.1, 
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6,
              delay: 0.2
            }}
            viewport={{ once: true }}
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Disclaimer */}
        <motion.div
          className="mt-8 pt-8 border-t border-sky-200/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-sm text-slate-500 text-center max-w-4xl mx-auto leading-relaxed relative"
            whileHover={{ color: "rgb(71, 85, 105)" }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              className="absolute -top-2 left-0 w-full h-full bg-gradient-to-r from-transparent via-sky-100/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"
            />
            <span className="relative z-10">
              <strong>Important:</strong> Parentlytics is designed to support and enhance your parenting journey, 
              not replace professional medical or psychological advice. Always consult with qualified healthcare 
              professionals for medical concerns. We prioritize your privacy and do not collect sensitive personal data.
            </span>
          </motion.p>
        </motion.div>
      </motion.div>
    </footer>
  );
}