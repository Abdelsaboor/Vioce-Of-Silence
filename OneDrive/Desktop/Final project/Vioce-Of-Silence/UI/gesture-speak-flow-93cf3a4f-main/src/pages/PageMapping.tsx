import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Home, 
  Mic, 
  History, 
  Settings, 
  User, 
  Bluetooth, 
  Brain, 
  Volume2, 
  BookOpen, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  Wifi,
  Battery,
  Signal,
  ChevronRight,
  ChevronLeft,
  Plus,
  Search,
  Play,
  Pause,
  RefreshCw,
  Download,
  Upload,
  Edit,
  Trash2,
  Check,
  X,
  AlertTriangle,
  Info,
  Zap,
  Globe,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Heart,
  Star,
  MessageSquare,
  Share2,
  Camera,
  Image,
  FileText,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Award,
  Target,
  TrendingUp,
  BarChart2,
  PieChart,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface MobileScreen {
  id: string;
  name: string;
  icon: React.ElementType;
  category: string;
  description: string;
  userRole: string;
  dependency: string;
  elements: {
    type: "header" | "button" | "card" | "list" | "input" | "toggle" | "icon-grid" | "status" | "progress" | "avatar";
    label?: string;
    icon?: React.ElementType;
    variant?: "primary" | "secondary" | "success" | "error" | "warning";
    items?: { label: string; icon: React.ElementType }[];
  }[];
}

