import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Home, 
  Camera, 
  TestTube2, 
  Activity, 
  Cloud, 
  Mic,
  User,
  Settings,
  FileText,
  HelpCircle
} from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home className="h-5 w-5" />, color: "primary", to: "/" },
    { id: "crop-disease", label: "Crop Disease", icon: <Camera className="h-5 w-5" />, color: "success", to: "/crop-disease" },
    { id: "soil-analysis", label: "Soil Analysis", icon: <TestTube2 className="h-5 w-5" />, color: "warning", to: "/soil-analysis" },
    { id: "iot-dashboard", label: "IoT Sensors", icon: <Activity className="h-5 w-5" />, color: "primary", to: "/iot-dashboard" },
    { id: "weather", label: "Weather", icon: <Cloud className="h-5 w-5" />, color: "secondary", to: "/weather" },
    { id: "voice-assistant", label: "Voice Assistant", icon: <Mic className="h-5 w-5" />, color: "success", to: "/voice-assistant" }
  ];

  const secondaryItems = [
    { id: "profile", label: "Profile", icon: <User className="h-5 w-5" />, to: "/profile" },
    { id: "reports", label: "Reports", icon: <FileText className="h-5 w-5" />, to: "/reports" },
    { id: "settings", label: "Settings", icon: <Settings className="h-5 w-5" />, to: "/settings" },
    { id: "help", label: "Help", icon: <HelpCircle className="h-5 w-5" />, to: "/help" }
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Card className="bg-gradient-card border-0 shadow-soft sticky top-20 h-fit">
      <div className="p-4 space-y-2">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Main Modules</h3>
          {navigationItems.map((item) => (
            <Link key={item.id} to={item.to}>
              <Button
                variant={isActive(item.to) ? "default" : "ghost"}
                className={`w-full justify-start mb-1 ${
                  isActive(item.to) 
                    ? `bg-${item.color} hover:bg-${item.color}-hover text-white` 
                    : "hover:bg-accent"
                }`}
              >
                <span className={isActive(item.to) ? "text-white" : `text-${item.color}`}>
                  {item.icon}
                </span>
                <span className="ml-2 text-sm">{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">More</h3>
          {secondaryItems.map((item) => (
            <Link key={item.id} to={item.to}>
              <Button
                variant={isActive(item.to) ? "default" : "ghost"}
                className={`w-full justify-start mb-1 ${
                  isActive(item.to) 
                    ? "bg-primary hover:bg-primary-hover text-white" 
                    : "hover:bg-accent"
                }`}
              >
                <span className={isActive(item.to) ? "text-white" : "text-muted-foreground"}>
                  {item.icon}
                </span>
                <span className="ml-2 text-sm">{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Navigation;
