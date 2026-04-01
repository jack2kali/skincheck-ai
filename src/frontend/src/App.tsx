import { Toaster } from "@/components/ui/sonner";
import { useRef } from "react";
import AnalyzeSection from "./components/AnalyzeSection";
import ConditionsSection from "./components/ConditionsSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection";

export default function App() {
  const analyzeRef = useRef<HTMLDivElement>(null);

  const scrollToAnalyze = () => {
    analyzeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <Header onAnalyzeClick={scrollToAnalyze} />
      <main>
        <HeroSection onAnalyzeClick={scrollToAnalyze} />
        <div ref={analyzeRef}>
          <AnalyzeSection />
        </div>
        <ConditionsSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
}
