import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Eye, Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";

const CONDITIONS = [
  {
    name: "Eczema",
    icon: Activity,
    description:
      "Chronic inflammatory skin condition causing dry, itchy, inflamed patches. Often appears in children but can affect all ages.",
    confidence: "87%",
    confidenceLabel: "Detection Rate",
    tag: "Common",
    tagColor: "bg-primary/10 text-primary",
  },
  {
    name: "Psoriasis",
    icon: Zap,
    description:
      "Autoimmune condition producing thick, scaly silver-white plaques. Chronic with cycles of flares and remissions.",
    confidence: "82%",
    confidenceLabel: "Detection Rate",
    tag: "Chronic",
    tagColor: "bg-secondary/20 text-secondary",
  },
  {
    name: "Acne",
    icon: Sparkles,
    description:
      "Most common skin condition affecting pores and sebaceous glands. Ranges from mild whiteheads to severe cystic lesions.",
    confidence: "94%",
    confidenceLabel: "Detection Rate",
    tag: "Very Common",
    tagColor: "bg-green-100 text-green-700",
  },
  {
    name: "Melanoma",
    icon: Eye,
    description:
      "Serious form of skin cancer arising from melanocytes. Early detection is critical — characterized by ABCDE criteria.",
    confidence: "76%",
    confidenceLabel: "Detection Rate",
    tag: "Urgent",
    tagColor: "bg-red-100 text-red-700",
  },
];

export default function ConditionsSection() {
  return (
    <section className="bg-muted/40 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-1">
            Key Conditions Covered
          </h2>
          <p className="text-muted-foreground">
            SkinCheck AI is trained to identify a broad range of dermatological
            conditions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONDITIONS.map((condition, i) => {
            const Icon = condition.icon;
            return (
              <motion.div
                key={condition.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                data-ocid={`conditions.item.${i + 1}`}
              >
                <Card className="h-full border-border shadow-card hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                        <Icon className="w-4.5 h-4.5 text-primary" />
                      </div>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${condition.tagColor}`}
                      >
                        {condition.tag}
                      </span>
                    </div>
                    <CardTitle className="text-base">
                      {condition.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      {condition.description}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <Badge
                        variant="outline"
                        className="text-xs font-semibold border-primary/30 text-primary"
                      >
                        {condition.confidence} {condition.confidenceLabel}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
