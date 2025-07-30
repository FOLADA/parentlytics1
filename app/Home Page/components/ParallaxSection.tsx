'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Shield, Brain } from 'lucide-react';

export function ParallaxSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
      {/* Floating 3D Elements */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="grid grid-cols-3 gap-20">
          <motion.div
            animate={{ 
              rotateY: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-2xl"
          >
            <Sparkles className="w-16 h-16 text-white" />
          </motion.div>
          
          <motion.div
            animate={{ 
              rotateX: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-2xl"
          >
            <Shield className="w-16 h-16 text-white" />
          </motion.div>
          
          <motion.div
            animate={{ 
              rotateZ: [0, 360],
              scale: [1, 1.15, 1]
            }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="w-32 h-32 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl"
          >
            <Brain className="w-16 h-16 text-white" />
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI-Powered Parenting
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Experience the future of child development with cutting-edge AI technology
          </p>
        </motion.div>
      </div>
    </section>
  );
} 