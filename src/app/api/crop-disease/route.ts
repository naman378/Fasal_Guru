// src/app/api/crop-disease/route.ts

import { NextRequest, NextResponse } from "next/server";

// Hugging Face Space URL - this is hidden from the browser
const HF_SPACE_URL =
  "https://cropdiseasedetection-crop-disease-detector-app.hf.space";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { endpoint, data } = body;

    // Determine which HF endpoint to call
    let hfEndpoint = `${HF_SPACE_URL}/api/predict/`;
    
    if (endpoint === "predict") {
      hfEndpoint = `${HF_SPACE_URL}/api/predict/`;
    }

    // Forward the request to Hugging Face
    const hfResponse = await fetch(hfEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Check if response is OK
    if (!hfResponse.ok) {
      const errorText = await hfResponse.text();
      console.error("Hugging Face API error:", errorText);
      return NextResponse.json(
        { error: "Failed to get prediction from model", details: errorText },
        { status: hfResponse.status }
      );
    }

    // Parse and return the response
    const result = await hfResponse.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: (error as Error).message },
      { status: 500 }
    );
  }
}

// Optional: Handle GET requests for health check
export async function GET() {
  return NextResponse.json({ 
    status: "ok", 
    message: "Crop Disease Detection API is running" 
  });
}
