import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Camera, 
  FileImage, 
  AlertCircle,
  CheckCircle,
  Leaf,
  Zap,
  Download
} from "lucide-react";

const HF_SPACE_URL = "https://cropdiseasedetection-crop-disease-detector-app.hf.space";
const HF_API_URL = `${HF_SPACE_URL}/api/predict/`;

type AnalysisResult = {
  disease: string;
  confidence: number; // 0–100
  severity: "Low" | "Medium" | "High";
  yieldSummary: string;
  solution: string;
  prevention: string;
  processingTime: string;
};

const TIMELINE_STAGES = [
  { stage: "Image Processing" },
  { stage: "Disease Identification" },
  { stage: "Severity Analysis" },
  { stage: "Treatment Recommendation" },
];

const CropDiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [infectedArea, setInfectedArea] = useState<number>(25);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const recentScans = [
    { crop: "Tomato", disease: "Early Blight", confidence: 92, date: "2 hours ago" },
    { crop: "Potato", disease: "Late Blight", confidence: 88, date: "1 day ago" },
    { crop: "Corn", disease: "Healthy", confidence: 95, date: "2 days ago" }
  ];

  // Helper: convert File -> data URL string
  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Open hidden file input
  const handleSelectImage = () => {
    const input = document.getElementById("crop-image-input") as HTMLInputElement | null;
    input?.click();
  };

  // When user chooses an image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setSelectedImage(URL.createObjectURL(file));
    setAnalysisComplete(false);
    setAnalysisResult(null);
    setError(null);
  };

  // Call Hugging Face / Gradio API
  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please upload or take a photo of a leaf first.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysisComplete(false);

    try {
      const imageDataUrl = await fileToDataUrl(selectedFile);

      const response = await fetch(HF_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [imageDataUrl, infectedArea],
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const resultJson = await response.json();

      // Gradio returns: [disease, confidence%, solution, prevention, yieldSummary, time]
      const [
        disease,
        confidenceStr,
        solution,
        prevention,
        yieldSummary,
        processingTime,
      ] = resultJson.data as [string, string, string, string, string, string];

      const confidence =
        parseFloat(String(confidenceStr).replace("%", "").trim()) || 0;

      // Derive severity from estimated yield loss if possible
      let severity: "Low" | "Medium" | "High" = "Low";
      const lossMatch = String(yieldSummary).match(/([\d.]+)%/);
      const lossPct = lossMatch ? parseFloat(lossMatch[1]) : 0;
      if (lossPct >= 60) severity = "High";
      else if (lossPct >= 30) severity = "Medium";

      setAnalysisResult({
        disease,
        confidence,
        severity,
        yieldSummary,
        solution,
        prevention,
        processingTime,
      });
      setAnalysisComplete(true);
    } catch (err: any) {
      console.error(err);
      setError(
        err?.message ||
          "Something went wrong while analyzing the image. Please try again."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNewScan = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setAnalysisResult(null);
    setAnalysisComplete(false);
    setError(null);
    setInfectedArea(25);
  };

  return (
    <div className="space-y-6">
      {/* Hidden file input */}
      <input
        id="crop-image-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      {/* Upload / Analysis Section */}
      <Card className="bg-gradient-card border-0 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-success" />
            Crop Disease Detection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Error message */}
          {error && (
            <div className="p-3 rounded-md bg-destructive/10 text-sm text-destructive flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* No image yet: show upload prompt */}
          {!selectedImage && !isAnalyzing && !analysisComplete && (
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-success" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Upload Crop Image</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Take a clear photo of the affected plant leaf or upload from gallery.
                </p>
              </div>
              <div className="flex gap-2 justify-center">
                <Button onClick={handleSelectImage} className="gap-2">
                  <Camera className="h-4 w-4" />
                  Take Photo
                </Button>
                <Button variant="outline" onClick={handleSelectImage} className="gap-2">
                  <FileImage className="h-4 w-4" />
                  Upload Image
                </Button>
              </div>
            </div>
          )}

          {/* Image selected but not analyzing yet */}
          {selectedImage && !isAnalyzing && !analysisComplete && (
            <div className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Selected crop leaf"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Infected area slider (matches Gradio slider input) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Infected area (% of your field)
                  </span>
                  <span className="font-medium">{infectedArea}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={infectedArea}
                  onChange={(e) => setInfectedArea(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  This will be used to estimate yield loss, similar to the Gradio app.
                </p>
              </div>

              <Button onClick={handleAnalyze} className="w-full gap-2">
                <Zap className="h-4 w-4" />
                Analyze Disease
              </Button>
            </div>
          )}

          {/* Analyzing state */}
          {isAnalyzing && (
            <div className="space-y-6">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm">Analyzing crop image with AI model...</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {TIMELINE_STAGES.map((stage, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">{stage.stage}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analysis complete: show results */}
          {analysisComplete && analysisResult && (
            <div className="space-y-6">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Analyzed crop leaf"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-muted-foreground">Analyzed Image</p>
                )}
              </div>

              {/* Results */}
              <Card className="bg-danger/5 border-danger/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-danger mt-1" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-danger">
                          {analysisResult.disease} Detected
                        </h4>
                        <Badge variant="outline">{analysisResult.severity} Severity</Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Confidence:</span>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={analysisResult.confidence} className="flex-1" />
                            <span className="font-medium">
                              {analysisResult.confidence.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Yield impact:</span>
                          <p className="mt-1 font-medium">
                            {analysisResult.yieldSummary}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground">
                        Model processing time: {analysisResult.processingTime}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Treatment Recommendations (from Gradio disease_solutions) */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Treatment & Prevention</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h5 className="font-medium text-success mb-2">
                      ✓ Recommended Treatment
                    </h5>
                    <p className="text-sm bg-success/5 p-3 rounded">
                      {analysisResult.solution}
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-primary mb-2">
                      🛡️ Prevention Tips
                    </h5>
                    <p className="text-sm bg-primary/5 p-3 rounded">
                      {analysisResult.prevention}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button variant="success" className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
                <Button variant="outline" onClick={handleNewScan}>
                  New Scan
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Scans */}
      <Card className="bg-gradient-card border-0 shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg">Recent Disease Scans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentScans.map((scan, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div>
                  <p className="font-medium">{scan.crop}</p>
                  <p className="text-sm text-muted-foreground">{scan.date}</p>
                </div>
                <div className="text-right">
                  <Badge variant={scan.disease === "Healthy" ? "outline" : "destructive"}>
                    {scan.disease}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    {scan.confidence}% confidence
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CropDiseaseDetection;
