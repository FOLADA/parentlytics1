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
      </main>
      {/* Features Cards Section */}
      <section className="w-full flex flex-col items-center justify-center py-20 px-4 bg-transparent pt-24">
        <h2 className="text-2xl md:text-4xl font-medium text-center text-gray-900 mb-3">Everything you need to support your child's growth</h2>
        <p className="text-lg text-center text-gray-500 mb-12 max-w-2xl">Four core features that transform parenting from overwhelming to empowering</p>
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-50 rounded-2xl p-6 flex flex-col items-start shadow-sm border border-blue-100 min-h-[345px]">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-200 to-blue-400 mb-4">
              <MessageSquare size={28} color="#fff" strokeWidth={2.2} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-lg md:text-xl">Parent-AI Chat</h3>
            <p className="text-gray-600 text-base md:text-lg">24/7 AI chatbot trained on child psychology, pediatrics, and education. Get instant, non-judgmental answers to all your parenting questions.</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-6 flex flex-col items-start shadow-sm border border-blue-100 min-h-[345px]">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-200 to-blue-400 mb-4">
              <LineChart size={28} color="#fff" strokeWidth={2.2} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-lg md:text-xl">Development Tracker</h3>
            <p className="text-gray-600 text-base md:text-lg">Personalized tracking of your child's emotional, mental, and physical growth. Know if they're on track with data-backed insights.</p>
          </div>
          <div className="bg-purple-50 rounded-2xl p-6 flex flex-col items-start shadow-sm border border-purple-100 min-h-[345px]">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-200 to-purple-400 mb-4">
              <Lightbulb size={28} color="#fff" strokeWidth={2.2} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-lg md:text-xl">Smart Suggestions</h3>
            <p className="text-gray-600 text-base md:text-lg">Get daily micro-tips and actionable advice tailored to your child's age and development stage. Every suggestion is backed by research.</p>
          </div>
          <div className="bg-pink-50 rounded-2xl p-6 flex flex-col items-start shadow-sm border border-pink-100 min-h-[345px]">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-200 to-pink-400 mb-4">
              <Heart size={28} color="#fff" strokeWidth={2.2} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-lg md:text-xl">Daily Celebrations</h3>
            <p className="text-gray-600 text-base md:text-lg">Celebrate wins and progress, no matter how small. Build confidence as a parent with positive reinforcement and milestone recognition.</p>
          </div>
        </div>
      </section>
      {/* AI Technology Section (обновленная) */}
      <section className="relative min-h-screen w-full bg-gradient-to-br from-[#0a2240] via-[#142e56] to-[#1a3766] flex flex-col items-center justify-center overflow-hidden py-20 px-4">
        {/* Animated Background Points */}
        {Array.from({ length: 100 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-sky-400/30 rounded-full pointer-events-none animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 6 + 6}s`,
            }}
          />
        ))}
        {/* Background large icons */}
        <div className="absolute left-[12%] top-[38%] -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
          <Shield className="w-[260px] h-[260px] text-sky-400/30" />
        </div>
        <div className="absolute right-[10%] top-[22%] translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
          <Sparkles className="w-[200px] h-[200px] text-sky-400/30" />
        </div>
        <div className="absolute left-1/2 bottom-[8%] -translate-x-1/2 translate-y-1/2 opacity-20 pointer-events-none">
          <Sparkles className="w-[200px] h-[200px] text-sky-400/30" />
        </div>
        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          <span className="mb-4 inline-block px-4 py-1 rounded-full bg-blue-900/60 text-sky-200 text-xs font-semibold tracking-wide">AI Technology</span>
          <h2 className="text-3xl md:text-4xl font-semibold text-white text-center mb-3">Why AI is the unlock for modern parenting</h2>
          <p className="text-lg text-sky-200 text-center mb-12 max-w-2xl">AI doesn't replace human intuition—it enhances it with data-driven insights and expert knowledge</p>
          {/* Top row: Card + Big Icon */}
          <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-10 mb-12">
            {/* Card 1 */}
            <div className="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-lg flex flex-col gap-2 min-w-[272px] max-w-lg backdrop-blur-md z-10">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-500">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="block text-white font-semibold text-xl">Empathetic + Expert</span>
                  <span className="block text-xs text-sky-200 font-medium mt-1">
                    <span className="inline-block bg-sky-500/90 text-white px-2 py-0.5 rounded-md mr-1 align-middle">10,000+ research papers analyzed</span>
                  </span>
                </div>
              </div>
              <p className="text-sky-100 text-base mt-1">GPT fine-tuned with medical and educational expertise provides compassionate, research-backed guidance</p>
            </div>
            {/* Big Icon */}
            <div className="hidden md:block relative">
              <div className="w-[208px] h-[208px] rounded-full bg-sky-900/30 flex items-center justify-center">
                <Sparkles className="w-[96px] h-[96px] text-sky-300/80" />
              </div>
            </div>
          </div>
          {/* Bottom row */}
          <div className="flex flex-col md:flex-row gap-10 w-full justify-center items-center">
            {/* Big Icon */}
            <div className="hidden md:block relative">
              <div className="w-[208px] h-[208px] rounded-full bg-sky-900/30 flex items-center justify-center">
                <Shield className="w-[96px] h-[96px] text-sky-300/80" />
              </div>
            </div>
            {/* Card 2 */}
            <div className="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-lg flex flex-col gap-2 min-w-[272px] max-w-lg backdrop-blur-md z-10">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-500">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="block text-white font-semibold text-xl">Dynamic Tracking</span>
                  <span className="block text-xs text-sky-200 font-medium mt-1">
                    <span className="inline-block bg-sky-500/90 text-white px-2 py-0.5 rounded-md mr-1 align-middle">50+ developmental milestones</span>
                  </span>
                </div>
              </div>
              <p className="text-sky-100 text-base mt-1">Real-world milestone tracking that adapts to your child's unique development journey</p>
            </div>
          </div>
          {/* Third row: Card + Big Icon */}
          <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-10 mt-12">
            {/* Card 3 */}
            <div className="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-lg flex flex-col gap-2 min-w-[272px] max-w-lg backdrop-blur-md z-10">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-500">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="block text-white font-semibold text-xl">Parenting Co-pilot</span>
                  <span className="block text-xs text-sky-200 font-medium mt-1">
                    <span className="inline-block bg-sky-500/90 text-white px-2 py-0.5 rounded-md mr-1 align-middle">Personalized for every child</span>
                  </span>
                </div>
              </div>
              <p className="text-sky-100 text-base mt-1">Context-aware suggestions that learn from your family's patterns and preferences</p>
            </div>
            {/* Big Icon */}
            <div className="hidden md:block relative">
              <div className="w-[208px] h-[208px] rounded-full bg-sky-900/30 flex items-center justify-center">
                <Sparkles className="w-[96px] h-[96px] text-sky-300/80" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}