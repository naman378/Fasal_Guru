import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Help from "./pages/Help";

// NEW PAGES - Import these
import CropDisease from "./pages/CropDisease";
import SoilAnalysis from "./pages/SoilAnalysis";
import IoTDashboard from "./pages/IoTDashboard";
import Weather from "./pages/Weather";
import MarketPrices from "./pages/MarketPrices";
import CropRecommendation from "./pages/CropRecommendation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
          
          {/* MODULE ROUTES - Add these */}
          <Route path="/crop-disease" element={<CropDisease />} />
          <Route path="/soil-analysis" element={<SoilAnalysis />} />
          <Route path="/iot-dashboard" element={<IoTDashboard />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/market-prices" element={<MarketPrices />} />
          <Route path="/crop-recommendation" element={<CropRecommendation />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
