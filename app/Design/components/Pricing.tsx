import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check, Star, Sparkles, DollarSign, TrendingUp, Zap } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export function Pricing() {
  const containerRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with basic parenting insights",
      features: [
        "Basic AI chat (20 questions/month)",
        "Simple development dashboard",
        "Core milestone tracking",
        "Weekly progress summaries",
        "Community access"
      ],
      cta: "Start Free",
      popular: false,
      color: "from-slate-400 to-slate-500",
      savings: null
    },
    {
      name: "Pro",
      price: "$12",
      period: "per month",
      description: "Everything you need for comprehensive child development tracking",
      features: [
        "Unlimited AI chat & insights",
        "Advanced development tracking",
        "Expert-approved growth plans",
        "Daily personalized tips",
        "Detailed progress reports",
        "Priority community support",
        "Milestone celebration system",
        "Export reports for pediatricians"
      ],
      cta: "Start 14-day Free Trial",
      popular: true,
      color: "from-sky-400 to-blue-500",
      savings: "Save 20% annually"
    },
    {
      name: "Family",
      price: "$20",
      period: "per month",
      description: "For families with multiple children or professional needs",
      features: [
        "Everything in Pro",
        "Multiple child profiles",
        "Family progress comparisons",
        "Shared access for partners",
        "Professional consultation booking",
        "Advanced analytics dashboard",
        "Priority customer support",
        "Early access to new features"
      ],
      cta: "Contact Sales",
      popular: false,
      color: "from-indigo-400 to-purple-500",
      savings: "Best value for families"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white relative overflow-hidden" ref={containerRef}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Money/Coin Floating Animation */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 text-yellow-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          >
            <DollarSign className="w-full h-full" />
          </motion.div>
        ))}

        {/* Gradient Waves */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 opacity-5"
        >
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <motion.path
              d="M0,400 Q300,200 600,400 T1200,400 V800 H0 Z"
              fill="url(#pricingGradient1)"
              animate={{ d: [
                "M0,400 Q300,200 600,400 T1200,400 V800 H0 Z",
                "M0,450 Q300,250 600,450 T1200,350 V800 H0 Z",
                "M0,400 Q300,200 600,400 T1200,400 V800 H0 Z"
              ]}}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d="M0,500 Q300,300 600,500 T1200,500 V800 H0 Z"
              fill="url(#pricingGradient2)"
              animate={{ d: [
                "M0,500 Q300,300 600,500 T1200,500 V800 H0 Z",
                "M0,450 Q300,350 600,450 T1200,550 V800 H0 Z",
                "M0,500 Q300,300 600,500 T1200,500 V800 H0 Z"
              ]}}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <defs>
              <linearGradient id="pricingGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(56, 189, 248)" stopOpacity="0.1" />
                <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="pricingGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.1" />
                <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.05" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Statistics Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`stat-${i}`}
            className="absolute w-6 h-6 text-blue-400/20"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          >
            <TrendingUp className="w-full h-full" />
          </motion.div>
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
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
          >
            <DollarSign className="w-16 h-16 mx-auto mb-6 text-sky-500" />
          </motion.div>
          
          <h2 className="text-3xl lg:text-4xl text-slate-800 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Start free, upgrade when you're ready. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ 
                opacity: 0, 
                y: 50,
                rotateY: -15,
                scale: 0.9
              }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                rotateY: 0,
                scale: plan.popular ? 1.05 : 1
              }}
              whileHover={{
                y: -10,
                rotateX: 5,
                rotateY: 2,
                scale: plan.popular ? 1.08 : 1.03
              }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              className="relative group perspective-1000"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 0.5 + index * 0.2,
                    type: "spring",
                    stiffness: 200
                  }}
                  viewport={{ once: true }}
                >
                  <Badge className="bg-gradient-to-r from-sky-400 to-blue-500 text-white border-0 px-6 py-2 shadow-lg shadow-sky-500/25">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Star className="w-4 h-4 mr-2" />
                    </motion.div>
                    Most Popular
                  </Badge>
                </motion.div>
              )}

              <Card 
                className={`h-full transform-gpu transition-all duration-500 relative overflow-hidden ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200 shadow-2xl shadow-sky-500/20' 
                    : 'bg-white border-slate-200 hover:shadow-xl hover:shadow-slate-500/10'
                } ${hoveredCard === index ? 'border-sky-300' : ''}`}
              >
                {/* Card Background Animation */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    plan.popular 
                      ? 'from-sky-100/50 to-blue-100/50' 
                      : 'from-slate-50/50 to-slate-100/50'
                  } opacity-0 group-hover:opacity-100`}
                  transition={{ duration: 0.3 }}
                />

                {/* Animated Sparkles for Popular Plan */}
                {plan.popular && (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-sky-400 rounded-full"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${10 + Math.random() * 80}%`,
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </>
                )}

                <CardHeader className="pb-6 relative z-10">
                  <div className="text-center">
                    {/* Plan Icon */}
                    <motion.div
                      className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
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
                      {index === 0 ? <Sparkles className="w-8 h-8 text-white" /> :
                       index === 1 ? <Zap className="w-8 h-8 text-white" /> :
                       <Star className="w-8 h-8 text-white" />}
                    </motion.div>

                    <h3 className="text-2xl text-slate-800 mb-2">{plan.name}</h3>
                    
                    {/* Animated Price */}
                    <div className="flex items-baseline justify-center mb-2">
                      <motion.span 
                        className="text-4xl text-slate-800"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ 
                          delay: 0.3 + index * 0.1,
                          type: "spring",
                          stiffness: 200
                        }}
                        viewport={{ once: true }}
                      >
                        {plan.price}
                      </motion.span>
                      <span className="text-slate-600 ml-2">/{plan.period}</span>
                    </div>

                    {/* Savings Badge */}
                    {plan.savings && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 mb-3">
                          {plan.savings}
                        </Badge>
                      </motion.div>
                    )}

                    <p className="text-slate-600">{plan.description}</p>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 relative z-10">
                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      className={`w-full mb-8 transition-all duration-300 relative overflow-hidden ${
                        plan.popular
                          ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-white border-0 hover:from-sky-500 hover:to-blue-600 shadow-lg shadow-sky-500/25'
                          : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400'
                      }`}
                      size="lg"
                    >
                      {plan.popular && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={false}
                        />
                      )}
                      <span className="relative z-10">{plan.cta}</span>
                    </Button>
                  </motion.div>

                  {/* Features List */}
                  <div className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: 0.6 + index * 0.1 + featureIndex * 0.05,
                          duration: 0.5
                        }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ 
                            delay: 0.7 + index * 0.1 + featureIndex * 0.05,
                            type: "spring",
                            stiffness: 200
                          }}
                          viewport={{ once: true }}
                        >
                          <Check className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
                        </motion.div>
                        <span className="text-slate-600">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>

                {/* Bottom Glow Effect */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${plan.color} opacity-0 group-hover:opacity-100`}
                  transition={{ duration: 0.3 }}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Revenue Streams */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.8,
            type: "spring",
            stiffness: 100
          }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-3xl p-12 max-w-4xl mx-auto relative overflow-hidden group">
            {/* Background Animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-sky-100/30 to-blue-100/30 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.5 }}
            />

            <motion.div
              className="flex items-center justify-center mb-6 relative z-10"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 1,
                type: "spring",
                stiffness: 200
              }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-8 h-8 text-sky-500 mr-3" />
              <h3 className="text-2xl text-slate-800">Curated Recommendations</h3>
            </motion.div>

            <p className="text-slate-600 mb-8 max-w-2xl mx-auto relative z-10">
              Get personalized recommendations for educational toys, books, and sleep products 
              that align with your child's development stage.
            </p>

            <motion.div 
              className="flex flex-wrap justify-center gap-4 text-sm text-slate-600 relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              viewport={{ once: true }}
            >
              {["Educational Toys", "Developmental Books", "Sleep Solutions", "Learning Tools"].map((item, index) => (
                <motion.span
                  key={item}
                  className="bg-white/60 px-4 py-2 rounded-full border border-sky-200/50 hover:bg-white/80 transition-all duration-300"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ 
                    delay: 1.3 + index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  viewport={{ once: true }}
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          transition={{ 
            duration: 0.8, 
            delay: 1,
            type: "spring",
            stiffness: 100
          }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-2xl mx-auto relative overflow-hidden group">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-green-50/50 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />

            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ 
                delay: 1.2,
                type: "spring",
                stiffness: 200
              }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            <h3 className="text-xl text-slate-800 mb-4 relative z-10">30-day money-back guarantee</h3>
            <p className="text-slate-600 relative z-10">
              Not satisfied? Get a full refund within 30 days, no questions asked. 
              We're confident Parentlytics will transform your parenting journey.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}