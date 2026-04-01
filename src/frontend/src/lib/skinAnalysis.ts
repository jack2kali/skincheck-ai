export type Severity = "Mild" | "Moderate" | "Severe";
export type Confidence = "High" | "Medium" | "Low";

export interface DifferentialDiagnosis {
  condition: string;
  likelihood: string;
}

export interface AnalysisResult {
  primaryCondition: string;
  differentials: DifferentialDiagnosis[];
  confidence: Confidence;
  confidencePercent: number;
  severity: Severity;
  explanation: {
    color: string;
    texture: string;
    shape: string;
    distribution: string;
    summary: string;
  };
  recommendations: {
    carePractices: string[];
    otcTreatments: string[];
    mayWorsen: boolean;
    worsenNote?: string;
  };
  referral: {
    recommended: boolean;
    reasons: string[];
  };
}

const CONDITIONS: AnalysisResult[] = [
  {
    primaryCondition: "Atopic Dermatitis (Eczema)",
    differentials: [
      { condition: "Contact Dermatitis", likelihood: "Possible" },
      { condition: "Psoriasis", likelihood: "Less likely" },
      { condition: "Seborrheic Dermatitis", likelihood: "Less likely" },
    ],
    confidence: "High",
    confidencePercent: 87,
    severity: "Moderate",
    explanation: {
      color:
        "Reddish-pink patches with slight grayish scaling visible on the affected area.",
      texture:
        "Skin appears dry, rough, and flaky with areas of thickening (lichenification).",
      shape: "Irregular, poorly-defined patches without sharp borders.",
      distribution:
        "Concentrated in flexural areas; pattern consistent with chronic eczema.",
      summary:
        "The image shows classic features of atopic dermatitis — dry, inflamed patches with a chronic, recurring appearance. The redness and scaling suggest active inflammation.",
    },
    recommendations: {
      carePractices: [
        "Moisturize affected areas 2–3 times daily with fragrance-free emollient",
        "Avoid known triggers such as harsh soaps, synthetic fabrics, and extreme temperatures",
        "Use lukewarm water when bathing; pat skin dry gently",
        "Wear soft, breathable cotton clothing over affected areas",
      ],
      otcTreatments: [
        "1% hydrocortisone cream for short-term itch relief (max 7 days)",
        "Colloidal oatmeal-based lotion or cream (e.g., Aveeno Eczema Therapy)",
        "Antihistamines (e.g., cetirizine) to reduce nighttime itching",
      ],
      mayWorsen: true,
      worsenNote:
        "Without consistent moisturization and trigger avoidance, eczema can spread and intensify. Secondary bacterial infection is a risk if skin is broken.",
    },
    referral: {
      recommended: false,
      reasons: [
        "See a dermatologist if symptoms persist beyond 2 weeks of OTC treatment",
        "Seek care if skin becomes infected (oozing, crusting, warmth)",
      ],
    },
  },
  {
    primaryCondition: "Acne Vulgaris",
    differentials: [
      { condition: "Rosacea", likelihood: "Possible" },
      { condition: "Folliculitis", likelihood: "Less likely" },
      { condition: "Perioral Dermatitis", likelihood: "Less likely" },
    ],
    confidence: "High",
    confidencePercent: 92,
    severity: "Mild",
    explanation: {
      color:
        "Mix of red papules and whitish comedones on a normal skin background.",
      texture:
        "Raised bumps of varying sizes; some with visible pus-filled tips (pustules).",
      shape:
        "Round, dome-shaped lesions; blackheads appear as small dark-centered pores.",
      distribution:
        "Clustered in the T-zone (forehead, nose, chin) — typical for hormonal acne.",
      summary:
        "The image is consistent with common acne vulgaris — a mix of whiteheads, blackheads, and inflammatory papules. No signs of severe cystic acne.",
    },
    recommendations: {
      carePractices: [
        "Cleanse face twice daily with a gentle, non-comedogenic cleanser",
        "Avoid touching or picking at lesions to prevent scarring",
        "Use oil-free, non-comedogenic moisturizer and sunscreen",
        "Change pillowcases frequently to reduce bacteria exposure",
      ],
      otcTreatments: [
        "Benzoyl peroxide 2.5–5% wash or gel (anti-bacterial)",
        "Salicylic acid 0.5–2% cleanser or toner (unclogs pores)",
        "Adapalene 0.1% gel (Differin) — retinoid for mild-moderate acne",
      ],
      mayWorsen: false,
    },
    referral: {
      recommended: false,
      reasons: [
        "Consult a dermatologist if acne is cystic, scarring, or unresponsive to OTC treatment after 8–12 weeks",
      ],
    },
  },
  {
    primaryCondition: "Plaque Psoriasis",
    differentials: [
      { condition: "Seborrheic Dermatitis", likelihood: "Possible" },
      { condition: "Eczema", likelihood: "Less likely" },
      { condition: "Fungal Infection (Tinea)", likelihood: "Less likely" },
    ],
    confidence: "Medium",
    confidencePercent: 74,
    severity: "Moderate",
    explanation: {
      color:
        "Well-defined silvery-white scales over an erythematous (red) base — characteristic of psoriatic plaques.",
      texture:
        "Thick, dry, adherent scaling with a rough, almost powdery surface texture.",
      shape: "Sharply demarcated, oval-to-round plaques with regular borders.",
      distribution:
        "Located on extensor surfaces (elbows, knees) — classic distribution pattern.",
      summary:
        "The visual features strongly suggest plaque psoriasis: thick silver-white scales on red plaques with sharp, well-defined edges. This is a chronic inflammatory skin condition.",
    },
    recommendations: {
      carePractices: [
        "Moisturize regularly with thick creams or ointments (petroleum jelly is effective)",
        "Avoid skin trauma, as injury can trigger new plaques (Koebner phenomenon)",
        "Manage stress levels — stress is a known psoriasis trigger",
        "Get moderate sun exposure (10–15 min/day) which can reduce plaques",
      ],
      otcTreatments: [
        "Coal tar shampoos or creams (e.g., Neutrogena T/Gel) for scalp involvement",
        "Salicylic acid products to soften and remove scales",
        "Hydrocortisone 1% cream for mild flares on the face or skin folds",
      ],
      mayWorsen: true,
      worsenNote:
        "Psoriasis is a chronic condition that may cycle through flares and remissions. Without treatment, plaques can spread and cause significant discomfort.",
    },
    referral: {
      recommended: true,
      reasons: [
        "Psoriasis often requires prescription treatments (topical steroids, biologics)",
        "A dermatologist can confirm diagnosis and rule out psoriatic arthritis",
        "Seek care if plaques are spreading rapidly or covering large body areas",
      ],
    },
  },
  {
    primaryCondition: "Contact Dermatitis",
    differentials: [
      { condition: "Atopic Eczema", likelihood: "Possible" },
      { condition: "Irritant Dermatitis", likelihood: "Possible" },
      { condition: "Urticaria (Hives)", likelihood: "Less likely" },
    ],
    confidence: "Medium",
    confidencePercent: 78,
    severity: "Mild",
    explanation: {
      color:
        "Bright red, inflamed patches with sharp edges suggesting a localized reaction.",
      texture:
        "Slightly raised, with fine vesicles (tiny blisters) and weeping in places.",
      shape:
        "Geometric or well-demarcated distribution following a specific contact pattern.",
      distribution:
        "Confined to area of contact — pattern suggests reaction to jewelry, fabric, or topical product.",
      summary:
        "The localized redness and shape of the rash strongly suggest an allergic or irritant contact dermatitis. The pattern implies direct contact with an allergen or irritant substance.",
    },
    recommendations: {
      carePractices: [
        "Identify and immediately remove the suspected allergen or irritant",
        "Wash the affected area with mild soap and cool water",
        "Apply cool, damp compresses for 15–20 minutes several times a day",
        "Avoid scratching — use loose clothing to protect the area",
      ],
      otcTreatments: [
        "Hydrocortisone 1% cream to reduce inflammation (up to 7 days)",
        "Calamine lotion to soothe itching and dry weeping areas",
        "Oral antihistamines (diphenhydramine, cetirizine) for itch relief",
      ],
      mayWorsen: false,
    },
    referral: {
      recommended: false,
      reasons: [
        "Seek care if the rash spreads, worsens after 72 hours, or shows signs of infection",
        "Patch testing by a dermatologist can identify specific allergens",
      ],
    },
  },
  {
    primaryCondition: "Melanoma (Suspicious Lesion)",
    differentials: [
      { condition: "Dysplastic Nevus", likelihood: "Possible" },
      { condition: "Seborrheic Keratosis", likelihood: "Possible" },
      { condition: "Basal Cell Carcinoma", likelihood: "Less likely" },
    ],
    confidence: "Low",
    confidencePercent: 58,
    severity: "Severe",
    explanation: {
      color:
        "Irregular pigmentation with multiple shades — dark brown, black, and lighter areas mixed together.",
      texture:
        "Slightly raised or nodular surface; edges appear uneven under close inspection.",
      shape:
        "Asymmetric shape with irregular, notched borders — does not match a typical benign mole.",
      distribution:
        "Isolated lesion; the concerning feature is the variability within a single lesion (ABCDE criteria).",
      summary:
        "This lesion shows several features associated with potentially malignant changes: asymmetry, border irregularity, color variation, and notable diameter. Urgent professional evaluation is strongly recommended.",
    },
    recommendations: {
      carePractices: [
        "Do NOT attempt to treat this at home",
        "Avoid sun exposure on the lesion and use SPF 50+ sunscreen",
        "Document the lesion with photos to track any changes",
        "Book a dermatology appointment as soon as possible",
      ],
      otcTreatments: [],
      mayWorsen: true,
      worsenNote:
        "Melanoma, if present, can spread rapidly to lymph nodes and other organs. Early detection is critical for successful treatment.",
    },
    referral: {
      recommended: true,
      reasons: [
        "Urgent dermatologist evaluation required — do not delay",
        "Dermoscopy or biopsy may be needed to rule out malignancy",
        "Any changing, bleeding, or itching mole should be evaluated promptly",
      ],
    },
  },
];