const screens: MobileScreen[] = [
  {
    id: "splash",
    name: "Splash Screen",
    icon: Home,
    category: "Onboarding",
    description: "App launch screen with branding",
    userRole: "All Users",
    dependency: "None",
    elements: [
      { type: "card", label: "🤟 Voice of Silence" },
      { type: "progress", label: "Loading..." },
      { type: "button", label: "v2.0.1", variant: "secondary" },
    ],
  },
  {
    id: "onboarding-1",
    name: "Welcome",
    icon: BookOpen,
    category: "Onboarding",
    description: "First onboarding step - introduction",
    userRole: "New Users",
    dependency: "None",
    elements: [
      { type: "card", label: "Welcome to Voice of Silence" },
      { type: "card", label: "Transform gestures into speech" },
      { type: "button", label: "Get Started", icon: ChevronRight, variant: "primary" },
      { type: "button", label: "Skip", variant: "secondary" },
    ],
  },
  {
    id: "onboarding-2",
    name: "Features Tour",
    icon: Zap,
    category: "Onboarding",
    description: "Showcase app features",
    userRole: "New Users",
    dependency: "None",
    elements: [
      { type: "header", label: "Key Features" },
      { type: "list", items: [
        { label: "Real-time Translation", icon: Mic },
        { label: "AI-Powered Recognition", icon: Brain },
        { label: "Text-to-Speech", icon: Volume2 },
      ]},
      { type: "button", label: "Next", icon: ChevronRight, variant: "primary" },
    ],
  },
  {
    id: "onboarding-3",
    name: "Permissions",
    icon: Shield,
    category: "Onboarding",
    description: "Request necessary permissions",
    userRole: "New Users",
    dependency: "None",
    elements: [
      { type: "header", label: "Permissions Needed" },
      { type: "list", items: [
        { label: "Bluetooth Access", icon: Bluetooth },
        { label: "Microphone Access", icon: Mic },
        { label: "Notifications", icon: Bell },
      ]},
      { type: "button", label: "Grant Access", icon: Check, variant: "primary" },
    ],
  },
  {
    id: "login",
    name: "Login",
    icon: User,
    category: "Authentication",
    description: "User sign in screen",
    userRole: "Returning Users",
    dependency: "Backend",
    elements: [
      { type: "header", label: "Sign In" },
      { type: "input", label: "Email", icon: Mail },
      { type: "input", label: "Password", icon: Lock },
      { type: "button", label: "Login", icon: ChevronRight, variant: "primary" },
      { type: "button", label: "Forgot Password?", variant: "secondary" },
      { type: "button", label: "Sign up", variant: "secondary" },
    ],
  },
  {
    id: "register",
    name: "Register",
    icon: Plus,
    category: "Authentication",
    description: "New user registration",
    userRole: "New Users",
    dependency: "Backend",
    elements: [
      { type: "header", label: "Create Account" },
      { type: "input", label: "Full Name", icon: User },
      { type: "input", label: "Email", icon: Mail },
      { type: "input", label: "Password", icon: Lock },
      { type: "input", label: "Confirm Password", icon: Lock },
      { type: "button", label: "Sign Up", icon: ChevronRight, variant: "primary" },
    ],
  },
  {
    id: "forgot-password",
    name: "Forgot Password",
    icon: HelpCircle,
    category: "Authentication",
    description: "Password recovery flow",
    userRole: "All Users",
    dependency: "Backend",
    elements: [
      { type: "header", label: "Reset Password" },
      { type: "card", label: "Enter your email to reset" },
      { type: "input", label: "Email", icon: Mail },
      { type: "button", label: "Send Reset Link", icon: Mail, variant: "primary" },
      { type: "button", label: "Back to Login", variant: "secondary" },
    ],
  },
  {
    id: "home",
    name: "Home Dashboard",
    icon: Home,
    category: "Main",
    description: "Main dashboard with quick actions",
    userRole: "Primary User",
    dependency: "Hardware + ML",
    elements: [
      { type: "header", label: "Dashboard" },
      { type: "status", label: "Device Connected", variant: "success" },
      { type: "card", label: "Today: 24 translations" },
      { type: "button", label: "Start Translation", icon: Mic, variant: "primary" },
      { type: "list", items: [
        { label: "Recent Phrases", icon: History },
        { label: "Quick Actions", icon: Zap },
      ]},
    ],
  },
  {
    id: "translate-idle",
    name: "Translate - Idle",
    icon: Mic,
    category: "Translation",
    description: "Translation screen waiting for input",
    userRole: "Primary User",
    dependency: "Hardware",
    elements: [
      { type: "header", label: "Translation" },
      { type: "status", label: "Ready", variant: "success" },
      { type: "card", label: "Waiting for gestures..." },
      { type: "button", label: "Start", icon: Play, variant: "primary" },
      { type: "toggle", label: "Auto-speak" },
    ],
  },
  {
    id: "translate-active",
    name: "Translate - Active",
    icon: Activity,
    category: "Translation",
    description: "Active translation in progress",
    userRole: "Primary User",
    dependency: "Hardware + ML",
    elements: [
      { type: "header", label: "Translating..." },
      { type: "status", label: "Listening", variant: "warning" },
      { type: "progress", label: "Confidence: 87%" },
      { type: "card", label: "\"Hello, how are you?\"" },
      { type: "button", label: "Stop", icon: Pause, variant: "error" },
    ],
  },
  {
    id: "translate-result",
    name: "Translate - Result",
    icon: Check,
    category: "Translation",
    description: "Translation result display",
    userRole: "Primary User",
    dependency: "ML + TTS",
    elements: [
      { type: "header", label: "Result" },
      { type: "status", label: "Complete", variant: "success" },
      { type: "card", label: "\"Hello, how are you today?\"" },
      { type: "button", label: "Speak", icon: Volume2, variant: "primary" },
      { type: "button", label: "Save", icon: Heart, variant: "secondary" },
      { type: "button", label: "New Translation", icon: RefreshCw, variant: "secondary" },
    ],
  },
  {
    id: "translate-error",
    name: "Translate - Error",
    icon: AlertTriangle,
    category: "Translation",
    description: "Translation error state",
    userRole: "Primary User",
    dependency: "Hardware",
    elements: [
      { type: "header", label: "Error" },
      { type: "status", label: "Failed", variant: "error" },
      { type: "card", label: "Gesture not recognized" },
      { type: "button", label: "Try Again", icon: RefreshCw, variant: "primary" },
      { type: "button", label: "Report Issue", icon: MessageSquare, variant: "secondary" },
    ],
  },
  {
    id: "training-home",
    name: "Training Hub",
    icon: Brain,
    category: "Training",
    description: "Training mode main screen",
    userRole: "Trainer",
    dependency: "ML",
    elements: [
      { type: "header", label: "Training Mode" },
      { type: "icon-grid", items: [
        { label: "Gestures", icon: BookOpen },
        { label: "Custom", icon: Plus },
        { label: "Practice", icon: Target },
        { label: "Progress", icon: TrendingUp },
      ]},
      { type: "button", label: "Start Training", icon: Play, variant: "primary" },
    ],
  },
  {
    id: "gesture-library",
    name: "Gesture Library",
    icon: BookOpen,
    category: "Training",
    description: "Browse available gestures",
    userRole: "Trainer",
    dependency: "ML",
    elements: [
      { type: "header", label: "Gesture Library" },
      { type: "input", label: "Search gestures...", icon: Search },
      { type: "list", items: [
        { label: "Basic Greetings (12)", icon: BookOpen },
        { label: "Numbers (10)", icon: BookOpen },
        { label: "Common Phrases (25)", icon: BookOpen },
        { label: "Custom (5)", icon: Star },
      ]},
    ],
  },
  {
    id: "custom-gesture",
    name: "Custom Gesture",
    icon: Plus,
    category: "Training",
    description: "Create custom gestures",
    userRole: "Trainer",
    dependency: "Hardware + ML",
    elements: [
      { type: "header", label: "New Gesture" },
      { type: "input", label: "Gesture name", icon: Edit },
      { type: "input", label: "Output phrase", icon: MessageSquare },
      { type: "button", label: "Record Gesture", icon: Camera, variant: "primary" },
      { type: "card", label: "Record 3 samples for accuracy" },
    ],
  },
  {
    id: "practice-mode",
    name: "Practice Mode",
    icon: Target,
    category: "Training",
    description: "Practice gestures with feedback",
    userRole: "Primary User",
    dependency: "Hardware + ML",
    elements: [
      { type: "header", label: "Practice" },
      { type: "card", label: "Show: \"Thank you\"" },
      { type: "progress", label: "Attempt 2/5" },
      { type: "status", label: "Good!", variant: "success" },
      { type: "button", label: "Next", icon: ChevronRight, variant: "primary" },
    ],
  },
  {
    id: "progress-stats",
    name: "Progress Stats",
    icon: BarChart2,
    category: "Training",
    description: "Training progress and statistics",
    userRole: "Trainer",
    dependency: "Backend",
    elements: [
      { type: "header", label: "Your Progress" },
      { type: "card", label: "Accuracy: 92%" },
      { type: "progress", label: "47/52 gestures learned" },
      { type: "list", items: [
        { label: "This Week: +5 gestures", icon: TrendingUp },
        { label: "Streak: 7 days", icon: Zap },
      ]},
    ],
  },
  {
    id: "history-list",
    name: "History",
    icon: History,
    category: "History",
    description: "Translation history list",
    userRole: "Primary User",
    dependency: "Backend",
    elements: [
      { type: "header", label: "History" },
      { type: "input", label: "Search...", icon: Search },
      { type: "list", items: [
        { label: "Today (12)", icon: Clock },
        { label: "Yesterday (8)", icon: Clock },
        { label: "This Week (45)", icon: Calendar },
      ]},
      { type: "button", label: "Export", icon: Download, variant: "secondary" },
    ],
  },
  {
    id: "history-detail",
    name: "History Detail",
    icon: FileText,
    category: "History",
    description: "Single translation detail",
    userRole: "Primary User",
    dependency: "Backend",
    elements: [
      { type: "header", label: "Translation Detail" },
      { type: "card", label: "\"Good morning everyone\"" },
      { type: "card", label: "Dec 12, 2025 - 9:41 AM" },
      { type: "button", label: "Play Audio", icon: Volume2, variant: "primary" },
      { type: "button", label: "Share", icon: Share2, variant: "secondary" },
      { type: "button", label: "Delete", icon: Trash2, variant: "error" },
    ],
  },
  {
    id: "saved-phrases",
    name: "Saved Phrases",
    icon: Heart,
    category: "History",
    description: "Favorite/saved translations",
    userRole: "Primary User",
    dependency: "Backend",
    elements: [
      { type: "header", label: "Saved Phrases" },
      { type: "list", items: [
        { label: "\"Hello, how are you?\"", icon: Heart },
        { label: "\"Thank you very much\"", icon: Heart },
        { label: "\"Nice to meet you\"", icon: Heart },
        { label: "\"Goodbye, see you later\"", icon: Heart },
      ]},
    ],
  },
  {
    id: "settings-main",
    name: "Settings",
    icon: Settings,
    category: "Settings",
    description: "Main settings screen",
    userRole: "All Users",
    dependency: "None",
    elements: [
      { type: "header", label: "Settings" },
      { type: "list", items: [
        { label: "Device Settings", icon: Bluetooth },
        { label: "Voice Settings", icon: Volume2 },
        { label: "Notifications", icon: Bell },
        { label: "Accessibility", icon: Eye },
        { label: "Privacy & Security", icon: Shield },
        { label: "Language", icon: Globe },
      ]},
    ],
  },
  {
    id: "device-settings",
    name: "Device Settings",
    icon: Bluetooth,
    category: "Settings",
    description: "Smart glove configuration",
    userRole: "Primary User",
    dependency: "Hardware",
    elements: [
      { type: "header", label: "Device Settings" },
      { type: "status", label: "Connected", variant: "success" },
      { type: "card", label: "Smart Glove v2.0" },
      { type: "toggle", label: "Auto-connect" },
      { type: "button", label: "Calibrate", icon: RefreshCw, variant: "primary" },
      { type: "button", label: "Disconnect", icon: X, variant: "error" },
    ],
  },
  {
    id: "device-pairing",
    name: "Device Pairing",
    icon: Bluetooth,
    category: "Settings",
    description: "Pair new device",
    userRole: "Primary User",
    dependency: "Hardware",
    elements: [
      { type: "header", label: "Pair Device" },
      { type: "progress", label: "Scanning..." },
      { type: "list", items: [
        { label: "Smart Glove v2.0", icon: Bluetooth },
        { label: "Smart Glove v1.5", icon: Bluetooth },
      ]},
      { type: "button", label: "Scan Again", icon: RefreshCw, variant: "secondary" },
    ],
  },
  {
    id: "voice-settings",
    name: "Voice Settings",
    icon: Volume2,
    category: "Settings",
    description: "TTS configuration",
    userRole: "All Users",
    dependency: "TTS",
    elements: [
      { type: "header", label: "Voice Settings" },
      { type: "toggle", label: "Text-to-Speech" },
      { type: "list", items: [
        { label: "Voice: English (US)", icon: Volume2 },
        { label: "Speed: Normal", icon: Activity },
        { label: "Pitch: Medium", icon: BarChart2 },
      ]},
      { type: "button", label: "Test Voice", icon: Play, variant: "primary" },
    ],
  },
  {
    id: "notifications",
    name: "Notifications",
    icon: Bell,
    category: "Settings",
    description: "Notification preferences",
    userRole: "All Users",
    dependency: "Backend",
    elements: [
      { type: "header", label: "Notifications" },
      { type: "toggle", label: "Push Notifications" },
      { type: "toggle", label: "Training Reminders" },
      { type: "toggle", label: "Device Alerts" },
      { type: "toggle", label: "App Updates" },
    ],
  },
  {
    id: "accessibility",
    name: "Accessibility",
    icon: Eye,
    category: "Settings",
    description: "Accessibility options",
    userRole: "All Users",
    dependency: "None",
    elements: [
      { type: "header", label: "Accessibility" },
      { type: "toggle", label: "High Contrast" },
      { type: "toggle", label: "Large Text" },
      { type: "toggle", label: "Screen Reader" },
      { type: "toggle", label: "Haptic Feedback" },
      { type: "toggle", label: "Reduce Motion" },
    ],
  },
  {
    id: "privacy",
    name: "Privacy & Security",
    icon: Shield,
    category: "Settings",
    description: "Privacy settings",
    userRole: "All Users",
    dependency: "Backend",
    elements: [
      { type: "header", label: "Privacy" },
      { type: "toggle", label: "Save History" },
      { type: "toggle", label: "Analytics" },
      { type: "list", items: [
        { label: "Change Password", icon: Lock },
        { label: "Two-Factor Auth", icon: Shield },
        { label: "Delete Account", icon: Trash2 },
      ]},
    ],
  },
  {
    id: "profile-main",
    name: "Profile",
    icon: User,
    category: "Profile",
    description: "User profile screen",
    userRole: "All Users",
    dependency: "Backend",
    elements: [
      { type: "avatar", label: "John Doe" },
      { type: "card", label: "john.doe@email.com" },
      { type: "list", items: [
        { label: "Edit Profile", icon: Edit },
        { label: "Subscription", icon: Award },
        { label: "Achievements", icon: Star },
        { label: "Help & Support", icon: HelpCircle },
      ]},
    ],
  },
  {
    id: "edit-profile",
    name: "Edit Profile",
    icon: Edit,
    category: "Profile",
    description: "Edit user information",
    userRole: "All Users",
    dependency: "Backend",
    elements: [
      { type: "header", label: "Edit Profile" },
      { type: "avatar", label: "Change Photo" },
      { type: "input", label: "Full Name", icon: User },
      { type: "input", label: "Email", icon: Mail },
      { type: "input", label: "Phone", icon: Phone },
      { type: "button", label: "Save Changes", icon: Check, variant: "primary" },
    ],
  },
  {
    id: "subscription",
    name: "Subscription",
    icon: Award,
    category: "Profile",
    description: "Subscription management",
    userRole: "All Users",
    dependency: "Backend",
    elements: [
      { type: "header", label: "Subscription" },
      { type: "status", label: "Pro Plan", variant: "success" },
      { type: "card", label: "Renews: Jan 12, 2026" },
      { type: "list", items: [
        { label: "Unlimited translations", icon: Check },
        { label: "Custom gestures", icon: Check },
        { label: "Priority support", icon: Check },
      ]},
      { type: "button", label: "Manage Plan", icon: Settings, variant: "secondary" },
    ],
  },
  {
    id: "achievements",
    name: "Achievements",
    icon: Star,
    category: "Profile",
    description: "User achievements and badges",
    userRole: "All Users",
    dependency: "Backend",
    elements: [
      { type: "header", label: "Achievements" },
      { type: "card", label: "12 / 25 Unlocked" },
      { type: "icon-grid", items: [
        { label: "First Word", icon: Star },
        { label: "100 Trans", icon: Award },
        { label: "7 Day Streak", icon: Zap },
        { label: "Customizer", icon: Plus },
      ]},
    ],
  },
  {
    id: "help",
    name: "Help & Support",
    icon: HelpCircle,
    category: "Profile",
    description: "Help center and support",
    userRole: "All Users",
    dependency: "Backend",
    elements: [
      { type: "header", label: "Help & Support" },
      { type: "input", label: "Search help...", icon: Search },
      { type: "list", items: [
        { label: "Getting Started", icon: BookOpen },
        { label: "FAQs", icon: HelpCircle },
        { label: "Contact Support", icon: MessageSquare },
        { label: "Report a Bug", icon: AlertTriangle },
      ]},
    ],
  },
  {
    id: "logout",
    name: "Logout",
    icon: LogOut,
    category: "Profile",
    description: "Logout confirmation",
    userRole: "All Users",
    dependency: "Backend",
    elements: [
      { type: "header", label: "Logout" },
      { type: "card", label: "Are you sure you want to logout?" },
      { type: "button", label: "Logout", icon: LogOut, variant: "error" },
      { type: "button", label: "Cancel", variant: "secondary" },
    ],
  },
];

