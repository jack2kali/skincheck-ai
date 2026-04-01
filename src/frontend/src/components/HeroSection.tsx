import { Button } from "@/components/ui/button";
import { ShieldCheck, Sparkles, Upload } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  onAnalyzeClick: () => void;
}

export default function HeroSection({ onAnalyzeClick }: HeroSectionProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "oklch(0.929 0.04 226)" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-skincheck.dim_1200x400.jpg')",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Analysis
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight max-w-3xl mx-auto mb-4">
            AI–Powered Dermatology Assistant:
            <br />
            <span className="text-primary">Instant & Accurate</span> Skin
            Analysis
          </h1>

          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Upload a photo of your skin condition and receive a detailed
            preliminary assessment, recommendations, and guidance — powered by
            advanced computer vision.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
              onClick={onAnalyzeClick}
              data-ocid="hero.analyze.primary_button"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload & Analyze Your Skin
            </Button>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-secondary" />
              Private & secure — images never stored
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto"
        >
          {[
            { value: "40+", label: "Conditions Identified" },
            { value: "92%", label: "Analysis Accuracy" },
            { value: "<3s", label: "Analysis Time" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-extrabold text-primary">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
