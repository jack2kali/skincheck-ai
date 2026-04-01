import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertTriangle,
  Camera,
  CheckCircle,
  ClipboardList,
  Info,
  RefreshCw,
  ShieldAlert,
  Stethoscope,
  Thermometer,
  Upload,
  UserCheck,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { type AnalysisResult, analyzeImage } from "../lib/skinAnalysis";

type UploadState = "idle" | "analyzing" | "result" | "error" | "unclear";

function SeverityBadge({ severity }: { severity: AnalysisResult["severity"] }) {
  const map = {
    Mild: "bg-green-100 text-green-700 border-green-200",
    Moderate: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Severe: "bg-red-100 text-red-700 border-red-200",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${map[severity]}`}
    >
      {severity}
    </span>
  );
}

function ConfidenceBadge({
  confidence,
}: { confidence: AnalysisResult["confidence"] }) {
  const map = {
    High: "bg-primary/10 text-primary border-primary/20",
    Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Low: "bg-muted text-muted-foreground border-border",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${map[confidence]}`}
    >
      {confidence} Confidence
    </span>
  );
}

function AnalysisSkeleton() {
  return (
    <div className="space-y-4" data-ocid="analysis.loading_state">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">
            Analyzing your image...
          </p>
          <p className="text-xs text-muted-foreground">
            AI is examining color, texture, and patterns
          </p>
        </div>
      </div>
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  );
}

