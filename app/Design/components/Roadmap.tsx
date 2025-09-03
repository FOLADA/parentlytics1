import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle, Circle, Clock, Code, Rocket, Users, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Roadmap() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const timelineProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 100]);

  const phases = [
    {
      phase: "V1 - MVP",
      status: "current",
      title: "Core Dashboard & AI Chat",
      description: "Sign up, create child profile, get instant insights and 24/7 AI chatbot access",
      features: [
        "Parent-AI Chat with child psychology training",
        "Basic development insights",
        "Child profile creation",
        "Simple milestone tracking"
      ],
      icon: Rocket,
      color: "from-emerald-400 to-green-500",
      delay: 0
    },
    {
      phase: "Phase 2",
      status: "next",
      title: "Advanced Tracking & Automation",
      description: "Full tracking capabilities, timeline visualization, and intelligent tip engine",
      features: [
        "Comprehensive development tracking",
        "Visual timeline and progress reports",
        "Smart daily tip engine",
        "Milestone celebration system"
      ],
      icon: Code,
      color: "from-sky-400 to-blue-500",
      delay: 0.2
    },
    {
      phase: "Phase 3",
      status: "future",
      title: "Community & Professional Integration",
      description: "Anonymous community features, mobile app, and API for healthcare professionals",
      features: [
        "Anonymous parent community",
        "Mobile application",
        "Pediatrician/teacher API integration",
        "Advanced analytics and reports"
      ],
      icon: Users,
      color: "from-indigo-400 to-purple-500",
      delay: 0.4
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "current":
        return <CheckCircle className="w-6 h-6 text-emerald-500" />;
      case "next":
        return <Clock className="w-6 h-6 text-sky-500" />;
      case "future":
        return <Circle className="w-6 h-6 text-slate-400" />;
      default:
        return <Circle className="w-6 h-6 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "current":
        return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Live Now</Badge>;
      case "next":
        return <Badge className="bg-sky-100 text-sky-700 border-sky-200">Coming Soon</Badge>;
      case "future":
        return <Badge className="bg-slate-100 text-slate-700 border-slate-200">Planned</Badge>;
      default:
        return null;
    }
  };

  return (
    <section id="roadmap" className="py-20 bg-gradient-to-br from-sky-50 to-blue-50 relative overflow-hidden" ref={containerRef}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Code-like Background Pattern */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 opacity-5"
        >
          <div className="absolute inset-0 text-xs text-slate-400 font-mono leading-6 overflow-hidden whitespace-pre">
            {Array.from({ length: 50 }, (_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: [0, 1, 0], x: [0, 100] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "linear"
                }}
                className="absolute"
                style={{ 
                  top: `${i * 20}px`,
                  left: `${Math.random() * 100}%`
                }}
              >
                {'<parent>child.develop()</parent>'}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating Dev Icons */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 text-sky-300/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          >
            {i % 3 === 0 ? <Code className="w-full h-full" /> : 
             i % 3 === 1 ? <Rocket className="w-full h-full" /> : 
             <Users className="w-full h-full" />}
          </motion.div>
        ))}

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-sky-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-blue-300/20 rounded-full blur-2xl"
          animate={{
            scale: [1.1, 0.9, 1.1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
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
          <h2 className="text-3xl lg:text-4xl text-slate-800 mb-4">
            Our development roadmap
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We're building Parentlytics in phases, focusing on the most impactful features first
          </p>
        </motion.div>

        {/* Animated Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-300 transform md:-translate-x-1/2"></div>
          
          {/* Animated Progress Line */}
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 w-px bg-gradient-to-b from-emerald-500 via-sky-500 to-purple-500 transform md:-translate-x-1/2 z-10"
            style={{
              height: `${timelineProgress.get()}%`
            }}
            initial={{ height: 0 }}
            animate={{ height: "40%" }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          <div className="space-y-16">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={phase.phase}
                  initial={{ 
                    opacity: 0, 
                    x: isLeft ? -100 : 100,
                    rotateY: isLeft ? -15 : 15
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    rotateY: 0
                  }}
                  whileHover={{
                    scale: 1.02,
                    y: -5
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: phase.delay,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} group`}
                >
                  {/* Timeline Node */}
                  <motion.div
                    className="absolute left-8 md:left-1/2 w-4 h-4 bg-white border-4 border-slate-300 rounded-full transform md:-translate-x-1/2 z-20"
                    whileHover={{ scale: 1.5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {phase.status === 'current' && (
                      <motion.div
                        className="absolute inset-0 bg-emerald-500 rounded-full animate-pulse"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${!isLeft ? 'md:mr-16' : ''}`}>
                    <Card className="bg-white/70 backdrop-blur-sm border-sky-200/50 hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-500 overflow-hidden group-hover:border-sky-300/50">
                      <CardContent className="p-8 relative">
                        {/* Background Animation */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-sky-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.3 }}
                        />

                        <div className="flex items-start space-x-6 relative z-10">
                          {/* Animated Icon */}
                          <motion.div
                            className={`w-16 h-16 bg-gradient-to-r ${phase.color} rounded-2xl flex items-center justify-center relative`}
                            whileHover={{ 
                              scale: 1.1,
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
                              className={`absolute inset-0 bg-gradient-to-r ${phase.color} rounded-2xl opacity-30`}
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ 
                                duration: 3, 
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          </motion.div>

                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-4">
                              <h3 className="text-slate-800">{phase.phase}</h3>
                              <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ 
                                  delay: 0.3 + phase.delay,
                                  type: "spring",
                                  stiffness: 200
                                }}
                              >
                                {getStatusBadge(phase.status)}
                              </motion.div>
                            </div>

                            <h4 className="text-xl text-slate-800 mb-3">{phase.title}</h4>
                            <p className="text-slate-600 mb-6 leading-relaxed">{phase.description}</p>

                            {/* Animated Features List */}
                            <div className="space-y-3">
                              {phase.features.map((feature, featureIndex) => (
                                <motion.div
                                  key={featureIndex}
                                  className="flex items-start space-x-3"
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ 
                                    delay: 0.5 + phase.delay + featureIndex * 0.1,
                                    duration: 0.5
                                  }}
                                  viewport={{ once: true }}
                                >
                                  <motion.div
                                    className="w-2 h-2 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full flex-shrink-0 mt-2"
                                    whileHover={{ scale: 1.5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                  />
                                  <span className="text-slate-600">{feature}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Status Icon */}
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{ 
                              delay: 0.2 + phase.delay,
                              type: "spring",
                              stiffness: 200
                            }}
                            viewport={{ once: true }}
                          >
                            {getStatusIcon(phase.status)}
                          </motion.div>
                        </div>

                        {/* Progress Bar */}
                        <motion.div
                          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${phase.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ 
                            width: phase.status === 'current' ? '100%' : 
                                   phase.status === 'next' ? '60%' : '20%'
                          }}
                          transition={{ 
                            duration: 1.5, 
                            delay: 0.5 + phase.delay,
                            ease: "easeOut"
                          }}
                          viewport={{ once: true }}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.8,
            type: "spring",
            stiffness: 100
          }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-white/70 backdrop-blur-md border border-sky-200/50 rounded-3xl p-12 max-w-3xl mx-auto relative overflow-hidden group">
            {/* Background Animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-sky-100/30 to-blue-100/30 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.5 }}
            />

            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ 
                delay: 1,
                type: "spring",
                stiffness: 200
              }}
              className="relative z-10"
            >
              <Rocket className="w-16 h-16 mx-auto mb-6 text-sky-500" />
            </motion.div>

            <h3 className="text-3xl text-slate-800 mb-4 relative z-10">Join us on this journey</h3>
            <p className="text-slate-600 mb-8 text-lg relative z-10">
              Start with our MVP today and help shape the future of AI-powered parenting support
            </p>
            
            <motion.button
              className="bg-gradient-to-r from-sky-400 to-blue-500 text-white px-12 py-4 rounded-2xl hover:from-sky-500 hover:to-blue-600 transition-all duration-300 shadow-2xl shadow-sky-500/25 group relative z-10 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              <span className="flex items-center relative z-10">
                Get Early Access
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}