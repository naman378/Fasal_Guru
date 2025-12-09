import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  TestTube, 
  Activity,
  Cloud, 
  Mic,
  ArrowRight
} from "lucide-react";
import cropIcon from "@/assets/crop-icon.png";
import soilIcon from "@/assets/soil-icon.png";
import iotIcon from "@/assets/iot-icon.png";

const Dashboard = () => {
  const navigate = useNavigate();

  const modules = [
    {
      id: "crop-disease",
      title: "Crop Disease Detection",
      description: "Upload crop images to detect diseases and get treatment recommendations",
      icon: <Camera className="h-8 w-8" />,
      bgImage: cropIcon,
      color: "success",
      stats: "94% Accuracy",
      to: "/crop-disease"
    },
    {
      id: "soil-analysis", 
      title: "Soil Analysis",
      description: "Analyze soil health, nutrients and get fertilizer recommendations",
      icon: <TestTube className="h-8 w-8" />,
      bgImage: soilIcon,
      color: "warning",
      stats: "NPK Analysis",
      to: "/soil-analysis"
    },
    {
      id: "iot-dashboard",
      title: "IoT Sensor Data", 
      description: "Monitor real-time environmental conditions and farm parameters",
      icon: <Activity className="h-8 w-8" />,
      bgImage: iotIcon,
      color: "primary",
      stats: "Live Data",
      to: "/iot-dashboard"
    },
    {
      id: "weather",
      title: "Weather Forecast",
      description: "7-day weather predictions and agricultural advisories",
      icon: <Cloud className="h-8 w-8" />,
      color: "secondary",
      stats: "7-Day Forecast",
      to: "/weather"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary via-success to-warning rounded-xl p-6 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Welcome to FasalGuru</h2>
          <p className="text-white/90 mb-4">Your AI-powered farming assistant for better crop management</p>
          <Button 
            variant="secondary" 
            className="bg-white text-primary hover:bg-white/90"
            onClick={() => navigate("/voice-assistant")}
          >
            <Mic className="h-4 w-4 mr-2" />
            Ask Voice Assistant
          </Button>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-white/10 rounded-full translate-y-4 translate-x-4"></div>
      </div>

      {/* Main Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {modules.map((module) => (
          <Card 
            key={module.id} 
            className="group hover:shadow-strong transition-all duration-300 cursor-pointer bg-gradient-card border-0 overflow-hidden"
            onClick={() => navigate(module.to)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg bg-${module.color}/10`}>
                  <div className={`text-${module.color}`}>
                    {module.icon}
                  </div>
                </div>
                <div className={`text-xs font-medium px-2 py-1 rounded-full bg-${module.color}/10 text-${module.color}`}>
                  {module.stats}
                </div>
              </div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {module.title}
              </CardTitle>
              <CardDescription className="text-sm">
                {module.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full group-hover:bg-primary-hover transition-colors" 
                variant="default"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent double navigation from card click
                  navigate(module.to);
                }}
              >
                Open Module
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
