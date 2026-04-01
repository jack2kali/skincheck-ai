import { Separator } from "@/components/ui/separator";
import { Heart, Shield } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="border-t border-border bg-card mt-0">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">SkinCheck AI</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              AI-powered preliminary skin condition assessment. Not a
              replacement for professional medical advice.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-3">
              Features
            </p>
            <div className="space-y-2">
              {[
                "Skin Analysis",
                "Conditions Database",
                "Care Recommendations",
                "Doctor Referrals",
              ].map((l) => (
                <p
                  key={l}
                  className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                >
                  {l}
                </p>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-3">
              Legal
            </p>
            <div className="space-y-2">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Medical Disclaimer",
                "Cookie Policy",
              ].map((l) => (
                <p
                  key={l}
                  className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                >
                  {l}
                </p>
              ))}
            </div>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Disclaimer */}
        <div className="bg-muted rounded-lg p-4 mb-6">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Medical Disclaimer:</strong>{" "}
            SkinCheck AI provides preliminary assessments for informational
            purposes only. This is not a medical diagnosis. Always consult a
            qualified healthcare professional for accurate diagnosis and
            treatment. Do not delay seeking medical attention based on
            information provided by this tool.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {year} SkinCheck AI. All rights reserved.</p>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            Built with <Heart className="w-3 h-3 text-red-500" /> using
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
