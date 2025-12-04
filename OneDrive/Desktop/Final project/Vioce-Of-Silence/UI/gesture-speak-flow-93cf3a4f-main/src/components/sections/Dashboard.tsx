import { Header } from "@/components/layout/Header";
import { FlowCard } from "@/components/cards/FlowCard";
import { StateCard } from "@/components/cards/StateCard";
import { 
  Bluetooth, 
  Cpu, 
  Volume2, 
  Wifi,
  Users,
  BookOpen,
  Zap
} from "lucide-react";

export function Dashboard() {
  return (
    <div className="animate-fade-in">
      <Header 
        title="UX Structure Overview"
        description="Interactive user experience map for Voice of Silence gesture-to-speech application"
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "User Flows", value: "6", icon: Zap },
          { label: "Screens", value: "12", icon: BookOpen },
          { label: "System States", value: "8", icon: Cpu },
          { label: "User Roles", value: "3", icon: Users },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key User Flows Preview */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Key User Flows</h2>
        <div className="grid grid-cols-2 gap-4">
          <FlowCard
            title="First-Time Onboarding"
            description="New user setup journey"
            userRole="Deaf/Mute User"
            steps={[
              { id: "1", label: "Welcome", state: "start" },
              { id: "2", label: "Permissions", state: "process" },
              { id: "3", label: "Glove Pairing", state: "loading" },
              { id: "4", label: "Calibration", state: "process" },
              { id: "5", label: "Ready", state: "success" },
            ]}
          />
          <FlowCard
            title="Real-Time Translation"
            description="Gesture to speech conversion"
            userRole="Primary Flow"
            steps={[
              { id: "1", label: "Gesture", state: "start" },
              { id: "2", label: "AI Process", state: "loading" },
              { id: "3", label: "Text", state: "process" },
              { id: "4", label: "Speech", state: "success" },
            ]}
          />
        </div>
      </section>

      {/* System State Preview */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">Current System States</h2>
        <div className="grid grid-cols-4 gap-4">
          <StateCard
            title="Smart Gloves"
            state="connected"
            icon={Bluetooth}
            description="BLE connection active"
          />
          <StateCard
            title="ML Model"
            state="loading"
            icon={Cpu}
            description="Loading prediction model"
          />
          <StateCard
            title="TTS Engine"
            state="idle"
            icon={Volume2}
            description="Ready for output"
          />
          <StateCard
            title="Network"
            state="connected"
            icon={Wifi}
            description="Online mode"
          />
        </div>
      </section>
    </div>
  );
}
