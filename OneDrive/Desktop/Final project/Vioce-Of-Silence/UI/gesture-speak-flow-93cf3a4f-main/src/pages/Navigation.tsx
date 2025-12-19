import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Hand, 
  BookOpen, 
  Settings, 
  User,
  Bluetooth,
  Battery,
  Wifi,
  Volume2,
  Play,
  Pause,
  Search,
  Star,
  Clock,
  ChevronRight,
  Bell,
  Shield,
  Globe,
  Moon,
  Trash2,
  Download,
  Share2,
  Edit,
  Heart,
  RefreshCw,
  Check,
  AlertTriangle,
  ArrowLeft
} from "lucide-react";

const navigationTabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "translate", label: "Translate", icon: Hand },
  { id: "history", label: "History", icon: BookOpen },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "profile", label: "Profile", icon: User },
];

export default function Navigation() {
  const [activeTab, setActiveTab] = useState("home");
  const [isTranslating, setIsTranslating] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [speechRate, setSpeechRate] = useState([50]);

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to UX Structure
        </Link>
        <h1 className="text-2xl font-bold text-foreground">App Navigation UI</h1>
        <p className="text-muted-foreground mt-1">Interactive mobile screens with full UI elements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Mobile Phone Frame */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Live Preview</h3>
            <div className="bg-foreground rounded-[3rem] p-3 max-w-[320px] mx-auto shadow-2xl">
              <div className="bg-background rounded-[2.5rem] overflow-hidden">
                {/* Status Bar */}
                <div className="bg-primary px-4 py-2 flex justify-between items-center text-primary-foreground text-xs">
                  <span>9:41</span>
                  <div className="flex items-center gap-2">
                    <Wifi className="w-3 h-3" />
                    <Bluetooth className="w-3 h-3 text-secondary" />
                    <Battery className="w-4 h-3" />
                  </div>
                </div>

                {/* Screen Content */}
                <div className="h-[500px] overflow-y-auto">
                  {activeTab === "home" && <HomeScreen />}
                  {activeTab === "translate" && <TranslateScreen isTranslating={isTranslating} setIsTranslating={setIsTranslating} />}
                  {activeTab === "history" && <HistoryScreen />}
                  {activeTab === "settings" && <SettingsScreen volume={volume} setVolume={setVolume} speechRate={speechRate} setSpeechRate={setSpeechRate} />}
                  {activeTab === "profile" && <ProfileScreen />}
                </div>

                {/* Bottom Navigation */}
                <div className="bg-primary p-2 flex justify-around">
                  {navigationTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                          "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all",
                          isActive 
                            ? "bg-secondary text-secondary-foreground" 
                            : "text-primary-foreground/70 hover:text-primary-foreground"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-[10px]">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Screen Details */}
        <div className="lg:col-span-2">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Screen: <span className="text-secondary capitalize">{activeTab}</span>
          </h3>
          
          {/* UI Components Reference */}
          <div className="space-y-6">
            {/* Button States */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h4 className="font-semibold text-foreground mb-4">Button States</h4>
              <div className="flex flex-wrap gap-3">
                <Button>Primary Action</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="ghost">Ghost</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h4 className="font-semibold text-foreground mb-4">Status Indicators</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
                  <span className="text-sm">Connected</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
                  <span className="text-sm">Disconnected</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                  <span className="text-sm">Success</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                  <span className="text-sm">Idle</span>
                </div>
              </div>
            </div>

            {/* Badge Variants */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h4 className="font-semibold text-foreground mb-4">Badge Variants</h4>
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Error</Badge>
                <Badge variant="success">Success</Badge>
              </div>
            </div>

            {/* Interactive Controls */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h4 className="font-semibold text-foreground mb-4">Interactive Controls</h4>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Enable Notifications</span>
                  <Switch />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Volume Level</label>
                  <Slider defaultValue={[75]} max={100} step={1} className="mt-2" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Loading Progress</label>
                  <Progress value={66} className="mt-2" />
                </div>
              </div>
            </div>

            {/* Action Cards */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h4 className="font-semibold text-foreground mb-4">Action Cards</h4>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 rounded-xl bg-primary text-primary-foreground text-left hover:bg-primary/90 transition-colors">
                  <Hand className="w-8 h-8 mb-2" />
                  <p className="font-semibold">Start Translation</p>
                  <p className="text-xs opacity-80">Real-time gesture recognition</p>
                </button>
                <button className="p-4 rounded-xl bg-secondary text-secondary-foreground text-left hover:bg-secondary/90 transition-colors">
                  <BookOpen className="w-8 h-8 mb-2" />
                  <p className="font-semibold">Training Mode</p>
                  <p className="text-xs opacity-80">Learn new gestures</p>
                </button>
                <button className="p-4 rounded-xl border-2 border-dashed border-border text-left hover:border-secondary transition-colors">
                  <Bluetooth className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="font-semibold text-foreground">Pair Device</p>
                  <p className="text-xs text-muted-foreground">Connect smart gloves</p>
                </button>
                <button className="p-4 rounded-xl bg-success/20 text-left hover:bg-success/30 transition-colors">
                  <Check className="w-8 h-8 mb-2 text-success-foreground" />
                  <p className="font-semibold text-success-foreground">Calibrated</p>
                  <p className="text-xs text-success-foreground/80">Gloves ready to use</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Individual Screen Components
function HomeScreen() {
  return (
    <div className="p-4 space-y-4">
      {/* Welcome */}
      <div className="bg-primary/10 rounded-xl p-4">
        <p className="text-xs text-muted-foreground">Good morning</p>
        <h2 className="text-lg font-bold text-foreground">Welcome back!</h2>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="bg-primary text-primary-foreground p-4 rounded-xl text-left">
          <Hand className="w-6 h-6 mb-2" />
          <p className="text-sm font-semibold">Translate</p>
        </button>
        <button className="bg-secondary/20 p-4 rounded-xl text-left">
          <BookOpen className="w-6 h-6 mb-2 text-secondary" />
          <p className="text-sm font-semibold">History</p>
        </button>
      </div>

      {/* Device Status */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">Smart Glove Status</span>
          <Badge variant="success" className="text-xs">Connected</Badge>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Battery</span>
            <span className="text-foreground">85%</span>
          </div>
          <Progress value={85} className="h-2" />
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-sm font-medium mb-3">Recent Translations</h3>
        <div className="space-y-2">
          {["Hello, how are you?", "Thank you very much", "Nice to meet you"].map((text, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm flex-1">{text}</span>
              <Play className="w-4 h-4 text-secondary" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TranslateScreen({ isTranslating, setIsTranslating }: { isTranslating: boolean; setIsTranslating: (v: boolean) => void }) {
  return (
    <div className="p-4 space-y-4">
      {/* Translation Area */}
      <div className="bg-muted/50 rounded-xl p-6 min-h-[200px] flex flex-col items-center justify-center text-center">
        {isTranslating ? (
          <>
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4 animate-pulse">
              <Hand className="w-8 h-8 text-secondary" />
            </div>
            <p className="text-lg font-semibold text-foreground">Translating...</p>
            <p className="text-sm text-muted-foreground mt-1">Show a gesture</p>
            <div className="mt-4 px-4 py-2 bg-card rounded-lg border border-border">
              <p className="text-foreground">"Hello there!"</p>
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Hand className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Tap to start translation</p>
          </>
        )}
      </div>

      {/* Control Buttons */}
      <Button 
        onClick={() => setIsTranslating(!isTranslating)}
        className={cn(
          "w-full h-14 text-lg font-semibold",
          isTranslating ? "bg-destructive hover:bg-destructive/90" : ""
        )}
      >
        {isTranslating ? (
          <>
            <Pause className="w-5 h-5 mr-2" /> Stop
          </>
        ) : (
          <>
            <Play className="w-5 h-5 mr-2" /> Start Translation
          </>
        )}
      </Button>

      {/* Quick Phrases */}
      <div>
        <h3 className="text-sm font-medium mb-3">Quick Phrases</h3>
        <div className="flex flex-wrap gap-2">
          {["Hello", "Thank you", "Yes", "No", "Help"].map((phrase) => (
            <button key={phrase} className="px-3 py-2 bg-card border border-border rounded-full text-sm hover:bg-secondary/20 transition-colors">
              {phrase}
            </button>
          ))}
        </div>
      </div>

      {/* Audio Controls */}
      <div className="flex items-center gap-4 p-3 bg-card border border-border rounded-xl">
        <Volume2 className="w-5 h-5 text-muted-foreground" />
        <Slider defaultValue={[75]} max={100} className="flex-1" />
        <span className="text-xs text-muted-foreground">75%</span>
      </div>
    </div>
  );
}

function HistoryScreen() {
  return (
    <div className="p-4 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search history..." className="pl-10" />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {["All", "Today", "This Week", "Favorites"].map((filter, i) => (
          <button 
            key={filter}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
              i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* History List */}
      <div className="space-y-3">
        {[
          { text: "Hello, how are you?", time: "2 min ago", favorite: true },
          { text: "Thank you very much", time: "15 min ago", favorite: false },
          { text: "Nice to meet you", time: "1 hour ago", favorite: true },
          { text: "Goodbye, see you later", time: "2 hours ago", favorite: false },
        ].map((item, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-medium text-foreground">{item.text}</p>
              <button className={cn(item.favorite ? "text-success" : "text-muted-foreground")}>
                <Star className={cn("w-4 h-4", item.favorite && "fill-current")} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{item.time}</span>
              <div className="flex gap-2">
                <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                  <Play className="w-4 h-4 text-secondary" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                  <Share2 className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsScreen({ volume, setVolume, speechRate, setSpeechRate }: { 
  volume: number[]; 
  setVolume: (v: number[]) => void;
  speechRate: number[];
  setSpeechRate: (v: number[]) => void;
}) {
  return (
    <div className="p-4 space-y-4">
      {/* Voice Settings */}
      <div className="bg-card border border-border rounded-xl p-4">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-secondary" />
          Voice Settings
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span>Volume</span>
              <span>{volume[0]}%</span>
            </div>
            <Slider value={volume} onValueChange={setVolume} max={100} />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span>Speech Rate</span>
              <span>{speechRate[0]}%</span>
            </div>
            <Slider value={speechRate} onValueChange={setSpeechRate} max={100} />
          </div>
        </div>
      </div>

      {/* Device Settings */}
      <div className="bg-card border border-border rounded-xl p-4">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Bluetooth className="w-4 h-4 text-secondary" />
          Device
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Auto-connect</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Vibration Feedback</span>
            <Switch defaultChecked />
          </div>
          <Button variant="outline" size="sm" className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" /> Recalibrate
          </Button>
        </div>
      </div>

      {/* App Settings */}
      <div className="bg-card border border-border rounded-xl p-4">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Settings className="w-4 h-4 text-secondary" />
          App Preferences
        </h3>
        <div className="space-y-3">
          {[
            { icon: Globe, label: "Language", value: "English" },
            { icon: Moon, label: "Dark Mode", toggle: true },
            { icon: Bell, label: "Notifications", toggle: true, checked: true },
            { icon: Shield, label: "Privacy", value: "Manage" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{item.label}</span>
              </div>
              {item.toggle ? (
                <Switch defaultChecked={item.checked} />
              ) : (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span>{item.value}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="p-4 space-y-4">
      {/* Profile Header */}
      <div className="text-center py-4">
        <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-3 flex items-center justify-center">
          <User className="w-10 h-10 text-primary" />
        </div>
        <h2 className="font-semibold text-lg">John Doe</h2>
        <p className="text-sm text-muted-foreground">Primary User</p>
        <Button variant="outline" size="sm" className="mt-3">
          <Edit className="w-4 h-4 mr-2" /> Edit Profile
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Translations", value: "1,234" },
          { label: "Gestures", value: "28" },
          { label: "Hours Used", value: "45" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-secondary">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        {[
          { icon: Heart, label: "Favorites", count: 12 },
          { icon: Hand, label: "Custom Gestures", count: 5 },
          { icon: Download, label: "Export Data" },
          { icon: AlertTriangle, label: "Report Issue", destructive: true },
        ].map((item, i) => (
          <button 
            key={i}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-xl transition-colors",
              item.destructive ? "hover:bg-destructive/10" : "hover:bg-muted/50"
            )}
          >
            <item.icon className={cn("w-5 h-5", item.destructive ? "text-destructive" : "text-muted-foreground")} />
            <span className={cn("flex-1 text-left text-sm", item.destructive && "text-destructive")}>{item.label}</span>
            {item.count && <Badge variant="secondary">{item.count}</Badge>}
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Version */}
      <div className="text-center pt-4">
        <p className="text-xs text-muted-foreground">Version 1.0.0</p>
      </div>
    </div>
  );
}