const categories = ["All", "Onboarding", "Authentication", "Main", "Translation", "Training", "History", "Settings", "Profile"];

const PageMapping = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredScreens = activeCategory === "All" 
    ? screens 
    : screens.filter(s => s.category === activeCategory);

  const currentScreen = filteredScreens[currentIndex] || filteredScreens[0];

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredScreens.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredScreens.length) % filteredScreens.length);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  // Reset index when category changes
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentIndex(0);
  };

  const getVariantColor = (variant?: string) => {
    switch (variant) {
      case "success": return "bg-success text-success-foreground";
      case "error": return "bg-destructive text-destructive-foreground";
      case "warning": return "bg-accent text-accent-foreground";
      case "primary": return "bg-secondary text-secondary-foreground";
      case "secondary": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Page Mapping</h1>
            <p className="text-sm text-primary-foreground/70">{filteredScreens.length} screens • Swipe to navigate</p>
          </div>
          <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground">
            {currentIndex + 1} / {filteredScreens.length}
          </Badge>
        </div>
      </header>

      {/* Category Filter */}
      <div className="bg-card border-b border-border sticky top-[72px] z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(cat)}
                className={activeCategory === cat ? "bg-secondary text-secondary-foreground shrink-0" : "shrink-0"}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Carousel */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {/* Prev Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={goPrev}
            className="shrink-0 h-12 w-12 rounded-full border-2"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          {/* Mobile Frame - Large */}
          <div className="relative">
            <div className="rounded-[2.5rem] border-8 border-primary bg-card overflow-hidden shadow-2xl w-[280px] sm:w-[320px]">
              {/* Status Bar */}
              <div className="bg-primary/10 px-4 py-2 flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">9:41</span>
                <div className="flex items-center gap-2">
                  <Signal className="w-3.5 h-3.5 text-foreground" />
                  <Wifi className="w-3.5 h-3.5 text-foreground" />
                  <Battery className="w-4 h-4 text-foreground" />
                </div>
              </div>

              {/* Screen Content */}
              <div className="min-h-[480px] sm:min-h-[540px] p-4 flex flex-col gap-3 bg-background">
                {currentScreen.elements.map((el, idx) => (
                  <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                    {el.type === "header" && (
                      <div className="bg-primary rounded-xl px-4 py-3 mb-2">
                        <p className="text-sm font-bold text-primary-foreground">{el.label}</p>
                      </div>
                    )}
                    {el.type === "card" && (
                      <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-sm">
                        <p className="text-sm text-foreground">{el.label}</p>
                      </div>
                    )}
                    {el.type === "button" && (
                      <div className={`rounded-xl px-4 py-3 flex items-center justify-center gap-2 ${getVariantColor(el.variant)}`}>
                        {el.icon && <el.icon className="w-4 h-4" />}
                        <p className="text-sm font-medium">{el.label}</p>
                      </div>
                    )}
                    {el.type === "input" && (
                      <div className="border-2 border-border rounded-xl px-4 py-3 flex items-center gap-3 bg-muted/30">
                        {el.icon && <el.icon className="w-4 h-4 text-muted-foreground" />}
                        <p className="text-sm text-muted-foreground">{el.label}</p>
                      </div>
                    )}
                    {el.type === "toggle" && (
                      <div className="flex items-center justify-between px-4 py-3 bg-card border border-border rounded-xl">
                        <p className="text-sm text-foreground">{el.label}</p>
                        <div className="w-10 h-6 bg-secondary rounded-full relative">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-secondary-foreground rounded-full"></div>
                        </div>
                      </div>
                    )}
                    {el.type === "status" && (
                      <div className={`rounded-xl px-4 py-2 flex items-center gap-2 ${getVariantColor(el.variant)}`}>
                        <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                        <p className="text-xs font-medium">{el.label}</p>
                      </div>
                    )}
                    {el.type === "progress" && (
                      <div className="bg-card border border-border rounded-xl px-4 py-3">
                        <p className="text-xs text-muted-foreground mb-2">{el.label}</p>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full w-3/4 bg-secondary rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    )}
                    {el.type === "avatar" && (
                      <div className="flex flex-col items-center gap-2 py-4">
                        <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center">
                          <User className="w-10 h-10 text-secondary" />
                        </div>
                        <p className="text-sm font-medium text-foreground">{el.label}</p>
                      </div>
                    )}
                    {el.type === "list" && el.items && (
                      <div className="space-y-2">
                        {el.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-xl">
                            <item.icon className="w-5 h-5 text-secondary" />
                            <p className="text-sm text-foreground flex-1">{item.label}</p>
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                    )}
                    {el.type === "icon-grid" && el.items && (
                      <div className="grid grid-cols-2 gap-3">
                        {el.items.map((item, i) => (
                          <div key={i} className="flex flex-col items-center gap-2 p-4 bg-card border border-border rounded-xl">
                            <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                              <item.icon className="w-5 h-5 text-secondary" />
                            </div>
                            <p className="text-xs font-medium text-foreground">{item.label}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Home Indicator */}
              <div className="bg-background flex justify-center py-3">
                <div className="w-32 h-1 bg-primary/30 rounded-full"></div>
              </div>
            </div>

            {/* Screen Label Below */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-3 bg-card border border-border rounded-full px-4 py-2 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <currentScreen.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">{currentScreen.name}</p>
                  <p className="text-xs text-muted-foreground">{currentScreen.category}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={goNext}
            className="shrink-0 h-12 w-12 rounded-full border-2"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Screen Info Card */}
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground">{currentScreen.name}</h3>
                <p className="text-sm text-muted-foreground">{currentScreen.description}</p>
              </div>
              <Badge className="bg-primary/10 text-primary">{currentScreen.category}</Badge>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs">
                <User className="w-3 h-3 mr-1" />
                {currentScreen.userRole}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Zap className="w-3 h-3 mr-1" />
                {currentScreen.dependency}
              </Badge>
            </div>
          </div>
        </div>

        {/* Dot Navigation */}
        <div className="flex justify-center gap-1.5 flex-wrap max-w-lg mx-auto mb-8">
          {filteredScreens.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                idx === currentIndex 
                  ? "bg-secondary w-6" 
                  : "bg-muted hover:bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
          {filteredScreens.map((screen, idx) => {
            const Icon = screen.icon;
            return (
              <button
                key={screen.id}
                onClick={() => goToIndex(idx)}
                className={`p-2 rounded-lg border-2 transition-all duration-200 ${
                  idx === currentIndex 
                    ? "border-secondary bg-secondary/10" 
                    : "border-border bg-card hover:border-secondary/50"
                }`}
              >
                <div className="w-8 h-8 mx-auto rounded-md bg-primary/10 flex items-center justify-center mb-1">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <p className="text-[9px] text-center text-foreground truncate">{screen.name}</p>
              </button>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-2xl font-bold text-primary">{screens.length}</p>
            <p className="text-xs text-muted-foreground">Total Screens</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-secondary/10 border border-secondary/20">
            <p className="text-2xl font-bold text-secondary">{categories.length - 1}</p>
            <p className="text-xs text-muted-foreground">Categories</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-accent/10 border border-accent/20">
            <p className="text-2xl font-bold text-accent-foreground">{screens.filter(s => s.category === "Main" || s.category === "Translation").length}</p>
            <p className="text-xs text-muted-foreground">Core Screens</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-success/10 border border-success/20">
            <p className="text-2xl font-bold text-success">3</p>
            <p className="text-xs text-muted-foreground">User Roles</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PageMapping;
