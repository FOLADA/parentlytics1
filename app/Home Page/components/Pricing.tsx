'use client';

import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Check, Star, Sparkles, Zap, DollarSign } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Button } from "./ui/button";
import { useRef } from "react";

export function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      icon: Sparkles,
      gradient: "from-gray-400 to-gray-500",
      bgGradient: "from-gray-50 to-gray-100",
      borderColor: "border-gray-200",
      features: [
        "Basic AI chat (20 questions/month)",
        "Essential milestone tracking",
        "Mobile app access",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "$19",
      period: "month",
      icon: Zap,
      gradient: "from-sky-400 to-blue-500",
      bgGradient: "from-sky-50 to-blue-50",
      borderColor: "border-sky-200",
      features: [
        "Unlimited AI chat",
        "Advanced development tracking",
        "Personalized insights",
        "Priority support",
        "Custom milestone creation",
        "Progress reports"
      ],
      popular: true
    },
    {
      name: "Family",
      price: "$39",
      period: "month",
      icon: Star,
      gradient: "from-purple-400 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
      features: [
        "Everything in Pro",
        "Up to 5 children",
        "Family analytics dashboard",
        "Expert consultation access",
        "Advanced reporting tools",
        "API access"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-sky-50 to-blue-50 relative overflow-hidden" ref={ref}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Money/Coin Animations */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-sky-300/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          >
            <DollarSign className="w-6 h-6" />
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
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Start free and upgrade as your family grows. No hidden fees, no surprises.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
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
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className="group perspective-1000"
              >
                <Card className={`h-full bg-gradient-to-br ${plan.bgGradient} border ${plan.borderColor} hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-500 transform-gpu relative overflow-hidden ${plan.popular ? 'ring-2 ring-sky-500/50' : ''}`}>
                  {/* Popular Badge */}
                  {plan.popular && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: 0.3 + index * 0.2,
                        type: "spring",
                        stiffness: 200
                      }}
                      viewport={{ once: true }}
                      className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20"
                    >
                      <Badge className="bg-gradient-to-r from-sky-400 to-blue-500 text-white border-0 px-4 py-1">
                        Most Popular
                      </Badge>
                    </motion.div>
                  )}

                  <CardContent className="p-8 relative">
                    {/* Background Animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-sky-100/30 to-blue-100/30 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />

                    {/* Header */}
                    <div className="text-center mb-8 relative z-10">
                      <motion.div 
                        className={`w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ 
                          rotate: 360,
                          boxShadow: "0 10px 25px rgba(56, 189, 248, 0.3)"
                        }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 200,
                          duration: 0.8
                        }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">{plan.name}</h3>
                      
                      <div className="flex items-baseline justify-center space-x-1 mb-4">
                        <span className="text-4xl font-bold text-slate-800">{plan.price}</span>
                        <span className="text-slate-600">/{plan.period}</span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-4 mb-8 relative z-10">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.div
                          key={feature}
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: 0.4 + index * 0.2 + featureIndex * 0.1,
                            duration: 0.5
                          }}
                          viewport={{ once: true }}
                        >
                          <motion.div
                            className="w-5 h-5 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center"
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Check className="w-3 h-3 text-white" />
                          </motion.div>
                          <span className="text-slate-600">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: 0.6 + index * 0.2,
                        duration: 0.5
                      }}
                      viewport={{ once: true }}
                      className="relative z-10"
                    >
                      <Button 
                        className={`w-full bg-gradient-to-r ${plan.gradient} text-white border-0 hover:shadow-xl hover:shadow-sky-500/25 transition-all duration-300 group relative overflow-hidden`}
                        size="lg"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={false}
                        />
                        <span className="relative z-10">
                          {plan.name === "Free" ? "Get Started" : "Choose Plan"}
                        </span>
                      </Button>
                    </motion.div>

                    {/* Bottom Border Animation */}
                    <motion.div
                      className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${plan.gradient} opacity-0 group-hover:opacity-100`}
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ 
                        duration: 1, 
                        delay: 0.3 + index * 0.2,
                        ease: "easeOut"
                      }}
                      viewport={{ once: true }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
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
              <Star className="w-16 h-16 mx-auto mb-6 text-sky-500" />
            </motion.div>

            <h3 className="text-3xl text-slate-800 mb-4 relative z-10">Still have questions?</h3>
            <p className="text-slate-600 mb-8 text-lg relative z-10">
              Our team is here to help you choose the right plan for your family's needs
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
                Contact Sales
                <Sparkles className="ml-3 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}