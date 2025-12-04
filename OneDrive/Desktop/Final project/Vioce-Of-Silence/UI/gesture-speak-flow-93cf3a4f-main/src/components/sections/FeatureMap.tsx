import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  Hand, 
  Bluetooth, 
  Brain, 
  Database, 
  Volume2,
  User,
  GraduationCap,
  Headphones
} from "lucide-react";

type UserRole = "deaf-mute" | "trainer" | "listener";
type Dependency = "hardware" | "ml" | "backend" | "tts" | "local";

interface Feature {
  id: string;
  name: string;
  screen: string;
  roles: UserRole[];
  dependencies: Dependency[];
  priority: "critical" | "important" | "optional";
}

const features: Feature[] = [
  { id: "1", name: "Real-time Translation", screen: "Translate", roles: ["deaf-mute"], dependencies: ["hardware", "ml", "tts"], priority: "critical" },
  { id: "2", name: "Glove Pairing", screen: "Settings > Device", roles: ["deaf-mute", "trainer"], dependencies: ["hardware"], priority: "critical" },
  { id: "3", name: "Gesture Calibration", screen: "Settings > Calibrate", roles: ["deaf-mute", "trainer"], dependencies: ["hardware", "ml"], priority: "critical" },
  { id: "4", name: "Custom Gesture Training", screen: "Training Mode", roles: ["trainer"], dependencies: ["hardware", "ml", "backend"], priority: "important" },
  { id: "5", name: "Translation History", screen: "History", roles: ["deaf-mute", "trainer"], dependencies: ["local", "backend"], priority: "important" },
  { id: "6", name: "Phrase Builder", screen: "Translate > Builder", roles: ["deaf-mute"], dependencies: ["ml", "tts"], priority: "important" },
  { id: "7", name: "Voice Selection", screen: "Settings > Voice", roles: ["deaf-mute"], dependencies: ["tts"], priority: "optional" },
  { id: "8", name: "Offline Mode", screen: "System-wide", roles: ["deaf-mute", "trainer", "listener"], dependencies: ["local", "ml"], priority: "important" },
  { id: "9", name: "Listening Mode", screen: "Listen", roles: ["listener"], dependencies: ["tts"], priority: "important" },
  { id: "10", name: "Gesture Library", screen: "Profile > Gestures", roles: ["deaf-mute", "trainer"], dependencies: ["backend", "ml"], priority: "optional" },
  { id: "11", name: "User Profile", screen: "Profile", roles: ["deaf-mute", "trainer", "listener"], dependencies: ["backend"], priority: "optional" },
  { id: "12", name: "Accessibility Settings", screen: "Settings > Access", roles: ["deaf-mute", "trainer", "listener"], dependencies: ["local"], priority: "critical" },
];

const roleConfig = {
  "deaf-mute": { label: "Deaf/Mute User", icon: User, color: "bg-primary text-primary-foreground" },
  "trainer": { label: "Trainer", icon: GraduationCap, color: "bg-secondary text-secondary-foreground" },
  "listener": { label: "Listener", icon: Headphones, color: "bg-success text-success-foreground" },
};

const dependencyConfig = {
  hardware: { label: "Hardware", icon: Bluetooth, color: "border-primary text-primary" },
  ml: { label: "AI/ML", icon: Brain, color: "border-secondary text-secondary" },
  backend: { label: "Backend", icon: Database, color: "border-muted-foreground text-muted-foreground" },
  tts: { label: "TTS", icon: Volume2, color: "border-success text-success" },
  local: { label: "Local", icon: Hand, color: "border-border text-foreground" },
};

export function FeatureMap() {
  const [selectedRole, setSelectedRole] = useState<UserRole | "all">("all");
  const [selectedDep, setSelectedDep] = useState<Dependency | "all">("all");

  const filteredFeatures = features.filter((f) => {
    const roleMatch = selectedRole === "all" || f.roles.includes(selectedRole);
    const depMatch = selectedDep === "all" || f.dependencies.includes(selectedDep);
    return roleMatch && depMatch;
  });

  return (
    <div className="animate-fade-in">
      <Header 
        title="Feature-to-Screen Mapping"
        description="Complete feature matrix with user roles, system dependencies, and screen locations"
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        {/* Role Filter */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">Filter by Role</p>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedRole("all")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                selectedRole === "all" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              All Roles
            </button>
            {Object.entries(roleConfig).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedRole(key as UserRole)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5",
                    selectedRole === key 
                      ? config.color
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  <Icon className="w-3 h-3" />
                  {config.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dependency Filter */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">Filter by Dependency</p>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedDep("all")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                selectedDep === "all" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              All
            </button>
            {Object.entries(dependencyConfig).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedDep(key as Dependency)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border-2",
                    selectedDep === key 
                      ? cn("bg-card", config.color)
                      : "border-transparent bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  <Icon className="w-3 h-3" />
                  {config.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Feature Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Feature</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Screen Location</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">User Roles</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Dependencies</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Priority</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredFeatures.map((feature) => (
              <tr key={feature.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3">
                  <span className="font-medium text-sm text-foreground">{feature.name}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">{feature.screen}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {feature.roles.map((role) => {
                      const config = roleConfig[role];
                      const Icon = config.icon;
                      return (
                        <Badge 
                          key={role} 
                          variant="outline" 
                          className="text-[10px] gap-1 py-0.5"
                        >
                          <Icon className="w-2.5 h-2.5" />
                          {role === "deaf-mute" ? "Primary" : config.label}
                        </Badge>
                      );
                    })}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {feature.dependencies.map((dep) => {
                      const config = dependencyConfig[dep];
                      const Icon = config.icon;
                      return (
                        <Badge 
                          key={dep} 
                          variant="outline" 
                          className={cn("text-[10px] gap-1 py-0.5", config.color)}
                        >
                          <Icon className="w-2.5 h-2.5" />
                          {config.label}
                        </Badge>
                      );
                    })}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge 
                    variant={
                      feature.priority === "critical" ? "destructive" :
                      feature.priority === "important" ? "secondary" : "outline"
                    }
                    className="text-[10px] capitalize"
                  >
                    {feature.priority}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-8 grid grid-cols-5 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <p className="text-2xl font-semibold text-foreground">{features.length}</p>
          <p className="text-xs text-muted-foreground">Total Features</p>
        </div>
        <div className="bg-card border border-destructive/30 rounded-xl p-4 text-center">
          <p className="text-2xl font-semibold text-destructive">{features.filter(f => f.priority === "critical").length}</p>
          <p className="text-xs text-muted-foreground">Critical</p>
        </div>
        <div className="bg-card border border-secondary/30 rounded-xl p-4 text-center">
          <p className="text-2xl font-semibold text-secondary">{features.filter(f => f.priority === "important").length}</p>
          <p className="text-xs text-muted-foreground">Important</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <p className="text-2xl font-semibold text-foreground">{features.filter(f => f.dependencies.includes("hardware")).length}</p>
          <p className="text-xs text-muted-foreground">Hardware Dependent</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <p className="text-2xl font-semibold text-foreground">{features.filter(f => f.dependencies.includes("ml")).length}</p>
          <p className="text-xs text-muted-foreground">ML Dependent</p>
        </div>
      </div>
    </div>
  );
}
