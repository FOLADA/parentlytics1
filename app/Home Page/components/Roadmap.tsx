'use client';

import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle, Circle, Clock, Code, Rocket, Users, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function Roadmap() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const timelineProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 100]);

  // Fixed positions for floating code elements
  const floatingCodeElements = [
    { left: "43.55%", top: "0px" },
    { left: "71.10%", top: "20px" },
    { left: "77.52%", top: "40px" },
    { left: "41.05%", top: "60px" },
    { left: "86.26%", top: "80px" },
    { left: "54.66%", top: "100px" },
    { left: "1.67%", top: "120px" },
    { left: "8.29%", top: "140px" },
    { left: "27.77%", top: "160px" },
    { left: "59.43%", top: "180px" }
  ];

  // Fixed positions for floating dev icons
  const floatingDevIcons = [
    { left: "8.01%", top: "24.35%", duration: 8.2, delay: 0.3 },
    { left: "85.12%", top: "96.30%", duration: 6.5, delay: 1.7 },
    { left: "83.07%", top: "95.17%", duration: 7.8, delay: 0.8 },
    { left: "99.70%", top: "90.35%", duration: 5.4, delay: 1.2 },
    { left: "74.95%", top: "81.16%", duration: 6.9, delay: 0.5 }
  ];

  const phases = [
    {
      phase: "V1 - MVP",
      status: "current",
      title: "ძირითადი დაფა და AI ჩატი",
      description: "დარეგისტრირდით, შექმენით ბავშვის პროფილი, მიიღეთ მყისიერი ანალიტიკა და 24/7 AI ჩატბოტის წვდომა",
      features: [
        "მშობელი-AI ჩატი ბავშვის ფსიქოლოგიის ტრენინგით",
        "განვითარების ძირითადი ანალიტიკა",
        "ბავშვის პროფილის შექმნა",
        "მარტივი მიღწევების თვალთვალი"
      ],
      icon: Rocket,
      color: "from-emerald-400 to-green-500",
      delay: 0
    },
    {
      phase: "ეტაპი 2",
      status: "next",
      title: "მოწინავე თვალთვალი და ავტომატიზაცია",
      description: "სრული თვალთვალის შესაძლებლობები, დროის ღერძის ვიზუალიზაცია და ინტელექტუალური რჩევების სისტემა",
      features: [
        "განვითარების ყოვლისმომცველი თვალთვალი",
        "ვიზუალური დროის ღერძი და პროგრესის ანგარიშები",
        "ჭკვიანი ყოველდღიური რჩევების სისტემა",
        "მიღწევების აღნიშვნის სისტემა"
      ],
      icon: Code,
      color: "from-sky-400 to-blue-500",
      delay: 0.2
    },
    {
      phase: "ეტაპი 3",
      status: "future",
      title: "საზოგადოება და AI-ის გაუმჯობესება",
      description: "მშობელთა საზოგადოების ფუნქციები, მოწინავე AI ანალიტიკა და ყოვლისმომცველი ანალიზი",
      features: [
        "მშობელთა საზოგადოება და მხარდაჭერის ჯგუფები",
        "მოწინავე AI ანალიტიკა და პროგნოზები",
        "ყოვლისმომცველი ანალიტიკის დაფა",
        "ინტეგრაცია ჯანდაცვის მომწოდებლებთან"
      ],
      icon: Users,
      color: "from-purple-400 to-pink-500",
      delay: 0.4
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'current':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'next':
        return <Clock className="w-5 h-5 text-sky-500" />;
      case 'future':
        return <Circle className="w-5 h-5 text-slate-400" />;
      default:
        return <Circle className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'current':
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">მიმდინარე</Badge>;
      case 'next':
        return <Badge className="bg-sky-100 text-sky-800 border-sky-200">შემდეგი</Badge>;
      case 'future':
        return <Badge className="bg-slate-100 text-slate-800 border-slate-200">მომავალი</Badge>;
      default:
        return <Badge className="bg-slate-100 text-slate-800 border-slate-200">მომავალი</Badge>;
    }
  };

  return (
    <section id="roadmap" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden" ref={containerRef}>
      {/* Enhanced Background with Fixed Elements */}
      <div className="absolute inset-0">
        {/* Static Background Elements */}
        <div className="absolute inset-0 opacity-30">
          {/* Floating Code Elements with Fixed Positions */}
          {isClient && floatingCodeElements.map((element, i) => (
            <div
              key={i}
              className="absolute text-sm text-slate-400"
              style={{ 
                top: element.top,
                left: element.left
              }}
            >
              {'<parent>child.develop()</parent>'}
            </div>
          ))}
        </div>

        {/* Floating Dev Icons with Fixed Positions */}
        {isClient && floatingDevIcons.map((icon, i) => (
          <div
            key={i}
            className="absolute w-8 h-8 text-sky-300/30"
            style={{
              left: icon.left,
              top: icon.top,
            }}
          >
            {i % 3 === 0 ? <Code className="w-full h-full" /> : 
             i % 3 === 1 ? <Rocket className="w-full h-full" /> : 
             <Users className="w-full h-full" />}
          </div>
        ))}

        {/* Static Gradient Orbs */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-sky-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-blue-300/20 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl text-slate-800 mb-4">
            ჩვენი განვითარების გეგმა
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            ჩვენ ვქმნით Parentlytics-ს ეტაპობრივად, ყველაზე ეფექტურ ფუნქციებზე ფოკუსირებით
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-300 transform md:-translate-x-1/2"></div>
          
          {/* Progress Line */}
          <div
            className="absolute left-8 md:left-1/2 top-0 w-px bg-gradient-to-b from-emerald-500 via-sky-500 to-purple-500 transform md:-translate-x-1/2 z-10"
            style={{
              height: "40%"
            }}
          />

          <div className="space-y-16">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              const isLeft = index % 2 === 0;
              
              return (
                <div
                  key={phase.phase}
                  className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} group`}
                >
                  {/* Timeline Node */}
                  <div
                    className="absolute left-8 md:left-1/2 w-4 h-4 bg-white border-4 border-slate-300 rounded-full transform md:-translate-x-1/2 z-20"
                  >
                    {phase.status === 'current' && (
                      <div className="absolute inset-0 bg-emerald-500 rounded-full"></div>
                    )}
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${!isLeft ? 'md:mr-16' : ''}`}>
                    <Card className="bg-white/70 backdrop-blur-sm border-sky-200/50 transition-all duration-500 overflow-hidden">
                      <CardContent className="p-8 relative">
                        <div className="flex items-start space-x-6 relative z-10">
                          {/* Icon */}
                          <div
                            className={`w-16 h-16 bg-gradient-to-r ${phase.color} rounded-2xl flex items-center justify-center relative`}
                          >
                            <Icon className="w-8 h-8 text-white" />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-4">
                              <h3 className="text-slate-800">{phase.phase}</h3>
                              <div>
                                {getStatusBadge(phase.status)}
                              </div>
                            </div>

                            <h4 className="text-xl text-slate-800 mb-3">{phase.title}</h4>
                            <p className="text-slate-600 mb-6 leading-relaxed">{phase.description}</p>

                            {/* Features List */}
                            <div className="space-y-3">
                              {phase.features.map((feature, featureIndex) => (
                                <div
                                  key={featureIndex}
                                  className="flex items-start space-x-3"
                                >
                                  <div
                                    className="w-2 h-2 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full flex-shrink-0 mt-2"
                                  ></div>
                                  <span className="text-slate-600">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Status Icon */}
                          <div>
                            {getStatusIcon(phase.status)}
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div
                          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${phase.color}`}
                          style={{ 
                            width: phase.status === 'current' ? '100%' : 
                                   phase.status === 'next' ? '60%' : '20%'
                          }}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="bg-white/70 backdrop-blur-md border border-sky-200/50 rounded-3xl p-12 max-w-3xl mx-auto relative overflow-hidden">
            <div className="relative z-10">
              <Rocket className="w-16 h-16 mx-auto mb-6 text-sky-500" />
            </div>

            <h3 className="text-3xl text-slate-800 mb-4 relative z-10">შემოგვიერთდით ამ მოგზაურობაში</h3>
            <p className="text-slate-600 mb-8 text-lg relative z-10">
              დაიწყეთ ჩვენი MVP-ით დღესვე და დაგვეხმარეთ AI-ით გაძლიერებული მშობელობის მხარდაჭერის მომავლის ჩამოყალიბებაში
            </p>
            
            <button
              className="bg-gradient-to-r from-sky-400 to-blue-500 text-white px-12 py-4 rounded-2xl hover:from-sky-500 hover:to-blue-600 transition-all duration-300 shadow-2xl shadow-sky-500/25 group relative z-10 overflow-hidden"
            >
              <span className="flex items-center relative z-10">
                ადრეული წვდომის მიღება
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}