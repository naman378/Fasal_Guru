import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { 
  ArrowLeft, User, Bell, Tractor, Settings as SettingsIcon, Shield, Info, Database, 
  MessageSquare, Camera, Save, Trash2, Download, Mail, Phone, Star, Bug, Send, Globe
} from "lucide-react";

const Settings = () => {
  // Account Settings State
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    language: "hindi"
  });
  
  // Notification Preferences
  const [notifications, setNotifications] = useState({
    weatherAlerts: true,
    cropAdvisory: true,
    marketPrices: true,
    smsNotifications: false,
    emailNotifications: true
  });

  // Farm Profile
  const [farms, setFarms] = useState([
    { id: 1, name: "Main Farm", size: "5", unit: "acres", soilType: "loamy", crops: "Wheat, Rice", irrigation: "drip", farmingType: "mixed" }
  ]);

  // Preferences
  const [preferences, setPreferences] = useState({
    units: "metric",
    currency: "INR",
    temperature: "celsius",
    dateFormat: "dd/mm/yyyy",
    darkMode: false
  });

  // Privacy & Security
  const [security, setSecurty] = useState({
    twoFactor: false,
    dataSharing: true
  });

  // Feedback form
  const [feedback, setFeedback] = useState({
    type: "feedback",
    message: "",
    rating: 5
  });

  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clearDataDialogOpen, setClearDataDialogOpen] = useState(false);

  const handleSaveProfile = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem("fasalGuru_profile", JSON.stringify(profile));
    setIsLoading(false);
    toast({ title: "प्रोफाइल सहेजा गया!", description: "Profile saved successfully!" });
  };

  const handleSaveNotifications = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.setItem("fasalGuru_notifications", JSON.stringify(notifications));
    setIsLoading(false);
    toast({ title: "सूचना प्राथमिकताएं अपडेट!", description: "Notification preferences updated!" });
  };

  const handleExportData = (format: string) => {
    toast({ title: `डेटा ${format} में निर्यात हो रहा है...`, description: `Exporting data as ${format}...` });
  };

  const handleClearCache = () => {
    localStorage.clear();
    setClearDataDialogOpen(false);
    toast({ title: "कैश साफ़ किया गया!", description: "Cache cleared successfully!" });
  };

  const handleDeleteAccount = () => {
    setDeleteDialogOpen(false);
    toast({ title: "खाता हटाने का अनुरोध भेजा गया", description: "Account deletion request submitted", variant: "destructive" });
  };

  const handleSubmitFeedback = async () => {
    if (!feedback.message.trim()) {
      toast({ title: "कृपया संदेश लिखें", description: "Please enter a message", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setFeedback({ ...feedback, message: "" });
    toast({ title: "प्रतिक्रिया भेजी गई!", description: "Thank you for your feedback!" });
  };

  const addNewFarm = () => {
    const newFarm = {
      id: farms.length + 1,
      name: `Farm ${farms.length + 1}`,
      size: "",
      unit: "acres",
      soilType: "",
      crops: "",
      irrigation: "",
      farmingType: "conventional"
    };
    setFarms([...farms, newFarm]);
    toast({ title: "नया खेत जोड़ा गया!", description: "New farm added!" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-primary">सेटिंग्स / Settings</h1>
            <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid grid-cols-4 lg:grid-cols-7 gap-1 h-auto p-1 bg-muted">
            <TabsTrigger value="account" className="flex flex-col items-center gap-1 py-2 text-xs">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger value="farm" className="flex flex-col items-center gap-1 py-2 text-xs">
              <Tractor className="h-4 w-4" />
              <span className="hidden sm:inline">Farm</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex flex-col items-center gap-1 py-2 text-xs">
              <SettingsIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex flex-col items-center gap-1 py-2 text-xs">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="app-info" className="flex flex-col items-center gap-1 py-2 text-xs">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">App Info</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="flex flex-col items-center gap-1 py-2 text-xs">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Data</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex flex-col items-center gap-1 py-2 text-xs">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Support</span>
            </TabsTrigger>
          </TabsList>

          {/* Account Settings */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  प्रोफ़ाइल जानकारी / Profile Information
                </CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-10 w-10 text-primary" />
                    </div>
                    <Button size="icon" variant="secondary" className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <p className="font-medium">Profile Photo</p>
                    <p className="text-sm text-muted-foreground">JPG, PNG up to 5MB</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">नाम / Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your name" 
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">फ़ोन / Phone</Label>
                    <Input 
                      id="phone" 
                      placeholder="+91 XXXXXXXXXX" 
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">ईमेल / Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">स्थान / Location</Label>
                    <Input 
                      id="location" 
                      placeholder="Village, District, State" 
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">भाषा / Language</Label>
                    <Select value={profile.language} onValueChange={(value) => setProfile({ ...profile, language: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card">
                        <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={handleSaveProfile} disabled={isLoading} className="mt-4">
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Profile"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  सूचना प्राथमिकताएं / Notification Preferences
                </CardTitle>
                <CardDescription>Choose which notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: "weatherAlerts", label: "मौसम अलर्ट / Weather Alerts", desc: "Get notified about weather changes" },
                  { key: "cropAdvisory", label: "फसल सलाह / Crop Advisory", desc: "Receive crop-related recommendations" },
                  { key: "marketPrices", label: "बाजार भाव / Market Price Updates", desc: "Stay updated with market prices" },
                  { key: "smsNotifications", label: "SMS सूचनाएं / SMS Notifications", desc: "Receive SMS notifications" },
                  { key: "emailNotifications", label: "ईमेल सूचनाएं / Email Notifications", desc: "Receive email notifications" }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch 
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                    />
                  </div>
                ))}
                <Button onClick={handleSaveNotifications} disabled={isLoading} variant="outline" className="mt-4">
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Farm Profile */}
          <TabsContent value="farm" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tractor className="h-5 w-5 text-primary" />
                  खेत प्रोफ़ाइल / Farm Profile
                </CardTitle>
                <CardDescription>Manage your farm details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {farms.map((farm, index) => (
                  <div key={farm.id} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-lg">{farm.name}</h4>
                      {farms.length > 1 && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-danger hover:text-danger"
                          onClick={() => setFarms(farms.filter(f => f.id !== farm.id))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>खेत का नाम / Farm Name</Label>
                        <Input 
                          value={farm.name}
                          onChange={(e) => {
                            const updated = farms.map(f => f.id === farm.id ? { ...f, name: e.target.value } : f);
                            setFarms(updated);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>खेत का आकार / Farm Size</Label>
                        <div className="flex gap-2">
                          <Input 
                            type="number" 
                            placeholder="Size"
                            value={farm.size}
                            onChange={(e) => {
                              const updated = farms.map(f => f.id === farm.id ? { ...f, size: e.target.value } : f);
                              setFarms(updated);
                            }}
                          />
                          <Select 
                            value={farm.unit}
                            onValueChange={(value) => {
                              const updated = farms.map(f => f.id === farm.id ? { ...f, unit: value } : f);
                              setFarms(updated);
                            }}
                          >
                            <SelectTrigger className="w-28">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-card">
                              <SelectItem value="acres">Acres</SelectItem>
                              <SelectItem value="hectares">Hectares</SelectItem>
                              <SelectItem value="bigha">Bigha</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>मिट्टी का प्रकार / Soil Type</Label>
                        <Select 
                          value={farm.soilType}
                          onValueChange={(value) => {
                            const updated = farms.map(f => f.id === farm.id ? { ...f, soilType: value } : f);
                            setFarms(updated);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select soil type" />
                          </SelectTrigger>
                          <SelectContent className="bg-card">
                            <SelectItem value="clay">Clay / चिकनी मिट्टी</SelectItem>
                            <SelectItem value="sandy">Sandy / रेतीली</SelectItem>
                            <SelectItem value="loamy">Loamy / दोमट</SelectItem>
                            <SelectItem value="silt">Silt / गाद</SelectItem>
                            <SelectItem value="black">Black / काली मिट्टी</SelectItem>
                            <SelectItem value="red">Red / लाल मिट्टी</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>वर्तमान फसलें / Current Crops</Label>
                        <Input 
                          placeholder="e.g., Wheat, Rice, Cotton"
                          value={farm.crops}
                          onChange={(e) => {
                            const updated = farms.map(f => f.id === farm.id ? { ...f, crops: e.target.value } : f);
                            setFarms(updated);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>सिंचाई विधि / Irrigation Method</Label>
                        <Select 
                          value={farm.irrigation}
                          onValueChange={(value) => {
                            const updated = farms.map(f => f.id === farm.id ? { ...f, irrigation: value } : f);
                            setFarms(updated);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent className="bg-card">
                            <SelectItem value="drip">Drip / टपक</SelectItem>
                            <SelectItem value="sprinkler">Sprinkler / छिड़काव</SelectItem>
                            <SelectItem value="flood">Flood / बाढ़</SelectItem>
                            <SelectItem value="canal">Canal / नहर</SelectItem>
                            <SelectItem value="rainfed">Rainfed / वर्षा आधारित</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>खेती का प्रकार / Farming Type</Label>
                        <Select 
                          value={farm.farmingType}
                          onValueChange={(value) => {
                            const updated = farms.map(f => f.id === farm.id ? { ...f, farmingType: value } : f);
                            setFarms(updated);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-card">
                            <SelectItem value="organic">Organic / जैविक</SelectItem>
                            <SelectItem value="conventional">Conventional / पारंपरिक</SelectItem>
                            <SelectItem value="mixed">Mixed / मिश्रित</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button onClick={addNewFarm} variant="outline" className="w-full">
                  + Add Another Farm / और खेत जोड़ें
                </Button>
                
                <Button onClick={() => {
                  localStorage.setItem("fasalGuru_farms", JSON.stringify(farms));
                  toast({ title: "खेत की जानकारी सहेजी गई!", description: "Farm details saved!" });
                }} className="mt-4">
                  <Save className="h-4 w-4 mr-2" />
                  Save Farm Details
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5 text-primary" />
                  प्राथमिकताएं / Preferences
                </CardTitle>
                <CardDescription>Customize your app experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>इकाइयाँ / Units</Label>
                    <Select value={preferences.units} onValueChange={(value) => setPreferences({ ...preferences, units: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card">
                        <SelectItem value="metric">Metric (km, kg)</SelectItem>
                        <SelectItem value="imperial">Imperial (mi, lb)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>मुद्रा / Currency</Label>
                    <Select value={preferences.currency} onValueChange={(value) => setPreferences({ ...preferences, currency: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card">
                        <SelectItem value="INR">₹ INR (Indian Rupee)</SelectItem>
                        <SelectItem value="USD">$ USD (US Dollar)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>तापमान / Temperature</Label>
                    <Select value={preferences.temperature} onValueChange={(value) => setPreferences({ ...preferences, temperature: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card">
                        <SelectItem value="celsius">Celsius (°C)</SelectItem>
                        <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>दिनांक प्रारूप / Date Format</Label>
                    <Select value={preferences.dateFormat} onValueChange={(value) => setPreferences({ ...preferences, dateFormat: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card">
                        <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between py-4 border-t">
                  <div>
                    <p className="font-medium">डार्क मोड / Dark Mode</p>
                    <p className="text-sm text-muted-foreground">Switch to dark theme</p>
                  </div>
                  <Switch 
                    checked={preferences.darkMode}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, darkMode: checked })}
                  />
                </div>

                <Button onClick={() => {
                  localStorage.setItem("fasalGuru_preferences", JSON.stringify(preferences));
                  toast({ title: "प्राथमिकताएं सहेजी गईं!", description: "Preferences saved!" });
                }}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy & Security */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  गोपनीयता और सुरक्षा / Privacy & Security
                </CardTitle>
                <CardDescription>Manage your security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>पासवर्ड बदलें / Change Password</Label>
                    <div className="flex gap-2">
                      <Input type="password" placeholder="Current password" />
                      <Input type="password" placeholder="New password" />
                      <Button variant="outline">Update</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-4 border-t">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                    </div>
                    <Switch 
                      checked={security.twoFactor}
                      onCheckedChange={(checked) => setSecurty({ ...security, twoFactor: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between py-4 border-t">
                    <div>
                      <p className="font-medium">Data Sharing</p>
                      <p className="text-sm text-muted-foreground">Allow anonymous data sharing for improving services</p>
                    </div>
                    <Switch 
                      checked={security.dataSharing}
                      onCheckedChange={(checked) => setSecurty({ ...security, dataSharing: checked })}
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Account / खाता हटाएं
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-card">
                        <DialogHeader>
                          <DialogTitle>क्या आप सुनिश्चित हैं? / Are you sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete your account and all associated data.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                          <Button variant="destructive" onClick={handleDeleteAccount}>Delete Account</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* App Information */}
          <TabsContent value="app-info" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  ऐप जानकारी / App Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-muted-foreground">App Version</span>
                  <span className="font-medium">1.0.0</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-muted-foreground">Build Number</span>
                  <span className="font-medium">2024.12.001</span>
                </div>
                <div className="space-y-2 pt-4">
                  <Link to="/terms" className="block py-2 text-primary hover:underline">Terms & Conditions / नियम और शर्तें</Link>
                  <Link to="/privacy" className="block py-2 text-primary hover:underline">Privacy Policy / गोपनीयता नीति</Link>
                  <Link to="/licenses" className="block py-2 text-primary hover:underline">Licenses & Attributions / लाइसेंस</Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Management */}
          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  डेटा प्रबंधन / Data Management
                </CardTitle>
                <CardDescription>Manage your data and storage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-3">मेरा डेटा निर्यात करें / Export My Data</p>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => handleExportData("CSV")}>
                        <Download className="h-4 w-4 mr-2" />
                        Export as CSV
                      </Button>
                      <Button variant="outline" onClick={() => handleExportData("PDF")}>
                        <Download className="h-4 w-4 mr-2" />
                        Export as PDF
                      </Button>
                    </div>
                  </div>

                  <div className="py-4 border-t">
                    <p className="font-medium mb-2">स्टोरेज उपयोग / Storage Usage</p>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Used Space</span>
                        <span>24.5 MB / 100 MB</span>
                      </div>
                      <div className="w-full bg-muted-foreground/20 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "24.5%" }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Dialog open={clearDataDialogOpen} onOpenChange={setClearDataDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="text-warning border-warning hover:bg-warning/10">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Clear Cache / कैश साफ़ करें
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-card">
                        <DialogHeader>
                          <DialogTitle>कैश साफ़ करें? / Clear Cache?</DialogTitle>
                          <DialogDescription>
                            This will clear all cached data. You may need to re-enter some information.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setClearDataDialogOpen(false)}>Cancel</Button>
                          <Button onClick={handleClearCache}>Clear Cache</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support & Feedback */}
          <TabsContent value="support" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  सहायता और प्रतिक्रिया / Support & Feedback
                </CardTitle>
                <CardDescription>Get help and share your feedback</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Button variant="outline" className="justify-start h-auto py-4">
                    <Star className="h-5 w-5 mr-3 text-warning" />
                    <div className="text-left">
                      <p className="font-medium">Rate the App</p>
                      <p className="text-sm text-muted-foreground">Share your experience</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-4">
                    <Bug className="h-5 w-5 mr-3 text-danger" />
                    <div className="text-left">
                      <p className="font-medium">Report a Bug</p>
                      <p className="text-sm text-muted-foreground">Help us fix issues</p>
                    </div>
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <p className="font-medium mb-4">प्रतिक्रिया भेजें / Send Feedback</p>
                  <div className="space-y-4">
                    <Select value={feedback.type} onValueChange={(value) => setFeedback({ ...feedback, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select feedback type" />
                      </SelectTrigger>
                      <SelectContent className="bg-card">
                        <SelectItem value="feedback">General Feedback</SelectItem>
                        <SelectItem value="suggestion">Feature Suggestion</SelectItem>
                        <SelectItem value="complaint">Complaint</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <Textarea 
                      placeholder="Write your message here... / अपना संदेश यहाँ लिखें..."
                      value={feedback.message}
                      onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                      rows={4}
                    />
                    <Button onClick={handleSubmitFeedback} disabled={isLoading}>
                      <Send className="h-4 w-4 mr-2" />
                      {isLoading ? "Sending..." : "Submit Feedback"}
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="font-medium mb-4">संपर्क सहायता / Contact Support</p>
                  <div className="bg-primary/5 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <a href="mailto:support@fasalguru.com" className="text-primary hover:underline">support@fasalguru.com</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <a href="tel:9569393106" className="text-primary hover:underline">+91 9569393106</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">Mon-Sat, 9 AM - 6 PM IST</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
