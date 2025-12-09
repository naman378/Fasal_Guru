import { Link } from "react-router-dom";
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

interface NavigationProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const Navigation = ({ activeModule, onModuleChange }: NavigationProps) => {
  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home className="h-5 w-5" />, color: "primary" },
    { id: "crop-disease", label: "Crop Disease", icon: <Camera className="h-5 w-5" />, color: "success" },
    { id: "soil-analysis", label: "Soil Analysis", icon: <TestTube2 className="h-5 w-5" />, color: "warning" },
    { id: "iot-dashboard", label: "IoT Sensors", icon: <Activity className="h-5 w-5" />, color: "primary" },
    { id: "weather", label: "Weather", icon: <Cloud className="h-5 w-5" />, color: "secondary" },
    { id: "voice-assistant", label: "Voice Assistant", icon: <Mic className="h-5 w-5" />, color: "success" }
  ];

  const secondaryItems = [
    { id: "profile", label: "Profile", icon: <User className="h-5 w-5" />, isLink: false },
    { id: "reports", label: "Reports", icon: <FileText className="h-5 w-5" />, isLink: false },
    { id: "settings", label: "Settings", icon: <Settings className="h-5 w-5" />, isLink: true, to: "/settings" },
    { id: "help", label: "Help", icon: <HelpCircle className="h-5 w-5" />, isLink: true, to: "/help" }
  ];

  return (
    <Card className="bg-gradient-card border-0 shadow-soft sticky top-20 h-fit">
      <div className="p-4 space-y-2">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Main Modules</h3>
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={activeModule === item.id ? "default" : "ghost"}
              className={`w-full justify-start mb-1 ${
                activeModule === item.id 
                  ? `bg-${item.color} hover:bg-${item.color}-hover text-${item.color}-foreground` 
                  : "hover:bg-accent"
              }`}
              onClick={() => onModuleChange(item.id)}
            >
              <span className={activeModule === item.id ? "text-white" : `text-${item.color}`}>
                {item.icon}
              </span>
              <span className="ml-2 text-sm">{item.label}</span>
            </Button>
          ))}
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">More</h3>
          {secondaryItems.map((item) => (
            item.isLink ? (
              <Link key={item.id} to={item.to!}>
                <Button
                  variant="ghost"
                  className="w-full justify-start mb-1 hover:bg-accent"
                >
                  {item.icon}
                  <span className="ml-2 text-sm">{item.label}</span>
                </Button>
              </Link>
            ) : (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start mb-1 hover:bg-accent"
                onClick={() => onModuleChange(item.id)}
              >
                {item.icon}
                <span className="ml-2 text-sm">{item.label}</span>
              </Button>
            )
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Navigation;