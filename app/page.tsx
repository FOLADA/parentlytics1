import { Hero } from "./Home Page/components/Hero";
import Pricing from "./Home Page/components/Pricing";
import { Roadmap } from "./Home Page/components/Roadmap";


export default function Home() {
  return (
      <div className="min-h-screen bg-white">
        <main>
          <Hero />
          <Roadmap />
          <Pricing />
        </main>
      </div>
  
  );
}