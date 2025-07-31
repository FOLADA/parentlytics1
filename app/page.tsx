<<<<<<< HEAD
import { MessageSquare, LineChart, Lightbulb, Heart, Shield, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-[#f5fafd] to-[#eaf3fb] px-4 py-12">
        <div className="mb-6">
          <span className="inline-block px-4 py-1 rounded-full bg-white/70 border border-blue-100 text-blue-700 font-medium text-sm shadow-sm mb-6">AI-Powered Parental Development</span>
        </div>
        <h1 className="text-[3.5rem] md:text-[5.5rem] font-light text-center text-gray-900 mb-4 leading-[1.08] tracking-wider">
          Your child's growth,<br />
          <span className="bg-gradient-to-r from-[#1da1f2] to-[#166fff] text-transparent bg-clip-text font-light tracking-wider">finally simplified</span>
        </h1>
        <p className="text-lg md:text-xl text-center text-gray-600 max-w-2xl mb-8">
          Track emotional, mental, and physical development in one personalized dashboard. Get AI-powered insights, milestone tracking, and parenting guidance 24/7.
        </p>
        <div className="flex gap-4 mb-12">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow transition">Start Free Trial</button>
          <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow transition">Watch Demo</button>
        </div>
        <div className="flex gap-8 mt-4">
          <div className="flex flex-col items-center text-sm text-gray-500">
            <span className="mb-1">🧠</span>
            AI-Powered
          </div>
          <div className="flex flex-col items-center text-sm text-gray-500">
            <span className="mb-1">💙</span>
            Empathetic
          </div>
          <div className="flex flex-col items-center text-sm text-gray-500">
            <span className="mb-1">✨</span>
            Personalized
          </div>
        </div>
=======
import { Header } from "./Home Page/components/Header";
import { Hero } from "./Home Page/components/Hero";
import { Features } from "./Home Page/components/Features";
import { Roadmap } from "./Home Page/components/Roadmap";
import { Pricing } from "./Home Page/components/Pricing";
import { Footer } from "./Home Page/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Roadmap />
        <Pricing />
>>>>>>> a6c33bfbd8178cd66d70aa896f12da2315e1d308
      </main>
      <Footer />
    </div>
  );
}