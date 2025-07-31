'use client';

import { Button } from "./ui/button";
import { ArrowRight, Sparkles, Brain, Heart, TrendingUp, MessageCircle, Target, Activity, Zap, Eye, Cpu, Network } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 min-h-screen flex items-center">
      {/* Advanced 3D Scene Container */}
      <div className="absolute inset-0" style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}>
        
        {/* Volumetric Background Layers */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-sky-200/20 via-transparent to-transparent animate-pulse-slow"></div>
          <div className="absolute top-1/3 right-0 w-2/3 h-2/3 bg-gradient-conic from-blue-200/30 via-indigo-200/20 to-sky-200/30 rounded-full blur-3xl animate-spin-slow"></div>
          <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-indigo-300/20 via-blue-200/15 to-transparent rounded-full blur-2xl animate-pulse-slow delay-1000"></div>
        </div>

        {/* Neural Network Connections */}
        <svg className="absolute inset-0 w-full h-full opacity-30" style={{ filter: 'blur(0.5px)' }}>
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(56, 189, 248)" stopOpacity="0.8" />
              <stop offset="50%" stopColor="rgb(99, 102, 241)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.4" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Animated Neural Pathways */}
          <motion.path
            d="M100,200 Q300,100 500,300 T900,200"
            stroke="url(#connectionGradient)"
            strokeWidth="2"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
          />
          <motion.path
            d="M200,400 Q400,200 600,500 T1000,400"
            stroke="url(#connectionGradient)"
            strokeWidth="1.5"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, delay: 1.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M50,600 Q250,400 450,700 T800,600"
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, delay: 2, ease: "easeInOut" }}
          />

          {/* Neural Nodes */}
          {[...Array(12)].map((_, i) => (
            <motion.circle
              key={i}
              cx={100 + i * 80 + Math.random() * 200}
              cy={150 + Math.sin(i) * 200 + Math.random() * 300}
              r="4"
              fill="url(#connectionGradient)"
              filter="url(#glow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.8 }}
              transition={{ 
                duration: 0.5, 
                delay: 2.5 + i * 0.1,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 2
              }}
            />
          ))}
        </svg>

        {/* Advanced 3D Holographic Elements */}
        
        {/* Central Brain-like Structure */}
        <div 
          className="absolute top-1/4 right-1/6 w-48 h-48"
          style={{ 
            transformStyle: 'preserve-3d',
            animation: 'brainPulse 4s ease-in-out infinite, rotate3d 25s linear infinite'
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400/30 to-blue-500/30 backdrop-blur-md border border-sky-300/50 shadow-2xl shadow-sky-500/20"
               style={{ transform: 'rotateX(0deg) rotateY(0deg) translateZ(24px)' }}>
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-400/40 to-indigo-500/40 backdrop-blur-sm">
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-indigo-400/50 to-purple-500/50 backdrop-blur-sm flex items-center justify-center">
                <Brain className="w-16 h-16 text-white/80 animate-pulse" />
              </div>
            </div>
          </div>
          
          {/* Orbiting Data Points */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full shadow-lg shadow-sky-500/30"
              style={{
                top: '50%',
                left: '50%',
                transformOrigin: '50% -100px',
                animation: `orbit ${8 + i * 2}s linear infinite ${i * 0.5}s`,
                transform: `translate(-50%, -50%) rotate(${i * 45}deg)`
              }}
            />
          ))}
        </div>

        {/* Holographic Data Cubes */}
        <div 
          className="absolute top-16 left-1/4 w-32 h-32"
          style={{ 
            transformStyle: 'preserve-3d',
            animation: 'float 6s ease-in-out infinite, rotate3d 20s linear infinite'
          }}
        >
          {/* Multi-layered cube with internal glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-300/40 to-blue-400/40 backdrop-blur-md border border-sky-300/60 shadow-2xl shadow-sky-500/25"
               style={{ transform: 'rotateY(0deg) translateZ(64px)' }}>
            <div className="absolute inset-2 bg-gradient-to-br from-blue-400/30 to-indigo-500/30 backdrop-blur-sm border border-blue-400/40">
              <div className="w-full h-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white/70" />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-300/40 to-indigo-400/40 backdrop-blur-md border border-blue-300/60"
               style={{ transform: 'rotateY(90deg) translateZ(64px)' }}>
            <div className="absolute inset-2 bg-gradient-to-br from-indigo-400/30 to-purple-500/30 backdrop-blur-sm border border-indigo-400/40"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-300/40 to-purple-400/40 backdrop-blur-md border border-indigo-300/60"
               style={{ transform: 'rotateY(180deg) translateZ(64px)' }}>
            <div className="absolute inset-2 bg-gradient-to-br from-purple-400/30 to-pink-500/30 backdrop-blur-sm border border-purple-400/40"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-300/40 to-sky-400/40 backdrop-blur-md border border-purple-300/60"
               style={{ transform: 'rotateY(-90deg) translateZ(64px)' }}>
            <div className="absolute inset-2 bg-gradient-to-br from-sky-400/30 to-blue-500/30 backdrop-blur-sm border border-sky-400/40"></div>
          </div>
        </div>

        {/* Morphing Geometric Shape */}
        <div 
          className="absolute bottom-1/4 right-1/4 w-40 h-40"
          style={{ 
            transformStyle: 'preserve-3d',
            animation: 'morphFloat 8s ease-in-out infinite, rotate3d 15s linear infinite reverse'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sky-400/50 to-blue-500/50 backdrop-blur-md border border-sky-400/60 shadow-2xl shadow-blue-500/30"
               style={{ 
                 clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                 animation: 'morphShape 6s ease-in-out infinite'
               }}>
            <div className="absolute inset-4 bg-gradient-to-br from-blue-500/40 to-indigo-600/40 backdrop-blur-sm"
                 style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
              <div className="w-full h-full flex items-center justify-center pt-8">
                <Network className="w-12 h-12 text-white/80" />
              </div>
            </div>
          </div>
        </div>

        {/* Holographic UI Panels */}
        
        {/* Advanced AI Dashboard */}
        {/* REMOVED: Neural Analysis card */}

        {/* Milestone Achievement Hologram */}
        {/* REMOVED: New Milestone card */}

        {/* AI Insight Stream */}
        {/* REMOVED: AI Insights card */}

        {/* Particle System */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `particle ${4 + Math.random() * 8}s ease-in-out infinite ${Math.random() * 4}s`,
              boxShadow: '0 0 4px rgba(56, 189, 248, 0.5)'
            }}
          />
        ))}

        {/* Data Stream Lines */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent"
              style={{
                left: 0,
                right: 0,
                top: `${20 + i * 15}%`,
                animation: `dataStream ${3 + i * 0.5}s ease-in-out infinite ${i * 0.8}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content with Enhanced Typography */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full px-8 py-4 mb-12 shadow-2xl shadow-sky-500/20"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-slate-700 font-medium">AI-Powered Parental Development Platform</span>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          </motion.div>

          {/* Hero Title with Advanced Typography */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-6xl lg:text-8xl text-slate-800 mb-12 leading-[0.9] tracking-tight"
            style={{ 
              textShadow: '0 4px 20px rgba(56, 189, 248, 0.1)',
              fontVariationSettings: '"wght" 600'
            }}
          >
            Your child's{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                neural growth
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 1.5 }}
              />
            </span>
            {" "}decoded
          </motion.h1>

          {/* Enhanced Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mb-16"
          >
            <p className="text-2xl lg:text-3xl text-slate-600 leading-relaxed max-w-4xl mx-auto mb-6">
              Advanced AI analyzes emotional, cognitive, and physical development patterns 
              in real-time, transforming invisible growth into actionable parental insights.
            </p>
            <div className="flex items-center justify-center space-x-6 text-slate-500">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-emerald-500" />
                <span>Real-time Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span>Instant Insights</span>
              </div>
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-500" />
                <span>Neural Learning</span>
              </div>
            </div>
          </motion.div>

          {/* Premium CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-8 mb-20"
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-white border-0 hover:from-sky-500 hover:via-blue-600 hover:to-indigo-600 px-12 py-5 text-xl rounded-2xl shadow-2xl shadow-sky-500/30 group transform hover:scale-105 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10 flex items-center">
                Initialize Neural Scan
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-sky-200/50 text-slate-700 hover:bg-white/50 px-12 py-5 text-xl rounded-2xl backdrop-blur-xl bg-white/20 hover:bg-white/40 transition-all duration-500 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/10"
            >
              <span className="flex items-center">
                <Eye className="mr-3 w-5 h-5" />
                View Demo Simulation
              </span>
            </Button>
          </motion.div>

          {/* Enhanced Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            {[
              { icon: Brain, label: "Neural AI Engine", color: "from-sky-400 to-blue-500" },
              { icon: Heart, label: "Empathetic Analysis", color: "from-blue-400 to-indigo-500" },
              { icon: Sparkles, label: "Predictive Insights", color: "from-indigo-400 to-purple-500" },
              { icon: Target, label: "Precision Tracking", color: "from-purple-400 to-pink-500" }
            ].map((feature, index) => (
              <motion.div
                key={feature.label}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center space-x-3 bg-white/20 backdrop-blur-xl rounded-full px-6 py-3 border border-white/30 shadow-lg shadow-sky-500/10 cursor-pointer"
              >
                <div className={`w-8 h-8 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center`}>
                  <feature.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-700 font-medium">{feature.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Advanced Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(5deg); }
        }
        
        @keyframes brainPulse {
          0%, 100% { transform: scale(1) rotate(0deg); filter: brightness(1); }
          50% { transform: scale(1.05) rotate(2deg); filter: brightness(1.1); }
        }
        
        @keyframes rotate3d {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }
        
        @keyframes morphFloat {
          0%, 100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
          33% { transform: translateY(-15px) rotateX(10deg) rotateY(120deg); }
          66% { transform: translateY(-30px) rotateX(-10deg) rotateY(240deg); }
        }
        
        @keyframes morphShape {
          0%, 100% { clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); }
          33% { clip-path: polygon(20% 0%, 80% 0%, 100% 60%, 80% 100%, 20% 100%, 0% 60%); }
          66% { clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%); }
        }
        
        @keyframes hologramFloat {
          0%, 100% { transform: perspective(1000px) rotateX(-5deg) rotateY(10deg) translateY(0px); }
          50% { transform: perspective(1000px) rotateX(-8deg) rotateY(12deg) translateY(-20px); }
        }
        
        @keyframes streamFloat {
          0%, 100% { transform: perspective(1000px) rotateY(5deg) translateY(0px) translateX(0px); }
          50% { transform: perspective(1000px) rotateY(8deg) translateY(-15px) translateX(-5px); }
        }
        
        @keyframes orbit {
          0% { transform: translate(-50%, -50%) rotate(0deg) translateY(-100px) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg) translateY(-100px) rotate(-360deg); }
        }
        
        @keyframes particle {
          0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-40px) scale(1.3) rotate(180deg); opacity: 1; }
        }
        
        @keyframes dataStream {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}