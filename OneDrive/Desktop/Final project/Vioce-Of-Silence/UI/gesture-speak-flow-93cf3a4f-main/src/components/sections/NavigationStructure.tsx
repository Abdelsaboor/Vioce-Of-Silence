import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { ScreenCard } from "@/components/cards/ScreenCard";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Hand, 
  BookOpen, 
  Settings, 
  User,
  ChevronRight
} from "lucide-react";

const navigationTabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "translate", label: "Translate", icon: Hand },
  { id: "history", label: "History", icon: BookOpen },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "profile", label: "Profile", icon: User },
];

const screens = {
  home: [
    { name: "Dashboard", level: "primary" as const, features: ["Quick translate", "Status overview", "Recent activity"] },
    { name: "Glove Status", level: "secondary" as const, features: ["Battery level", "Connection strength", "Calibration status"] },
    { name: "Notifications", level: "tertiary" as const, features: ["System alerts", "Updates", "Tips"] },
  ],
  translate: [
    { name: "Live Translation", level: "primary" as const, features: ["Gesture preview", "Text output", "Audio playback"] },
    { name: "Phrase Builder", level: "secondary" as const, features: ["Word queue", "Edit phrases", "Quick phrases"] },
    { name: "Training Mode", level: "secondary" as const, features: ["Gesture library", "Record new", "Practice"] },
  ],
  history: [
    { name: "Translation Log", level: "primary" as const, features: ["Date grouped", "Search", "Filters"] },
    { name: "Entry Detail", level: "secondary" as const, features: ["Replay audio", "Edit text", "Share"] },
    { name: "Favorites", level: "tertiary" as const, features: ["Saved phrases", "Quick access", "Export"] },
  ],
  settings: [
    { name: "App Settings", level: "primary" as const, features: ["Language", "Accessibility", "Notifications"] },
    { name: "Device Settings", level: "primary" as const, features: ["Glove management", "Calibration", "Firmware"] },
    { name: "Voice Settings", level: "secondary" as const, features: ["TTS voice", "Speed", "Pitch"] },
    { name: "Privacy", level: "tertiary" as const, features: ["Data storage", "Analytics", "Permissions"] },
  ],
  profile: [
    { name: "User Profile", level: "primary" as const, features: ["Personal info", "Role", "Preferences"] },
    { name: "Custom Gestures", level: "secondary" as const, features: ["My gestures", "Shared library", "Stats"] },
    { name: "Support", level: "tertiary" as const, features: ["Help center", "Contact", "Feedback"] },
  ],
};

export function NavigationStructure() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedScreen, setSelectedScreen] = useState<string | null>(null);

  return (
    <div className="animate-fade-in">
      <Header 
        title="Screen & Navigation Structure"
        description="Hierarchical screen organization with bottom navigation and data flow"
      />

      {/* Mobile Frame Preview */}
      <div className="grid grid-cols-3 gap-8">
        {/* Navigation Demo */}
        <div className="col-span-1">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Bottom Navigation</h3>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {/* Screen Preview */}
            <div className="aspect-[9/16] bg-muted/30 p-4 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 mx-auto mb-3 flex items-center justify-center">
                    {navigationTabs.find(t => t.id === activeTab)?.icon && (
                      <span className="text-primary">
                        {(() => {
                          const Icon = navigationTabs.find(t => t.id === activeTab)!.icon;
                          return <Icon className="w-8 h-8" />;
                        })()}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-foreground capitalize">{activeTab}</p>
                  <p className="text-xs text-muted-foreground mt-1">Active Screen</p>
                </div>
              </div>
            </div>
            
            {/* Bottom Nav */}
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

        {/* Screen Hierarchy */}
        <div className="col-span-2">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Screen Hierarchy: <span className="text-secondary capitalize">{activeTab}</span>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {screens[activeTab as keyof typeof screens].map((screen) => (
              <ScreenCard
                key={screen.name}
                {...screen}
                isActive={selectedScreen === screen.name}
                onClick={() => setSelectedScreen(screen.name === selectedScreen ? null : screen.name)}
              />
            ))}
          </div>

          {/* Data Flow */}
          <div className="mt-6 p-4 bg-muted/30 rounded-xl">
            <h4 className="text-sm font-medium text-foreground mb-3">Data Passed Between Screens</h4>
            <div className="flex items-center gap-3 flex-wrap">
              {[
                { from: "Home", to: "Translate", data: "Quick action context" },
                { from: "Translate", to: "History", data: "Translation entry" },
                { from: "History", to: "Detail", data: "Entry ID, metadata" },
                { from: "Settings", to: "Device", data: "Connected device info" },
              ].map((flow, i) => (
                <div key={i} className="flex items-center gap-2 bg-card px-3 py-2 rounded-lg border border-border">
                  <Badge variant="secondary" className="text-xs">{flow.from}</Badge>
                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  <Badge variant="secondary" className="text-xs">{flow.to}</Badge>
                  <span className="text-xs text-muted-foreground ml-2">{flow.data}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Persistent UI Elements */}
      <div className="mt-8">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Persistent UI Elements</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { name: "Status Bar", description: "Glove connection, battery, network status", always: true },
            { name: "Bottom Navigation", description: "5 primary sections", always: true },
            { name: "FAB (Translate)", description: "Quick translation trigger on Home", always: false },
            { name: "Toast Messages", description: "Feedback for actions and errors", always: false },
          ].map((element) => (
            <div key={element.name} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm text-foreground">{element.name}</h4>
                <Badge variant={element.always ? "default" : "outline"} className="text-xs">
                  {element.always ? "Always" : "Contextual"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{element.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
