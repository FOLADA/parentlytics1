"use client";

import { useState, useEffect } from 'react';
import { ExternalLink, Facebook, Heart, MessageCircle, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { motion } from 'framer-motion';

// Компонент анимированной точки
const Particle = ({ index, colorClass = "bg-purple-400" }: { index: number, colorClass?: string }) => {
  if (typeof window === 'undefined') return null;
  return (
    <motion.div
      className={`absolute w-1 h-1 rounded-full ${colorClass}`}
      initial={{
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: 0,
      }}
      animate={{
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        delay: index * 0.2,
      }}
    />
  );
};

export default function Community() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Mother of twins",
      quote: "This community saved my sanity during those first sleepless months. Knowing I wasn't alone made all the difference.",
      delay: 0.1
    },
    {
      name: "James T.",
      role: "First-time dad",
      quote: "The developmental tracking gave me confidence when I felt completely lost. Now I actually enjoy parenting!",
      delay: 0.3
    },
    {
      name: "Priya K.",
      role: "Working mom",
      quote: "Connecting with parents in similar situations helped me balance career and family without guilt. Lifesaver!",
      delay: 0.5
    },
    {
      name: "Miguel R.",
      role: "Single father",
      quote: "The emotional support here is incredible. Finally found my village when I needed it most.",
      delay: 0.7
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <>
      <main className="relative min-h-screen flex flex-col items-center justify-center py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        {/* Анимированные фиолетовые точки */}
        <div className="fixed inset-0 pointer-events-none">
          {Array.from({ length: 50 }, (_, i) => (
            <Particle key={i} index={i} />
          ))}
        </div>
        {/* Удалённый видеофон и overlay */}

        {/* Floating blobs */}

        {/* Main content */}
        <div className="flex flex-col items-center w-full px-4 relative z-10 text-center text-base md:text-lg mt-[-40px]">
          <motion.span
            className="inline-flex items-center px-4 py-1 mb-6 rounded-full bg-white/80 border font-medium text-base shadow-sm backdrop-blur-lg" style={{ borderColor: 'var(--color-indigo-600)', color: 'var(--color-indigo-600)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m13-6.13V7a4 4 0 00-3-3.87M9 4.13A4 4 0 004 7v3m16 0a4 4 0 01-3 3.87M4 10a4 4 0 003 3.87m0 0A4 4 0 0012 17a4 4 0 005-3.13M7 13.87V17m10-3.13V17" />
            </svg>
            You're not alone in this journey
          </motion.span>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Find Your{' '}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-300 bg-clip-text text-transparent font-bold">Parenting Tribe</span>
          </motion.h1>

          <motion.p
            className="text-lg text-white mb-10 max-w-2xl mx-auto leading-relaxed text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Connect with thousands of parents who truly understand. Share experiences, get support through every challenge.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <a
              href="https://www.facebook.com/groups/your-group-link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-7 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 text-base"
            >
              <Facebook className="w-5 h-5" />
              Join Our Facebook Group
              <ExternalLink className="w-5 h-5 ml-2" />
            </a>
            <a
              href="#testimonials"
              className="inline-flex items-center justify-center gap-3 bg-white text-indigo-600 px-7 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-50 text-base"
            >
              <MessageCircle className="w-5 h-5" />
              Hear from parents
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {[
              { label: "Parents Connected", value: "25K+", icon: Users },
              { label: "Daily Conversations", value: "120+", icon: MessageCircle },
              { label: "Feel More Supported", value: "98%", icon: Heart }
            ].map((stat, idx) => (
              <div key={stat.label} className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 text-center min-w-[298px]">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-2 shadow-lg">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Testimonials */}
      <section
        id="testimonials"
        aria-labelledby="testimonials-heading"
        className="relative py-20 bg-gradient-to-b from-sky-50 to-white px-4"
      >
        {/* Анимированные точки на фоне секции отзывов */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {Array.from({ length: 100 }, (_, i) => (
            <Particle key={"testimonial-" + i} index={i} colorClass="bg-purple-300 shadow-lg shadow-purple-400/60" />
          ))}
        </div>
        {/* Декоративные bubble-иллюстрации */}
        <img
          src="/bubbles.png"
          alt="bubbles left"
          className="hidden md:block absolute left-0 top-[-30px] w-[340px] max-w-[40vw] z-0 pointer-events-none select-none opacity-95 saturate-70"
          style={{objectFit: 'contain'}}
        />
        <img
          src="/bubbles2.png"
          alt="bubbles right"
          className="hidden md:block absolute right-0 bottom-0 w-[340px] max-w-[40vw] z-0 pointer-events-none select-none opacity-95 saturate-70"
          style={{objectFit: 'contain'}}
        />
        {/* Фото-иллюстрация справа */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              id="testimonials-heading"
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Real Stories from Our Parenting Community
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join thousands who've found friendship and support
            </motion.p>
          </div>

          {/* Testimonial Card Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-blue-50"
            >
              <div className="flex items-start mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mr-5">
                  {testimonials[currentTestimonial].name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{testimonials[currentTestimonial].name}</h3>
                  <p className="text-purple-600 text-sm">{testimonials[currentTestimonial].role}</p>
                </div>
                <Heart className="ml-auto text-rose-400 fill-rose-100" size={24} />
              </div>
              <p className="text-gray-600 text-lg italic relative pl-6 before:content-['“'] before:absolute before:left-0 before:top-0 before:text-7xl before:font-serif before:text-purple-300 before:leading-none">
                {testimonials[currentTestimonial].quote}
              </p>
            </motion.div>

            {/* Carousel controls */}
            <div className="flex justify-center items-center space-x-3">
              <button onClick={prevTestimonial} className="p-3 rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-50 transition-colors mt-[46px]">
                <ChevronLeft className="text-gray-600" />
              </button>
              <div className="flex space-x-3 mt-[44px]">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
                      currentTestimonial === index ? 'bg-purple-500 scale-125' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button onClick={nextTestimonial} className="p-3 rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-50 transition-colors mt-[50px]">
                <ChevronRight className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* CTA under testimonials */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Ready to join your parenting tribe?
            </h3>
            <a
              href="https://www.facebook.com/groups/your-group-link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
            >
              <Facebook className="w-5 h-5" />
              Join Our Facebook Group Now
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
