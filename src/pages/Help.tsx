import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "@/hooks/use-toast";
import { 
  ArrowLeft, Search, HelpCircle, BookOpen, Users, MessageSquare, Bug, Star, 
  Play, Phone, Mail, Clock, Send, Upload, ExternalLink, Sprout, Youtube, Facebook
} from "lucide-react";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [issueForm, setIssueForm] = useState({
    type: "",
    description: "",
    screenshot: null as File | null
  });
  const [feedbackForm, setFeedbackForm] = useState({
    rating: 0,
    likes: "",
    improvements: "",
    suggestions: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqs = {
    "Getting Started": [
      {
        question: "मैं खाता कैसे बनाऊं? / How do I create an account?",
        answer: "To create an account, click on the 'Sign Up' button on the home page. Enter your mobile number, verify with OTP, and complete your profile with basic details like name and location."
      },
      {
        question: "मैं अपने खेत का विवरण कैसे जोड़ूं? / How do I add my farm details?",
        answer: "Go to Settings > Farm Profile. Click 'Add Farm' and enter details like farm size, soil type, current crops, and irrigation method. You can add multiple farms."
      },
      {
        question: "मैं सूचनाएं कैसे सेट करूं? / How do I set up notifications?",
        answer: "Navigate to Settings > Account > Notification Preferences. Toggle on the notifications you want to receive - weather alerts, crop advisory, market prices, SMS, or email notifications."
      }
    ],
    "Features": [
      {
        question: "मौसम पूर्वानुमान कैसे देखें? / How to check weather forecasts?",
        answer: "Click on 'Weather' in the main navigation. You'll see current weather, hourly forecast, and 7-day predictions for your farm location. Enable location services for accurate local weather."
      },
      {
        question: "फसल-विशिष्ट सलाह कैसे प्राप्त करें? / How to get crop-specific advice?",
        answer: "Select your crop from the Dashboard or Crop Advisory section. You'll receive tailored recommendations based on your crop type, growth stage, local weather, and soil conditions."
      },
      {
        question: "बाजार भाव कैसे देखें? / How to access market prices?",
        answer: "Go to 'Market Prices' from the dashboard. You can view prices for different crops in nearby mandis. Filter by crop type, date range, and location."
      },
      {
        question: "रोग पहचान उपकरण का उपयोग कैसे करें? / How to use the disease detection tool?",
        answer: "Open 'Crop Disease' from navigation. Take a clear photo of the affected plant part. Our AI will analyze the image and provide diagnosis with treatment recommendations."
      },
      {
        question: "कृषि विशेषज्ञों से कैसे जुड़ें? / How to connect with agricultural experts?",
        answer: "Use the Voice Assistant to ask questions, or visit the Community section to connect with experts. You can also contact our support team for personalized assistance."
      }
    ],
    "Account Management": [
      {
        question: "मैं अपना प्रोफ़ाइल कैसे अपडेट करूं? / How do I update my profile?",
        answer: "Go to Settings > Account > Profile Information. Here you can edit your name, phone, email, location, and profile photo."
      },
      {
        question: "मैं अपना पासवर्ड कैसे बदलूं? / How do I change my password?",
        answer: "Navigate to Settings > Privacy & Security. Enter your current password and new password to update. Make sure to use a strong password with letters, numbers, and symbols."
      },
      {
        question: "मैं कई खेतों को कैसे प्रबंधित करूं? / How do I manage multiple farms?",
        answer: "In Settings > Farm Profile, you can add multiple farms. Each farm can have its own settings for size, crops, and irrigation. Switch between farms from the dashboard."
      },
      {
        question: "मैं अपना खाता कैसे हटाऊं? / How do I delete my account?",
        answer: "Go to Settings > Privacy & Security > Delete Account. Please note this action is irreversible and will delete all your data. Consider exporting your data first."
      }
    ],
    "Troubleshooting": [
      {
        question: "ऐप ठीक से लोड नहीं हो रहा / App not loading properly",
        answer: "Try these steps: 1) Check your internet connection, 2) Clear app cache in Settings > Data, 3) Refresh the page, 4) Try using a different browser, 5) Contact support if issue persists."
      },
      {
        question: "सूचनाएं काम नहीं कर रही / Notifications not working",
        answer: "Ensure notifications are enabled in Settings. Check your browser/device notification permissions. Make sure you're not in Do Not Disturb mode."
      },
      {
        question: "स्थान सेवाओं की समस्या / Location services issues",
        answer: "Allow location access in your browser settings. Ensure GPS is enabled on your device. You can also manually enter your location in Settings."
      },
      {
        question: "लॉगिन समस्याएं / Login problems",
        answer: "If you can't login: 1) Check your phone number/email, 2) Reset password if forgotten, 3) Try OTP login, 4) Contact support with your registered details."
      }
    ],
    "Data & Privacy": [
      {
        question: "मेरा डेटा कैसे उपयोग किया जाता है? / How is my data used?",
        answer: "Your data helps us provide personalized recommendations. We use farm data for crop advice, location for weather updates, and usage patterns to improve services. We never sell your personal data."
      },
      {
        question: "क्या मेरी जानकारी सुरक्षित है? / Is my information secure?",
        answer: "Yes! We use industry-standard encryption for all data. Your password is securely hashed, and all communications are encrypted. We regularly audit our security practices."
      },
      {
        question: "क्या मैं अपना खेती डेटा निर्यात कर सकता हूं? / Can I export my farming data?",
        answer: "Yes, go to Settings > Data Management > Export Data. You can download all your data in CSV or PDF format including farm details, crop history, and recommendations."
      }
    ]
  };

  const supportTeam = [
    { name: "Luv Agnihotri", phone: "9569393106" },
    { name: "Naman Mishra", phone: "9258450690" },
    { name: "Shivam Choubey", phone: "7050525501" },
    { name: "Devansh Agarwal", phone: "9555743172" },
    { name: "Saksham", phone: "8221983461" },
    { name: "Vedika", phone: "7355667325" }
  ];

  const tutorials = [
    { title: "Getting Started with Fasal Guru", duration: "5:30" },
    { title: "Understanding Weather Forecasts", duration: "4:15" },
    { title: "Using Crop Advisory Features", duration: "6:45" },
    { title: "Market Price Analysis", duration: "3:50" }
  ];

  const filteredFaqs = searchQuery
    ? Object.entries(faqs).reduce((acc, [category, questions]) => {
        const filtered = questions.filter(
          q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
               q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filtered.length > 0) acc[category] = filtered;
        return acc;
      }, {} as typeof faqs)
    : faqs;

  const handleSubmitIssue = async () => {
    if (!issueForm.type || !issueForm.description.trim()) {
      toast({ title: "कृपया सभी फ़ील्ड भरें", description: "Please fill all required fields", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIssueForm({ type: "", description: "", screenshot: null });
    toast({ title: "समस्या रिपोर्ट भेजी गई!", description: "Issue reported successfully! We'll look into it." });
  };

  const handleSubmitFeedback = async () => {
    if (feedbackForm.rating === 0) {
      toast({ title: "कृपया रेटिंग दें", description: "Please provide a rating", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFeedbackForm({ rating: 0, likes: "", improvements: "", suggestions: "" });
    toast({ title: "धन्यवाद!", description: "Thank you for your valuable feedback!" });
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
            <h1 className="text-2xl font-bold text-primary">सहायता केंद्र / Help Center</h1>
            <p className="text-sm text-muted-foreground">Find answers and get support</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl space-y-8">
        {/* About Section */}
        <Card className="bg-gradient-to-br from-primary/10 to-success/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/20 rounded-full">
                <Sprout className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Welcome to Fasal Guru Help Center</h2>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Fasal Guru</strong> is your intelligent farming companion designed to empower farmers with 
                  real-time weather updates, crop advisory, market prices, and expert agricultural guidance. 
                  Our mission is to make farming smarter, easier, and more profitable.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            className="pl-12 h-12 text-lg"
            placeholder="Search FAQs... / सवाल खोजें..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* FAQs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              अक्सर पूछे जाने वाले प्रश्न / FAQs
            </CardTitle>
          </CardHeader>
          <CardContent>
            {Object.entries(filteredFaqs).length > 0 ? (
              <div className="space-y-6">
                {Object.entries(filteredFaqs).map(([category, questions]) => (
                  <div key={category}>
                    <h3 className="font-semibold text-lg mb-3 text-primary">{category}</h3>
                    <Accordion type="single" collapsible className="space-y-2">
                      {questions.map((faq, index) => (
                        <AccordionItem key={index} value={`${category}-${index}`} className="border rounded-lg px-4">
                          <AccordionTrigger className="text-left hover:no-underline">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No results found for "{searchQuery}". Try different keywords.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              संपर्क सहायता / Contact Support
            </CardTitle>
            <CardDescription>
              Need personalized assistance? Our team is here to help!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-primary/5 rounded-lg p-6 mb-6">
              <h4 className="font-semibold mb-4">App Founders & Support Team:</h4>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {supportTeam.map((member) => (
                  <a
                    key={member.phone}
                    href={`tel:${member.phone}`}
                    className="flex items-center gap-3 p-3 bg-card rounded-lg border hover:border-primary transition-colors"
                  >
                    <Phone className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium text-sm">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.phone}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Support Hours</p>
                  <p className="text-sm text-muted-foreground">Mon - Sat, 9:00 AM - 6:00 PM IST</p>
                </div>
              </div>
              <a 
                href="mailto:support@fasalguru.com"
                className="flex items-center gap-3 p-4 border rounded-lg hover:border-primary transition-colors"
              >
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-muted-foreground">support@fasalguru.com</p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Video Tutorials */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-primary" />
              वीडियो ट्यूटोरियल / Video Tutorials
            </CardTitle>
            <CardDescription>Learn how to use Fasal Guru effectively</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {tutorials.map((tutorial, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer"
                >
                  <div className="p-3 bg-danger/10 rounded-lg">
                    <Play className="h-5 w-5 text-danger" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{tutorial.title}</p>
                    <p className="text-sm text-muted-foreground">{tutorial.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Community */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              समुदाय / Community
            </CardTitle>
            <CardDescription>Join our farmer community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <a 
                href="#" 
                className="flex items-center gap-3 p-4 border rounded-lg hover:border-success transition-colors"
              >
                <div className="p-2 bg-success/10 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-medium">WhatsApp Group</p>
                  <p className="text-xs text-muted-foreground">Join farmers community</p>
                </div>
                <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
              </a>
              <a 
                href="#" 
                className="flex items-center gap-3 p-4 border rounded-lg hover:border-primary transition-colors"
              >
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Facebook className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Facebook Page</p>
                  <p className="text-xs text-muted-foreground">Follow for updates</p>
                </div>
                <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
              </a>
              <a 
                href="#" 
                className="flex items-center gap-3 p-4 border rounded-lg hover:border-danger transition-colors"
              >
                <div className="p-2 bg-danger/10 rounded-lg">
                  <Youtube className="h-5 w-5 text-danger" />
                </div>
                <div>
                  <p className="font-medium">YouTube Channel</p>
                  <p className="text-xs text-muted-foreground">Watch tutorials</p>
                </div>
                <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Report Issues */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bug className="h-5 w-5 text-danger" />
              समस्या रिपोर्ट करें / Report Issues
            </CardTitle>
            <CardDescription>Help us improve by reporting problems</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>समस्या का प्रकार / Issue Type *</Label>
              <Select value={issueForm.type} onValueChange={(value) => setIssueForm({ ...issueForm, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  <SelectItem value="bug">Bug / तकनीकी समस्या</SelectItem>
                  <SelectItem value="feature">Feature Request / नई सुविधा</SelectItem>
                  <SelectItem value="content">Content Error / सामग्री त्रुटि</SelectItem>
                  <SelectItem value="other">Other / अन्य</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>विवरण / Description *</Label>
              <Textarea
                placeholder="Describe the issue in detail... / समस्या का विस्तार से वर्णन करें..."
                value={issueForm.description}
                onChange={(e) => setIssueForm({ ...issueForm, description: e.target.value })}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>स्क्रीनशॉट / Screenshot (Optional)</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
              </div>
            </div>

            <Button onClick={handleSubmitIssue} disabled={isSubmitting} className="w-full">
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? "Submitting..." : "Submit Issue / समस्या भेजें"}
            </Button>
          </CardContent>
        </Card>

        {/* Feedback */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-warning" />
              प्रतिक्रिया / Feedback
            </CardTitle>
            <CardDescription>We value your input! Help us improve Fasal Guru</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>रेटिंग / Rating *</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setFeedbackForm({ ...feedbackForm, rating: star })}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star 
                      className={`h-8 w-8 ${
                        star <= feedbackForm.rating 
                          ? "fill-warning text-warning" 
                          : "text-muted-foreground"
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>आपको सबसे ज्यादा क्या पसंद है? / What do you like most?</Label>
              <Textarea
                placeholder="Share what you love about Fasal Guru..."
                value={feedbackForm.likes}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, likes: e.target.value })}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>हम क्या सुधार कर सकते हैं? / What can we improve?</Label>
              <Textarea
                placeholder="Tell us how we can do better..."
                value={feedbackForm.improvements}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, improvements: e.target.value })}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>नई सुविधाओं का सुझाव / Suggest new features</Label>
              <Textarea
                placeholder="What features would you like to see?"
                value={feedbackForm.suggestions}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, suggestions: e.target.value })}
                rows={2}
              />
            </div>

            <Button onClick={handleSubmitFeedback} disabled={isSubmitting} className="w-full">
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? "Submitting..." : "Submit Feedback / प्रतिक्रिया भेजें"}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Help;
