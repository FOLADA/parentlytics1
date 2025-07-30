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
      </main>
      <Footer />
    </div>
  );
}