export async function analyzeImage(file: File): Promise<AnalysisResult | null> {
  // Validate file is an image
  if (!file.type.startsWith("image/")) return null;
  // Reject very small files (likely corrupt or invalid)
  if (file.size < 5000) return null;

  // Simulate processing delay 2–3 seconds
  const delay = 2000 + Math.random() * 1000;
  await new Promise((res) => setTimeout(res, delay));

  // Deterministic result based on filename hash for consistency
  const name = file.name.toLowerCase();
  if (
    name.includes("melan") ||
    name.includes("mole") ||
    name.includes("dark")
  ) {
    return CONDITIONS[4];
  }
  if (
    name.includes("acne") ||
    name.includes("pimple") ||
    name.includes("spot")
  ) {
    return CONDITIONS[1];
  }
  if (
    name.includes("psoria") ||
    name.includes("plaque") ||
    name.includes("scale")
  ) {
    return CONDITIONS[2];
  }
  if (
    name.includes("eczema") ||
    name.includes("derma") ||
    name.includes("rash")
  ) {
    return CONDITIONS[0];
  }
  if (
    name.includes("contact") ||
    name.includes("allerg") ||
    name.includes("red")
  ) {
    return CONDITIONS[3];
  }

  // Random selection weighted toward common conditions
  const weights = [0.3, 0.3, 0.2, 0.15, 0.05];
  const rand = Math.random();
  let cumulative = 0;
  for (let i = 0; i < weights.length; i++) {
    cumulative += weights[i];
    if (rand < cumulative) return CONDITIONS[i];
  }
  return CONDITIONS[0];
}
