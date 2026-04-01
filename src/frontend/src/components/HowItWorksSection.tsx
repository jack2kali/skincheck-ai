import { Card, CardContent } from "@/components/ui/card";
import { Brain, FileText, Upload } from "lucide-react";
import { motion } from "motion/react";

const STEPS = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Your Image",
    description:
      "Take a clear photo of the affected skin area and upload it using drag-and-drop or the file picker. Supports all common image formats.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Brain,
    step: "02",
    title: "AI Analysis",
    description:
      "Our advanced computer vision model analyzes color patterns, texture, shape, and distribution — identifying key dermatological markers in seconds.",
    color: "bg-secondary/20 text-secondary",
  },
  {
    icon: FileText,
    step: "03",
    title: "Review Results",
    description:
      "Receive a detailed assessment with identified conditions, severity rating, care recommendations, and guidance on when to see a doctor.",
    color: "bg-green-100 text-green-700",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-1">
          How SkinCheck AI Works
        </h2>
        <p className="text-muted-foreground">
          Three simple steps from photo to professional-grade assessment.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
            >
              <Card className="border-border shadow-card h-full">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${step.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-3xl font-extrabold text-border mt-0.5">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
