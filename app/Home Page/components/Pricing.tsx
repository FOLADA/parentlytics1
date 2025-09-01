'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Check, Star, Zap, Shield, Users, Heart, Sparkles } from "lucide-react";

// Simplified static background instead of animated components
const StaticBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Static geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full"></div>
      <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-full"></div>
      <div className="absolute bottom-1/4 left-1/2 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full"></div>
      
      {/* Static orbs */}
      <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-white/10 rounded-full"></div>
      <div className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-white/10 rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-white/10 rounded-full"></div>
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

  // Reduced number of floating particles from 30 to 10 for better performance
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
    { y: -20, x: 30, duration: 6.5, delay: 1.1, width: 7, height: 7, top: "50%", left: "70%" }
  ];

  // Fixed circles in cards
  const floatingCircles = [
    { top: "35.42%", left: "78.68%" },
    { top: "77.50%", left: "63.47%" },
    { top: "22.46%", left: "30.96%" }
  ];

  const plans = [
    {
      title: "საბაზისო",
      price: "₾29",
      period: "/თვე",
      description: "სრულიად შესაფერისია ახალ მშობლებისთვის",
      color: "from-blue-500 to-indigo-600",
      isPopular: false,
      features: [
        "AI ჩატი მხარდაჭერა (5 შეკითხვა/დღეში)",
        "ძირითადი განვითარების მონიტორინგი",
        "ყოველდღიური რჩევები",
        "ელ.ფოსტის მხარდაჭერა",
        "ძირითადი პროგრესის ანგარიში"
      ],
      icon: Heart
    },
    {
      title: "პრემიუმი",
      price: "₾59",
      period: "/თვე",
      description: "ყველაზე პოპულარული არჩევანი მზარდი ოჯახებისთვის",
      color: "from-indigo-500 to-purple-600",
      isPopular: true,
      features: [
        "შეუზღუდავი AI ჩატი მხარდაჭერა",
        "განვითარების დეტალური ანალიზი",
        "პერსონალური საკვების გეგმა",
        "პრიორიტეტული მხარდაჭერა",
        "დეტალური პროგრესის ანგარიში",
        "მაილსტოუნების აღნიშვნა",
        "ოჯახის დაფა"
      ],
      icon: Sparkles
    },
    {
      title: "ოჯახური",
      price: "₾99",
      period: "/თვე",
      description: "სრული გადაწყვეტა მრავალ ბავშვზე",
      color: "from-purple-500 to-pink-600",
      isPopular: false,
      features: [
        "ყველაფერი პრემიუმში",
        "მაქსიმუმ 5 ბავშვის პროფილი",
        "ოჯახური ანალიტიკის დაფა",
        "24/7 პრიორიტეტული მხარდაჭერა",
        "საბავშვო განვითარების პერსონალური გეგმა",
        "ჯანდაცვის ორგანიზაციებთან ინტეგრაცია",
        "განვითარების მოწინავე AI რჩევები"
      ],
      icon: Users
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Static backgrounds instead of animated ones */}
      <div className="absolute inset-0">
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-purple-500/20 to-pink-500/20"
        />
        <StaticBackground />
      </div>

      {/* Floating Particles - reduced number for performance */}
      {mounted && (
        <div className="absolute inset-0 z-10">
          {floatingParticles.map((particle, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10"
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

      {/* Glowing background elements */}
      <div className="absolute top-[10%] right-[10%] w-80 h-80 bg-indigo-500 rounded-full filter blur-[120px] opacity-20"></div>
      <div className="absolute bottom-[20%] left-[5%] w-96 h-96 bg-purple-500 rounded-full filter blur-[120px] opacity-15"></div>
      <div className="absolute top-[40%] left-[20%] w-64 h-64 bg-blue-500 rounded-full filter blur-[100px] opacity-20"></div>

      {/* Content container */}
      <section 
        ref={containerRef}
        className="relative z-30 py-20 px-4 md:px-8 lg:px-16"
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              აირჩიე პაკეტი, რომელიც შენს ოჯახს ზრდის
            </h2>
            <p className="text-lg md:text-xl text-indigo-200 mb-6">
              მიიღე სანდო მხარდაჭერა, ემოციური სიმშვიდე და პროგრესის ნათელი გზა
            </p>
            
            {/* Static brand logo */}
            <div className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-indigo-400 rounded-full mr-1"></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full mr-1"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              </div>
              <span className="font-bold text-white">Parentlytics</span>
              <span className="text-indigo-300">1,200+ ქართული ოჯახი</span>
            </div>
          </div>

          {/* Plan cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div
                key={idx}
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
                onMouseEnter={() => setHoveredPlan(plan.title)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-white/5"></div>

                {/* Static circle in card */}
                <div 
                  className="absolute w-40 h-40 rounded-full bg-white/5 backdrop-blur-sm"
                  style={{
                    top: floatingCircles[idx]?.top || "50%",
                    left: floatingCircles[idx]?.left || "50%",
                  }}
                ></div>
                
                {plan.isPopular && (
                  <div className="mb-3 inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-sm px-4 py-1.5 rounded-full shadow-lg">
                    ყველაზე მოთხოვნადი
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-slate-800 mb-2 relative z-10">
                  {plan.title}
                </h3>
                
                <p className="text-slate-600 text-base mb-6 relative z-10">
                  {plan.description}
                </p>
                
                <div className="text-4xl font-extrabold text-slate-900 mb-6 relative z-10">
                  {plan.price}
                  <span className="text-base font-medium text-slate-600">{plan.period}</span>
                </div>
                
                <ul className="space-y-3 text-left mb-8 relative z-10">
                  {plan.features.map((feature, i) => (
                    <li 
                      key={i} 
                      className="flex items-start gap-2 text-slate-600"
                    >
                      <Check className="text-sky-600 mt-1 flex-shrink-0" size={20} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`w-full py-3 px-6 rounded-xl font-bold text-lg transition-colors duration-300 relative z-10
                    ${plan.isPopular
                      ? "bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg"
                      : "bg-sky-600 text-white shadow"}
                  `}
                >
                  დარეგისტრირდი და მიიღე 7 დღიანი უფასო ტრიალი
                </button>
              </div>
            ))}
          </div>

          <p className="text-sm text-indigo-200 mt-10 max-w-2xl mx-auto bg-white/10 backdrop-blur-sm p-4 rounded-xl">
            ნებისმიერ დროს შეგიძლია გააუქმო გამოწერა. არანაირი დამალული გადასახადი — 
            <span className="font-semibold text-white"> Parentlytics </span> 
            აქ არის, რომ შენს ოჯახს დაეხმაროს.
          </p>
          
          {/* Static call to action */}
          <div className="mt-16">
            <div className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl shadow-xl font-bold text-lg">
              დარეგისტრირდი და მიიღე 7 დღიანი უფასო ტრიალი
            </div>
          </div>
        </div>
      </section>

      {/* Static floating elements */}
      <div className="absolute bottom-10 left-10 w-20 h-20 z-20">
        <div className="w-full h-full bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full"></div>
      </div>
    </div>
  );
}