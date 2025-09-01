'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const cards = [
  {
    title: "AI ჩატი",
    description: "24/7 ინტელექტუალური მხარდაჭერა მშობლებისთვის",
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50"
  },
  {
    title: "ანალიტიკა",
    description: "გაგება ბავშვთა განვითარების ღრმა დეტალებში",
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-50 to-pink-50"
  },
  {
    title: "ჭკვიანი რჩევები",
    description: "პერსონალური მშობლობის რჩევები",
    color: "from-orange-500 to-red-500",
    bgColor: "from-orange-50 to-red-50"
  },
  {
    title: "ზრუნვა",
    description: "ემოციური მხარდაჭერა და მიმართულება",
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
            ინტერაქტიული <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">3D</span> გამოცდილება
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            გამოიკვლიე ჩვენი ფუნქციები ინტეგრირებული 3D ინტერაქციებით და სქელ ენიმაციებით
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
              <div
                className={`relative bg-gradient-to-br ${card.bgColor} rounded-2xl p-8 h-80 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden`}
              >
                {/* Simplified Background Effect */}
                <div
                  className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full"
                ></div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {card.description}
                </p>

                {/* Floating Elements */}
                <div
                  className="absolute bottom-4 right-4 w-6 h-6 bg-white/20 rounded-full"
                ></div>

                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-10 rounded-2xl`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
