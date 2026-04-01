# SkinCheck AI

## Current State
New project — no existing application files.

## Requested Changes (Diff)

### Add
- AI-powered dermatology assistant frontend with image upload
- Skin condition analysis result display (condition, differentials, confidence, severity)
- Explanations based on visible features (color, texture, shape, distribution)
- OTC recommendations and care practices
- Doctor referral guidelines
- Medical disclaimer on every analysis result
- Image upload via blob-storage component
- AI analysis via http-outcalls to a vision-capable AI API (simulated on backend)
- Failure handling when image is unclear

### Modify
- N/A (new project)

### Remove
- N/A

## Implementation Plan
1. Backend: Motoko actor with blob-storage for image uploads, http-outcalls component for AI analysis. Expose functions: uploadImage, analyzeImage, getAnalysis.
2. Frontend: Multi-section SPA — hero, upload section, results section, how-it-works, conditions covered, footer.
3. Upload flow: user selects/drags image → uploads to blob-storage → backend calls AI vision API → returns structured analysis JSON.
4. Results display: structured cards for condition, differentials, confidence gauge, severity badge, explanation, recommendations, referral guidelines, disclaimer.
5. Error/unclear image fallback messaging.
