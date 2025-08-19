"use client";

import { useState, useEffect } from 'react';
import { ExternalLink, Facebook, Heart, MessageCircle, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { motion } from 'framer-motion';

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
      name: "ქეთი მ.",
      role: "ტყუპების დედა",
      quote: "ამ საზოგადოებამ გადამარჩინა იმ უსინათლო თვეებში. იმის ცოდნამ, რომ მარტო არ ვიყავი, ყველაფერი შეცვალა.",
      delay: 0.1
    },
    {
      name: "საბა თ.",
      role: "პირველად მამა",
      quote: "AI ასისტენტმა ყველაზე მეტი გამიკეთა, როცა სრულიად დაკარგული ვიყავი. ახლა მშობლობა ნამდვილად მიხარია!",
      delay: 0.3
    },
    {
      name: "სალომე კ.",
      role: "მუშა დედა",
      quote: "მსგავს სიტუაციაში მყოფ მშობლებთან კავშირმა დამეხმარა, კარიერა და ოჯახი დანაშაულის გრძნობის გარეშე გამეწონასწორებინა. გადამრჩენელი!",
      delay: 0.5
    },
    {
      name: "დავით რ.",
      role: "მარტოხელა მამა",
      quote: "აქ ემოციური მხარდაჭერა საოცარია. ბოლოს და ბოლოს ვიპოვე ჩემი ადგილი, რომელიც ყველაზე მეტად მჭირდებოდა.",
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
        <div className="fixed inset-0 pointer-events-none">
          {Array.from({ length: 50 }, (_, i) => (
            <Particle key={i} index={i} />
          ))}
        </div>

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
            აამ გზაზე მხოლოდ თქვენ არ ხართ
          </motion.span>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            შემოუერთდით ჩვენს{' '}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-300 bg-clip-text text-transparent font-bold">მშობელთა საზოგადოებას</span>
          </motion.h1>

          <motion.p
            className="text-lg text-white mb-10 max-w-2xl mx-auto leading-relaxed text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            დაუკავშირდით ათასობით მშობელს, რომლებიც ნამდვილად თანაგიგრძნობენ. გააზიარეთ გამოცდილება, მიიღეთ მხარდაჭერა ყველა გამოწვევაში.
          </motion.p>

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
              შეუერთდით ჩვენს Facebook ჯგუფს
              <ExternalLink className="w-5 h-5 ml-2" />
            </a>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {[
              { label: "მყოფი მშობლები", value: "25K+", icon: Users },
              { label: "დღიური საუბრები", value: "120+", icon: MessageCircle },
              { label: "გრძნობს მეტ მხარდაჭერას", value: "98%", icon: Heart }
            ].map((stat) => (
              <div key={stat.label} className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 text-center min-w-[298px]">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4 shadow-lg">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </main>

      <section
        id="testimonials"
        aria-labelledby="testimonials-heading"
        className="relative py-20 bg-gradient-to-b from-sky-50 to-white px-4"
      >
        <div className="absolute inset-0 pointer-events-none z-0">
          {Array.from({ length: 100 }, (_, i) => (
            <Particle key={"testimonial-" + i} index={i} colorClass="bg-purple-300 shadow-lg shadow-purple-400/60" />
          ))}
        </div>

        <img
          src="/bubbles.png"
          alt="ბუშტები მარცხნივ"
          className="hidden md:block absolute left-0 top-[-30px] w-[340px] max-w-[40vw] z-0 pointer-events-none select-none opacity-95 saturate-70"
          style={{objectFit: 'contain'}}
        />
        <img
          src="/bubbles2.png"
          alt="ბუშტები მარჯვნივ"
          className="hidden md:block absolute right-0 bottom-0 w-[340px] max-w-[40vw] z-0 pointer-events-none select-none opacity-95 saturate-70"
          style={{objectFit: 'contain'}}
        />

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
              ნამდვილი გამოცდილება ჩვენი მშობლების საზოგადოებისგან
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              შეუერთდით ათასობით ადამიანს, რომლებმაც იპოვეს მეგობრები და მხარდაჭერა
            </motion.p>
          </div>

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
                    aria-label={`გადადი`}
                  />
                ))}
              </div>
              <button onClick={nextTestimonial} className="p-3 rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-50 transition-colors mt-[50px]">
                <ChevronRight className="text-gray-600" />
              </button>
            </div>
          </div>

          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              მზად ხართ შემოგვიერთდეთ?
            </h3>
            <a
              href="https://www.facebook.com/groups/your-group-link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
            >
              <Facebook className="w-5 h-5" />
              შეუერთდით ჩვენს Facebook ჯგუფს ახლავე
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
