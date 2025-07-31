'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { MessageSquare, LineChart, Lightbulb, Heart, Sparkles } from 'lucide-react';

const cards = [
  {
    icon: MessageSquare,
    title: "AI Chat",
    description: "24/7 intelligent parenting support",
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50"
  },
  {
    icon: LineChart,
    title: "Analytics",
    description: "Deep insights into child development",
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-50 to-pink-50"
  },
  {
    icon: Lightbulb,
    title: "Smart Tips",
    description: "Personalized parenting advice",
    color: "from-orange-500 to-red-500",
    bgColor: "from-orange-50 to-red-50"
  },
  {
    icon: Heart,
    title: "Care",
    description: "Emotional support and guidance",
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50"
  }
];

export function InteractiveCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Interactive <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">3D</span> Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our features with immersive 3D interactions and smooth animations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                  z: 50
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
                className={`
                  relative bg-gradient-to-br ${card.bgColor} 
                  rounded-2xl p-8 h-80 border border-gray-200 
                  shadow-lg hover:shadow-2xl transition-all duration-500
                  cursor-pointer overflow-hidden
                `}
              >
                {/* 3D Background Effect */}
                <motion.div
                  animate={{
                    rotate: hoveredIndex === index ? 360 : 0,
                    scale: hoveredIndex === index ? 1.2 : 1
                  }}
                  transition={{ duration: 2, ease: "linear" }}
                  className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl"
                />

                {/* Icon */}
                <motion.div
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360
                  }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                >
                  <card.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {card.description}
                </p>

                {/* Floating Elements */}
                <motion.div
                  animate={{
                    y: hoveredIndex === index ? [-10, 10, -10] : 0,
                    opacity: hoveredIndex === index ? [0.5, 1, 0.5] : 0.3
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-4 right-4"
                >
                  <Sparkles className="w-6 h-6 text-gray-400" />
                </motion.div>

                {/* Glow Effect */}
                <motion.div
                  animate={{
                    opacity: hoveredIndex === index ? [0, 1, 0] : 0
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-10 rounded-2xl blur-xl`}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 