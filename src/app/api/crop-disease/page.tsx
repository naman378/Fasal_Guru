// src/app/crop-disease/page.tsx

import CropDiseaseDetection from "@/components/CropDiseaseDetection";

export const metadata = {
  title: "Crop Disease Detection | AI-Powered Plant Health Analysis",
  description: "Upload images of your crops to detect diseases and get treatment recommendations using AI.",
};

export default function CropDiseasePage() {
  return <CropDiseaseDetection />;
}
