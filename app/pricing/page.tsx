"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

const plans = [
  {
    title: "უფასო პაკეტი",
    price: "₾0",
    description: "შეისწავლეთ მშობლობის ახალი სტანდარტი — მიიღეთ პირველი ნაბიჯები მშვიდად და თავდაჯერებულად.",
    features: [
      "7-დღიანი მშობლობის განვითარების ტრეკერი",
      "3 AI-გენერირებული რჩევა კვირაში",
      "საბაზისო პროგრესის მონიტორინგი (1 ბავშვი)",
      "კვირის შეჯამება",
      "1 თვის ისტორიული მონაცემები",
    ],
    cta: "დაიწყე უფასოდ",
    isPopular: false,
    color: "from-blue-50 to-blue-100"
  },
  {
    title: "სტარტერი",
    price: "₾19",
    description: "მიიღეთ ყოველდღიური მხარდაჭერა და სტრუქტურა — მშობლებისთვის, რომლებსაც სურთ მეტი სიმშვიდე და პროგრესი.",
    features: [
      "30-დღიანი განვითარების ტრეკერი",
      "AI-გენერირებული რჩევები ყოველდღე",
      "გაფართოებული მონიტორინგი (3 ბავშვი)",
      "მყისიერი ანგარიშები და ანალიზი",
      "სრული ისტორია",
      "პრიორიტეტული ელფოსტით მხარდაჭერა",
    ],
    cta: "აირჩიე სტარტერი",
    isPopular: true,
    color: "from-indigo-50 to-indigo-100"
  },
  {
    title: "ექსპერტი",
    price: "₾49",
    description: "მშობლებისთვის, რომლებიც მომავალზე ზრუნავენ — მიიღეთ ღრმა ანალიზი და პერსონალიზაცია.",
    features: [
      "90-დღიანი სიღრმისეული მონიტორინგი",
      "პერსონალიზებული რჩევები ყოველდღე",
      "შეუზღუდავი ბავშვების პროფილები",
      "AI-ჩატი მშობლებისთვის",
      "ექსპერტის ანალიზი და რეკომენდაციები",
      "ახალი ფუნქციებზე ადრეული წვდომა",
      "პირადი წარმატების მენეჯერი",
    ],
    cta: "გახდი ექსპერტი მშობელი",
    isPopular: false,
    color: "from-purple-50 to-purple-100"
  },
];

// 3D Floating Shapes Component
const FloatingShapes = () => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.2;
      ref.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group>
      <Sphere ref={ref} args={[1.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#a78bfa" 
          roughness={0.1} 
          metalness={0.8} 
          transparent 
          opacity={0.7} 
        />
      </Sphere>
    </group>
  );
};

export default function PricingSection() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-900">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <FloatingShapes />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          <EffectComposer>
            <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} />
          </EffectComposer>
        </Canvas>
      </div>
      
      {/* Floating Particles */}
      {mounted && (
        <div className="absolute inset-0 z-10">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.7, 0],
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: 4 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                width: `${Math.random() * 10 + 2}px`,
                height: `${Math.random() * 10 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
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
                  bg-gradient-to-b ${plan.color} backdrop-blur-sm
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
                
                {/* Floating Circle */}
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
                    top: `${Math.random() * 60 + 20}%`,
                    left: `${Math.random() * 60 + 20}%`,
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
                  className="text-2xl font-bold text-gray-800 mb-2 relative z-10"
                  whileHover={{ scale: 1.02 }}
                >
                  {plan.title}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-700 text-base mb-6 relative z-10"
                  whileHover={{ x: 5 }}
                >
                  {plan.description}
                </motion.p>
                
                <motion.div 
                  className="text-4xl font-extrabold text-gray-900 mb-6 relative z-10"
                  whileHover={{ scale: 1.05 }}
                >
                  {plan.price}
                  <span className="text-base font-medium text-gray-600">/თვე</span>
                </motion.div>
                
                <ul className="space-y-3 text-left mb-8 relative z-10">
                  {plan.features.map((feature, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start gap-2 text-gray-700"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * i }}
                      whileHover={{ x: 5 }}
                    >
                      <CheckCircle2 className="text-indigo-600 mt-1 flex-shrink-0" size={20} />
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
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                      : "bg-white text-indigo-700 shadow"}
                  `}
                >
                  {plan.cta}
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
      
      {/* Floating 3D Shapes */}
      <div className="absolute bottom-10 left-10 w-20 h-20 z-20">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Sphere args={[1, 32, 32]}>
            <meshStandardMaterial 
              color="#a78bfa" 
              roughness={0.1} 
              metalness={0.8} 
              transparent 
              opacity={0.7} 
            />
          </Sphere>
          <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={false} />
        </Canvas>
      </div>
    </div>
  );
}