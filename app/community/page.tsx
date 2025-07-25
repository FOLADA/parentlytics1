"use client";

import { useState, useEffect } from 'react';
import { ExternalLink, Facebook, Heart, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from 'framer-motion';

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
      <main className="relative min-h-screen flex flex-col items-center justify-center py-20 bg-white overflow-hidden">
        {/* Background video */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src="/bc-video.mp4"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-indigo-900/40" />
        </div>

        {/* Floating blobs */}
        <div className="absolute top-20 left-10 w-48 h-48 bg-pink-300/30 rounded-full filter blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-300/30 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000" />

        {/* Main content */}
        <div className="flex flex-col items-center w-full px-4 relative z-10 text-center">
          <motion.span
            className="inline-flex items-center px-4 py-1 mb-6 rounded-full bg-white/80 border border-blue-100 text-blue-600 font-medium shadow-sm backdrop-blur-lg"
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
            Find Your <span className="text-cyan-300 font-serif italic">Parenting Tribe</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-blue-100 max-w-2xl backdrop-blur-sm px-4 py-2 rounded-lg mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Connect with thousands of parents who truly understand. Share experiences, celebrate wins, and get support through every challenge.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <a
              href="https://www.facebook.com/groups/your-group-link"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-lg shadow-lg transition-transform duration-500 hover:scale-105"
            >
              <Facebook className="w-5 h-5 mr-3" />
              Join Our Facebook Group
              <ExternalLink className="ml-2 w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="#testimonials"
              className="group inline-flex items-center justify-center px-6 py-4 rounded-xl bg-white/90 text-blue-600 font-medium backdrop-blur-md border border-white shadow-sm transition-transform duration-500 hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 mr-2 text-blue-500 group-hover:text-cyan-500 transition-colors" />
              Hear from parents
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mt-12 bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {[
              { label: "Parents Connected", value: "25K+" },
              { label: "Daily Conversations", value: "120+" },
              { label: "Feel More Supported", value: "98%" }
            ].map((stat, idx) => (
              <div className="text-center" key={idx}>
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
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
                <div className="bg-gradient-to-br from-cyan-400 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mr-5">
                  {testimonials[currentTestimonial].name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{testimonials[currentTestimonial].name}</h3>
                  <p className="text-cyan-600 text-sm">{testimonials[currentTestimonial].role}</p>
                </div>
                <Heart className="ml-auto text-rose-400 fill-rose-100" size={24} />
              </div>
              <p className="text-gray-600 text-lg italic relative pl-6 before:content-['“'] before:absolute before:left-0 before:top-0 before:text-7xl before:font-serif before:text-cyan-200 before:leading-none">
                {testimonials[currentTestimonial].quote}
              </p>
            </motion.div>

            {/* Carousel controls */}
            <div className="flex justify-center mt-8 space-x-3">
              <button onClick={prevTestimonial} className="p-3 rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-50 transition-colors">
                <ChevronLeft className="text-gray-600" />
              </button>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
                    currentTestimonial === index ? 'bg-cyan-500 scale-125' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
              <button onClick={nextTestimonial} className="p-3 rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-50 transition-colors">
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
              className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-lg shadow-lg transition-transform hover:scale-105"
            >
              <Facebook className="w-5 h-5 mr-3" />
              Join Our Facebook Group Now
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
