'use client';

import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { MessageCircle, TrendingUp, Lightbulb, Users, Clock, Target, BarChart3, Heart, Star, Quote, CheckCircle, Zap, Shield, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function Features() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Fixed positions for floating particles
  const floatingParticles = [
    { left: "64.30%", top: "38.62%", duration: 6.5, delay: 0.3 },
    { left: "45.91%", top: "11.68%", duration: 5.2, delay: 1.7 },
    { left: "64.98%", top: "34.91%", duration: 7.8, delay: 0.8 },
    { left: "61.05%", top: "18.98%", duration: 6.1, delay: 1.2 },
    { left: "34.92%", top: "34.26%", duration: 5.9, delay: 0.5 },
    { left: "26.51%", top: "7.62%", duration: 8.2, delay: 1.9 },
    { left: "51.20%", top: "25.98%", duration: 6.7, delay: 0.7 },
    { left: "96.76%", top: "98.53%", duration: 5.4, delay: 1.4 },
    { left: "45.29%", top: "60.30%", duration: 7.3, delay: 0.9 },
    { left: "23.18%", top: "50.80%", duration: 6.8, delay: 1.1 },
    { left: "13.40%", top: "5.06%", duration: 8.5, delay: 0.2 },
    { left: "77.96%", top: "95.26%", duration: 5.7, delay: 1.6 },
    { left: "68.99%", top: "79.59%", duration: 7.1, delay: 0.4 },
    { left: "36.90%", top: "0.21%", duration: 6.3, delay: 1.8 },
    { left: "44.87%", top: "75.14%", duration: 8.1, delay: 0.6 },
    { left: "27.81%", top: "2.81%", duration: 5.8, delay: 1.3 },
    { left: "47.48%", top: "42.66%", duration: 7.4, delay: 0.1 },
    { left: "20.71%", top: "62.94%", duration: 6.9, delay: 1.5 },
    { left: "12.41%", top: "80.56%", duration: 8.3, delay: 0.8 },
    { left: "28.46%", top: "51.11%", duration: 6.2, delay: 1.0 }
  ];

  // Fixed positions for matrix code rain
  const matrixLines = [
    { left: "1.31%", duration: 4.2, delay: 0.3 },
    { left: "8.95%", duration: 5.8, delay: 1.7 },
    { left: "14.83%", duration: 6.1, delay: 0.8 },
    { left: "16.91%", duration: 4.9, delay: 1.2 },
    { left: "23.19%", duration: 5.5, delay: 0.5 },
    { left: "25.13%", duration: 6.7, delay: 1.9 },
    { left: "34.49%", duration: 4.8, delay: 0.7 },
    { left: "39.30%", duration: 5.3, delay: 1.4 },
    { left: "43.93%", duration: 6.9, delay: 0.9 },
    { left: "49.60%", duration: 5.1, delay: 1.1 },
    { left: "54.73%", duration: 7.2, delay: 0.2 },
    { left: "58.24%", duration: 4.6, delay: 1.6 },
    { left: "62.68%", duration: 6.4, delay: 0.4 },
    { left: "67.12%", duration: 5.7, delay: 1.8 },
    { left: "70.89%", duration: 6.8, delay: 0.6 },
    { left: "77.97%", duration: 4.7, delay: 1.3 },
    { left: "82.46%", duration: 5.9, delay: 0.1 },
    { left: "89.55%", duration: 6.3, delay: 1.5 },
    { left: "90.43%", duration: 5.4, delay: 0.8 },
    { left: "96.86%", duration: 7.1, delay: 1.0 }
  ];

  const mainFeatures = [
    {
      icon: MessageCircle,
      title: "Parent-AI Chat",
      description: "24/7 AI chatbot trained on child psychology, pediatrics, and education. Get instant, non-judgmental answers to all your parenting questions.",
      color: "from-sky-400 to-blue-500",
      delay: 0
    },
    {
      icon: TrendingUp,
      title: "Development Tracker",
      description: "Personalized tracking of your child's emotional, mental, and physical growth. Know if they're on track with data-backed insights.",
      color: "from-blue-400 to-indigo-500",
      delay: 0.1
    },
    {
      icon: Lightbulb,
      title: "Smart Suggestions",
      description: "Get daily micro-tips and actionable advice tailored to your child's age and development stage. Every suggestion is backed by research.",
      color: "from-indigo-400 to-purple-500",
      delay: 0.2
    },
    {
      icon: Heart,
      title: "Daily Celebrations",
      description: "Celebrate wins and progress, no matter how small. Build confidence as a parent with positive reinforcement and milestone recognition.",
      color: "from-purple-400 to-pink-500",
      delay: 0.3
    }
  ];

  const aiFeatures = [
    {
      icon: Zap,
      title: "Empathetic + Expert",
      description: "GPT fine-tuned with medical and educational expertise provides compassionate, research-backed guidance",
      stat: "10,000+ research papers analyzed"
    },
    {
      icon: Shield,
      title: "Dynamic Tracking",
      description: "Real-world milestone tracking that adapts to your child's unique development journey",
      stat: "50+ developmental milestones"
    },
    {
      icon: Sparkles,
      title: "Parenting Co-pilot",
      description: "Context-aware suggestions that learn from your family's patterns and preferences",
      stat: "Personalized for every child"
    }
  ];

  const testimonials = [
    {
      quote: "Finally, I don't feel like I'm failing as a parent. The daily celebrations helped me see all the small wins I was missing.",
      author: "Sarah M.",
      role: "Mother of 3-year-old",
      rating: 5
    },
    {
      quote: "The AI chat feels like having a pediatrician and child psychologist available 24/7. It's been a game-changer for our family.",
      author: "David K.",
      role: "Father of twins",
      rating: 5
    },
    {
      quote: "I love how it makes my child's invisible progress visible. Now I can share meaningful updates with grandparents!",
      author: "Maria L.",
      role: "Single mother",
      rating: 5
    }
  ];

  const emotionalBenefits = [
    { icon: Clock, title: "Calms Anxiety", description: "\"Am I doing enough?\" - We help answer this question with data, not fear.", emoji: "😌" },
    { icon: Target, title: "Empowers Parents", description: "Transform overwhelming parenting into manageable, confident decisions.", emoji: "💪" },
    { icon: BarChart3, title: "Makes Growth Visible", description: "See the invisible progress your child makes every day.", emoji: "👀" },
    { icon: Users, title: "Feel Like Winning", description: "Finally feel like you're succeeding as a parent, one milestone at a time.", emoji: "🏆" }
  ];

  return (
    <section id="features" className="py-20 relative overflow-hidden" ref={containerRef}>
      {/* Enhanced Background with Fixed Particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
        {isClient && floatingParticles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-sky-400/40 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl text-slate-800 mb-4">
            Everything you need to support your child's growth
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Four core features that transform parenting from overwhelming to empowering
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mainFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                whileHover={{ 
                  y: -10,
                  rotateX: 5,
                  rotateY: 5,
                  scale: 1.02
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: feature.delay,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className="group perspective-1000"
              >
                <Card className="h-full bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200/50 hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-500 transform-gpu">
                  <CardContent className="p-6 relative overflow-hidden">
                    {/* Card Background Animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-sky-100/50 to-blue-100/50 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    
                    <motion.div 
                      className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 relative z-10`}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 360,
                        boxShadow: "0 10px 25px rgba(56, 189, 248, 0.3)"
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 200,
                        damping: 10
                      }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    
                    <h3 className="text-slate-800 mb-3 relative z-10">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed relative z-10">{feature.description}</p>
                    
                    {/* Hover Effect Overlay */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-blue-500 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* AI Benefits Section - Enhanced Dark Theme */}
      <div id="ai-benefits" className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 relative overflow-hidden">
        {/* Advanced Background Elements */}
        <div className="absolute inset-0">
          {/* Matrix-like Code Rain with Fixed Positions */}
          {isClient && matrixLines.map((line, i) => (
            <motion.div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-sky-400/30 to-transparent"
              style={{
                left: line.left,
                height: '100%'
              }}
              animate={{
                y: ['-100%', '100%'],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: line.duration,
                repeat: Infinity,
                delay: line.delay,
                ease: "linear"
              }}
            />
          ))}

          {/* Glowing Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.6, 0.3, 0.6]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-sky-400/20 text-sky-300 border-sky-400/30 mb-4 px-6 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                AI Technology
              </Badge>
            </motion.div>
            <h2 className="text-3xl lg:text-4xl text-white mb-4">
              Why AI is the unlock for modern parenting
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              AI doesn't replace human intuition—it enhances it with data-driven insights and expert knowledge
            </p>
          </motion.div>

          <div className="space-y-16">
            {aiFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                  <motion.div 
                    className="flex-1"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 group">
                      <div className="flex items-center space-x-6 mb-6">
                        <motion.div 
                          className="w-20 h-20 bg-gradient-to-r from-sky-400 to-blue-500 rounded-2xl flex items-center justify-center relative"
                          whileHover={{ 
                            rotate: 360,
                            scale: 1.1
                          }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 200,
                            duration: 0.6
                          }}
                        >
                          <Icon className="w-10 h-10 text-white" />
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </motion.div>
                        <div>
                          <h3 className="text-2xl text-white mb-2">{feature.title}</h3>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                            viewport={{ once: true }}
                          >
                            <Badge className="bg-sky-400/20 text-sky-300 border-sky-400/30">
                              {feature.stat}
                            </Badge>
                          </motion.div>
                        </div>
                      </div>
                      <p className="text-slate-300 text-lg leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex-1 flex justify-center"
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="w-80 h-80 bg-gradient-to-br from-sky-400/20 to-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 relative">
                      <Icon className="w-32 h-32 text-sky-300" />
                      
                      {/* Orbiting Elements */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-4 h-4 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
                          style={{
                            top: '50%',
                            left: '50%',
                            transformOrigin: '50% -150px'
                          }}
                          animate={{
                            rotate: [0, 360]
                          }}
                          transition={{
                            duration: 10 + i * 2,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          initial={{
                            transform: `translate(-50%, -50%) rotate(${i * 120}deg)`
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials Section - Enhanced */}
      <div className="bg-gradient-to-br from-sky-50 to-blue-50 py-20 relative overflow-hidden">
        {/* Background Animation */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 60%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl text-slate-800 mb-4">
              Parents love Parentlytics
            </h2>
            <p className="text-xl text-slate-600">
              Real stories from families who've transformed their parenting journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                whileHover={{ 
                  y: -10, 
                  rotateY: 5,
                  rotateX: 5,
                  scale: 1.02
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 120
                }}
                viewport={{ once: true }}
                className="group perspective-1000"
              >
                <Card className="h-full bg-white/60 backdrop-blur-sm border-sky-200/50 hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-500 transform-gpu overflow-hidden">
                  <CardContent className="p-6 relative">
                    {/* Animated Background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-sky-100/30 to-blue-100/30 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />

                    <motion.div 
                      className="flex items-center space-x-1 mb-4 relative z-10"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: 180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            delay: 0.5 + index * 0.1 + i * 0.1,
                            type: "spring",
                            stiffness: 200
                          }}
                        >
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Quote className="w-8 h-8 text-sky-500 mb-4 relative z-10" />
                    </motion.div>

                    <p className="text-slate-600 mb-6 leading-relaxed italic relative z-10">"{testimonial.quote}"</p>
                    
                    <div className="relative z-10">
                      <div className="text-slate-800">{testimonial.author}</div>
                      <div className="text-sm text-slate-500">{testimonial.role}</div>
                    </div>

                    {/* Bottom Border Animation */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-blue-500 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Emotional Benefits - Enhanced List Style */}
      <div className="bg-white py-20 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.5) 1px, transparent 0)`,
                 backgroundSize: '40px 40px'
               }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl text-slate-800 mb-4">
              Finally feel confident as a parent
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Address the emotional challenges that make parenting feel overwhelming
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {emotionalBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -50, rotateY: -10 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  whileHover={{ 
                    scale: 1.02,
                    x: 10,
                    boxShadow: "0 20px 40px rgba(56, 189, 248, 0.15)"
                  }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="flex items-center space-x-8 bg-gradient-to-r from-sky-50 to-blue-50 rounded-3xl p-8 border border-sky-200/50 hover:border-sky-300/50 transition-all duration-500 relative overflow-hidden">
                    {/* Background Gradient Animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-sky-100/50 to-blue-100/50 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />

                    <div className="flex items-center space-x-6 relative z-10">
                      <motion.div 
                        className="text-5xl"
                        whileHover={{ 
                          scale: 1.3,
                          rotate: [0, -10, 10, 0]
                        }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 300,
                          duration: 0.6
                        }}
                      >
                        {benefit.emoji}
                      </motion.div>
                      
                      <motion.div 
                        className="w-16 h-16 bg-gradient-to-r from-sky-400 to-blue-500 rounded-2xl flex items-center justify-center relative"
                        whileHover={{ 
                          scale: 1.15,
                          rotate: 360
                        }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 200,
                          duration: 0.8
                        }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                        
                        {/* Pulse Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 rounded-2xl opacity-20 group-hover:opacity-40"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.div>
                    </div>
                    
                    <div className="flex-1 relative z-10">
                      <h3 className="text-xl text-slate-800 mb-3">{benefit.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ 
                        delay: 0.5 + index * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                      className="relative z-10"
                    >
                      <CheckCircle className="w-8 h-8 text-emerald-500" />
                    </motion.div>

                    {/* Progress Bar Animation */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-sky-400 to-blue-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ 
                        duration: 1, 
                        delay: 0.3 + index * 0.1,
                        ease: "easeOut"
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}