function ResultDisplay({ result }: { result: AnalysisResult }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-5"
      data-ocid="analysis.result.panel"
    >
      {/* Condition + badges */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3 className="text-lg font-bold text-foreground">
            {result.primaryCondition}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <SeverityBadge severity={result.severity} />
          <ConfidenceBadge confidence={result.confidence} />
        </div>
      </div>

      {/* Confidence bar */}
      <div>
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>AI Confidence</span>
          <span className="font-semibold text-foreground">
            {result.confidencePercent}%
          </span>
        </div>
        <Progress value={result.confidencePercent} className="h-2" />
      </div>

      <Separator />

      {/* Differentials */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Stethoscope className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">
            Differential Diagnoses
          </span>
        </div>
        <div className="space-y-1">
          {result.differentials.map((d) => (
            <div
              key={d.condition}
              className="flex justify-between items-center text-sm"
            >
              <span className="text-muted-foreground">{d.condition}</span>
              <Badge variant="outline" className="text-xs">
                {d.likelihood}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Explanation */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">
            Explanation
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          {result.explanation.summary}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Color", value: result.explanation.color },
            { label: "Texture", value: result.explanation.texture },
            { label: "Shape", value: result.explanation.shape },
            { label: "Distribution", value: result.explanation.distribution },
          ].map((item) => (
            <div key={item.label} className="bg-muted rounded-lg p-2.5">
              <div className="text-xs font-semibold text-foreground mb-0.5">
                {item.label}
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Recommendations */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <ClipboardList className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">
            Recommendations
          </span>
        </div>
        <div className="space-y-1.5 mb-3">
          {result.recommendations.carePractices.map((r) => (
            <div
              key={r}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
              {r}
            </div>
          ))}
        </div>
        {result.recommendations.otcTreatments.length > 0 && (
          <div className="bg-primary/5 border border-primary/15 rounded-lg p-3">
            <div className="text-xs font-semibold text-primary mb-1.5">
              OTC Treatments
            </div>
            {result.recommendations.otcTreatments.map((t) => (
              <div
                key={t}
                className="text-xs text-muted-foreground flex items-start gap-1.5 mb-1"
              >
                <span className="text-primary mt-0.5">•</span> {t}
              </div>
            ))}
          </div>
        )}
        {result.recommendations.mayWorsen &&
          result.recommendations.worsenNote && (
            <div className="mt-2 flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-2.5">
              <AlertTriangle className="w-3.5 h-3.5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-yellow-800">
                {result.recommendations.worsenNote}
              </p>
            </div>
          )}
      </div>

      <Separator />

      {/* Referral */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <UserCheck className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">
            Doctor Referral
          </span>
          {result.referral.recommended && (
            <span className="text-xs bg-red-100 text-red-700 border border-red-200 rounded-full px-2 py-0.5 font-semibold">
              Recommended
            </span>
          )}
        </div>
        <div className="space-y-1">
          {result.referral.reasons.map((r) => (
            <div
              key={r}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              {result.referral.recommended ? (
                <ShieldAlert className="w-3.5 h-3.5 text-red-500 mt-0.5 flex-shrink-0" />
              ) : (
                <Thermometer className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
              )}
              {r}
            </div>
          ))}
        </div>
      </div>

      {/* Severity summary */}
      <div
        className={`rounded-lg p-3 border text-sm font-medium flex items-center gap-2 ${
          result.severity === "Severe"
            ? "bg-red-50 border-red-200 text-red-700"
            : result.severity === "Moderate"
              ? "bg-yellow-50 border-yellow-200 text-yellow-700"
              : "bg-green-50 border-green-200 text-green-700"
        }`}
      >
        <Thermometer className="w-4 h-4" />
        Severity: <strong>{result.severity}</strong>
        {result.severity === "Severe" &&
          " — Please seek medical attention soon."}
        {result.severity === "Moderate" &&
          " — Monitor closely and consider OTC treatment."}
        {result.severity === "Mild" && " — Manageable with home care."}
      </div>

      {/* Disclaimer */}
      <div className="bg-muted border border-border rounded-lg p-3 flex items-start gap-2">
        <ShieldAlert className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
        <p className="text-xs text-muted-foreground">
          <strong>Medical Disclaimer:</strong> This is not a medical diagnosis.
          Please consult a qualified healthcare professional for accurate
          diagnosis and treatment.
        </p>
      </div>
    </motion.div>
  );
}

export default function AnalyzeSection() {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(async (file: File) => {
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setUploadState("analyzing");
    setResult(null);

    const analysis = await analyzeImage(file);

    if (!analysis) {
      setUploadState("unclear");
      return;
    }

    setResult(analysis);
    setUploadState("result");
    toast.success("Analysis complete!");
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleReset = () => {
    setUploadState("idle");
    setImagePreview(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-1">
          Analyze Your Skin
        </h2>
        <p className="text-muted-foreground">
          Upload a clear photo for an AI-powered preliminary assessment.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Upload Card */}
        <Card className="border-border shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Camera className="w-4 h-4 text-primary" />
              Upload Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            <input
              id="skin-upload"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleFileChange}
              data-ocid="analyze.upload_button"
            />

            {/* Dropzone — label element acts as the clickable area */}
            {uploadState === "idle" && (
              <label
                htmlFor="skin-upload"
                data-ocid="analyze.dropzone"
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
                  isDragging
                    ? "border-primary bg-accent"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center">
                  <Camera className="w-7 h-7 text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground text-sm">
                    Drag & drop or click to upload
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supports JPG, PNG, WEBP — max 20MB
                  </p>
                </div>
                <span className="mt-1 inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium shadow-xs hover:bg-muted transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  Choose File
                </span>
              </label>
            )}

            {/* Image preview */}
            {imagePreview && uploadState !== "idle" && (
              <div className="space-y-3">
                <div className="relative rounded-xl overflow-hidden border border-border">
                  <img
                    src={imagePreview}
                    alt="Uploaded skin condition"
                    className="w-full h-56 object-cover"
                  />
                  {uploadState === "analyzing" && (
                    <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
                      <div className="bg-card rounded-xl px-4 py-3 flex items-center gap-2.5 shadow-lg">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm font-medium">
                          Analyzing...
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="w-full"
                  data-ocid="analyze.reset.secondary_button"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                  Upload a Different Image
                </Button>
              </div>
            )}

            {/* Tips */}
            <div className="mt-4 space-y-1.5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Tips for best results
              </p>
              {[
                "Good lighting — natural or bright indoor light",
                "In-focus, close-up view of affected area",
                "Avoid using filters or heavy editing",
              ].map((tip) => (
                <div
                  key={tip}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <CheckCircle className="w-3 h-3 text-secondary flex-shrink-0" />
                  {tip}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Results Card */}
        <Card className="border-border shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-primary" />
              AI Analysis Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {uploadState === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                  data-ocid="analysis.empty_state"
                >
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-3">
                    <Stethoscope className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="font-medium text-muted-foreground">
                    No image uploaded yet
                  </p>
                  <p className="text-sm text-muted-foreground/70 mt-1">
                    Upload an image to see your AI analysis
                  </p>
                </motion.div>
              )}

              {uploadState === "analyzing" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <AnalysisSkeleton />
                </motion.div>
              )}

              {uploadState === "unclear" && (
                <motion.div
                  key="unclear"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center py-8"
                  data-ocid="analysis.error_state"
                >
                  <AlertTriangle className="w-10 h-10 text-yellow-500 mb-3" />
                  <p className="font-semibold text-foreground mb-2">
                    Unable to analyze
                  </p>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    I'm unable to confidently analyze this image. Please upload
                    a clearer image or consult a healthcare professional.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="mt-4"
                    data-ocid="analyze.retry.secondary_button"
                  >
                    <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                    Try Another Image
                  </Button>
                </motion.div>
              )}

              {uploadState === "result" && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ResultDisplay result={result} />
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
