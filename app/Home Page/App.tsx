import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { InteractiveCards } from "./components/InteractiveCards";
import { Roadmap } from "./components/Roadmap";
import Pricing from "./components/Pricing";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <InteractiveCards />
        <Roadmap />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}