"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Check, Star, Zap, Shield, Users, Heart, Sparkles } from "lucide-react";

// CSS Animated Background Component
const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/2 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full animate-pulse delay-2000"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-white/10 rounded-full animate-bounce"></div>
      <div className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-white/10 rounded-full animate-bounce delay-500"></div>
      <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-white/10 rounded-full animate-bounce delay-1000"></div>
    </div>
  );
};

export default function Pricing() {
  const containerRef = useRef(null);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Fixed positions for floating particles
  const floatingParticles = [
    { y: 25, x: -30, duration: 7.2, delay: 0.3, width: 6, height: 6, top: "15%", left: "20%" },
    { y: -40, x: 15, duration: 8.5, delay: 1.7, width: 4, height: 4, top: "45%", left: "75%" },
    { y: 30, x: -20, duration: 6.8, delay: 0.8, width: 8, height: 8, top: "65%", left: "10%" },
    { y: -25, x: 35, duration: 9.1, delay: 1.2, width: 5, height: 5, top: "25%", left: "85%" },
    { y: 45, x: -15, duration: 7.5, delay: 0.5, width: 7, height: 7, top: "80%", left: "30%" },
    { y: -35, x: 25, duration: 8.2, delay: 1.9, width: 3, height: 3, top: "35%", left: "60%" },
    { y: 20, x: -40, duration: 6.9, delay: 0.7, width: 6, height: 6, top: "55%", left: "5%" },
    { y: -30, x: 20, duration: 7.8, delay: 1.4, width: 4, height: 4, top: "70%", left: "90%" },
    { y: 40, x: -25, duration: 8.7, delay: 0.9, width: 5, height: 5, top: "10%", left: "40%" },
    { y: -20, x: 30, duration: 6.5, delay: 1.1, width: 7, height: 7, top: "50%", left: "70%" },
    { y: 35, x: -35, duration: 9.3, delay: 0.2, width: 4, height: 4, top: "85%", left: "15%" },
    { y: -45, x: 15, duration: 7.1, delay: 1.6, width: 6, height: 6, top: "20%", left: "55%" },
    { y: 25, x: -20, duration: 8.4, delay: 0.4, width: 5, height: 5, top: "75%", left: "25%" },
    { y: -30, x: 40, duration: 6.7, delay: 1.8, width: 3, height: 3, top: "40%", left: "80%" },
    { y: 50, x: -15, duration: 7.9, delay: 0.6, width: 8, height: 8, top: "60%", left: "45%" },
    { y: -25, x: 25, duration: 8.8, delay: 1.3, width: 4, height: 4, top: "30%", left: "95%" },
    { y: 30, x: -30, duration: 6.3, delay: 0.8, width: 6, height: 6, top: "90%", left: "35%" },
    { y: -40, x: 20, duration: 7.6, delay: 1.5, width: 5, height: 5, top: "15%", left: "65%" },
    { y: 35, x: -25, duration: 8.1, delay: 0.3, width: 4, height: 4, top: "50%", left: "20%" },
    { y: -30, x: 35, duration: 6.9, delay: 1.7, width: 7, height: 7, top: "70%", left: "75%" },
    { y: 45, x: -20, duration: 7.4, delay: 0.5, width: 3, height: 3, top: "25%", left: "50%" },
    { y: -25, x: 30, duration: 8.6, delay: 1.0, width: 6, height: 6, top: "80%", left: "85%" },
    { y: 30, x: -35, duration: 6.8, delay: 0.7, width: 5, height: 5, top: "45%", left: "10%" },
    { y: -35, x: 25, duration: 7.3, delay: 1.4, width: 4, height: 4, top: "65%", left: "60%" },
    { y: 40, x: -30, duration: 8.9, delay: 0.9, width: 7, height: 7, top: "20%", left: "40%" },
    { y: -20, x: 40, duration: 6.4, delay: 1.2, width: 3, height: 3, top: "85%", left: "70%" },
    { y: 35, x: -25, duration: 7.7, delay: 0.4, width: 6, height: 6, top: "35%", left: "25%" },
    { y: -45, x: 15, duration: 8.3, delay: 1.6, width: 5, height: 5, top: "55%", left: "90%" },
    { y: 25, x: -20, duration: 6.6, delay: 0.8, width: 4, height: 4, top: "75%", left: "15%" },
    { y: -30, x: 35, duration: 7.8, delay: 1.1, width: 7, height: 7, top: "10%", left: "50%" }
  ];

  // Fixed positions for floating circles in cards
  const floatingCircles = [
    { top: "35.42%", left: "78.68%" },
    { top: "77.50%", left: "63.47%" },
    { top: "22.46%", left: "30.96%" }
  ];

  const plans = [
    {
      title: "Basic",
      price: "₾29",
      period: "/თვე",
      description: "Perfect for new parents starting their journey",
      color: "from-blue-500 to-indigo-600",
      isPopular: false,
      features: [
        "AI Chat Support (5 questions/day)",
        "Basic Development Tracking",
        "Daily Tips & Suggestions",
        "Email Support",
        "Basic Progress Reports"
      ],
      icon: Heart
    },
    {
      title: "Premium",
      price: "₾59",
      period: "/თვე",
      description: "Most popular choice for growing families",
      color: "from-indigo-500 to-purple-600",
      isPopular: true,
      features: [
        "Unlimited AI Chat Support",
        "Advanced Development Analytics",
        "Personalized Meal Plans",
        "Priority Support",
        "Detailed Progress Reports",
        "Milestone Celebrations",
        "Family Dashboard"
      ],
      icon: Sparkles
    },
    {
      title: "Family",
      price: "₾99",
      period: "/თვე",
      description: "Complete solution for multiple children",
      color: "from-purple-500 to-pink-600",
      isPopular: false,
      features: [
        "Everything in Premium",
        "Up to 5 Child Profiles",
        "Family Analytics Dashboard",
        "24/7 Priority Support",
        "Custom Development Plans",
        "Integration with Healthcare Providers",
        "Advanced AI Insights"
      ],
      icon: Users
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-purple-500/20 to-pink-500/20"
        />
        
        {/* Floating Shapes */}
        <FloatingShapes />
      </div>
      
      {/* Floating Particles with Fixed Positions */}
      {mounted && (
        <div className="absolute inset-0 z-10">
          {floatingParticles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.7, 0],
                y: [0, particle.y],
                x: [0, particle.x],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
              style={{
                width: `${particle.width}px`,
                height: `${particle.height}px`,
                top: particle.top,
                left: particle.left,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Glowing Background Elements */}
      <div className="absolute top-[10%] right-[10%] w-80 h-80 bg-indigo-500 rounded-full filter blur-[120px] opacity-20"></div>
      <div className="absolute bottom-[20%] left-[5%] w-96 h-96 bg-purple-500 rounded-full filter blur-[120px] opacity-15"></div>
      <div className="absolute top-[40%] left-[20%] w-64 h-64 bg-blue-500 rounded-full filter blur-[100px] opacity-20"></div>

      {/* Content Container */}
      <section 
        ref={containerRef}
        className="relative z-30 py-20 px-4 md:px-8 lg:px-16"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            >
              აირჩიე პაკეტი, რომელიც შენს ოჯახს ზრდის
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-indigo-200 mb-6"
            >
              მიიღე სანდო მხარდაჭერა, ემოციური სიმშვიდე და პროგრესის ნათელი გზა
            </motion.p>
            
            {/* Animated Brand Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full"
            >
              <div className="flex items-center">
                <div className="w-3 h-3 bg-indigo-400 rounded-full mr-1 animate-pulse"></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full mr-1 animate-pulse delay-100"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-200"></div>
              </div>
              <span className="font-bold text-white">Parentlytics</span>
              <span className="text-indigo-300">1,200+ ქართული ოჯახი</span>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                whileHover={{ scale: plan.isPopular ? 1.08 : 1.03 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setHoveredPlan(plan.title)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`rounded-3xl p-8 border border-white/20 transition-all duration-300 relative overflow-hidden
                  bg-white backdrop-blur-sm
                  ${plan.isPopular
                    ? "scale-105 z-20 shadow-2xl -mt-6 md:-mt-12"
                    : "z-10 shadow-xl"}
                  ${hoveredPlan === plan.title ? "shadow-2xl" : ""}
                `}
                style={plan.isPopular ? { 
                  boxShadow: '0 12px 48px 0 rgba(99,102,241,0.25)',
                  border: '2px solid rgba(165,180,252,0.5)'
                } : {}}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-white/5"></div>
                
                {/* Floating Circle with Fixed Position */}
                <motion.div 
                  className="absolute w-40 h-40 rounded-full bg-white/5 backdrop-blur-sm"
                  animate={{
                    x: [0, 10, 0],
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    top: floatingCircles[idx]?.top || "50%",
                    left: floatingCircles[idx]?.left || "50%",
                  }}
                ></motion.div>
                
                {plan.isPopular && (
                  <motion.div 
                    className="mb-3 inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-sm px-4 py-1.5 rounded-full shadow-lg"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    ყველაზე მოთხოვნადი
                  </motion.div>
                )}
                
                <motion.h3 
                  className="text-2xl font-bold text-slate-800 mb-2 relative z-10"
                  whileHover={{ scale: 1.02 }}
                >
                  {plan.title}
                </motion.h3>
                
                <motion.p 
                  className="text-slate-600 text-base mb-6 relative z-10"
                  whileHover={{ x: 5 }}
                >
                  {plan.description}
                </motion.p>
                
                <motion.div 
                  className="text-4xl font-extrabold text-slate-900 mb-6 relative z-10"
                  whileHover={{ scale: 1.05 }}
                >
                  {plan.price}
                  <span className="text-base font-medium text-slate-600">{plan.period}</span>
                </motion.div>
                
                <ul className="space-y-3 text-left mb-8 relative z-10">
                  {plan.features.map((feature, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start gap-2 text-slate-600"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * i }}
                      whileHover={{ x: 5 }}
                    >
                      <Check className="text-sky-600 mt-1 flex-shrink-0" size={20} />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 5px 15px rgba(99, 102, 241, 0.4)"
                  }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full py-3 px-6 rounded-xl font-bold text-lg transition-colors duration-300 relative z-10
                    ${plan.isPopular
                      ? "bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg"
                      : "bg-sky-600 text-white shadow"}
                  `}
                >
                  დარეგისტრირდი და მიიღე 7 დღიანი უფასო ტრიალი
                </motion.button>
              </motion.div>
            ))}
          </div>

          <motion.p 
            className="text-sm text-indigo-200 mt-10 max-w-2xl mx-auto bg-white/10 backdrop-blur-sm p-4 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            ნებისმიერ დროს შეგიძლია გააუქმო გამოწერა. არანაირი დამალული გადასახადი — 
            <span className="font-semibold text-white"> Parentlytics </span> 
            აქ არის, რომ შენს ოჯახს დაეხმაროს.
          </motion.p>
          
          {/* Floating Call-to-Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16"
          >
            <div className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl shadow-xl font-bold text-lg animate-pulse">
              დარეგისტრირდი და მიიღე 7 დღიანი უფასო ტრიალი
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Additional floating elements */}
      <div className="absolute bottom-10 left-10 w-20 h-20 z-20">
        <div className="w-full h-full bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}