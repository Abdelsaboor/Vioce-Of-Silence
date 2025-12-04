import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { StateCard } from "@/components/cards/StateCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Bluetooth, 
  Cpu, 
  Volume2, 
  Wifi,
  Battery,
  Gauge,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2
} from "lucide-react";

type SystemState = "connected" | "disconnected" | "loading" | "idle";

interface StateConfig {
  id: string;
  title: string;
  icon: typeof Bluetooth;
  currentState: SystemState;
  description: string;
  states: {
    name: string;
    state: SystemState;
    trigger: string;
    feedback: string;
  }[];
}

const systemStates: StateConfig[] = [
  {
    id: "device",
    title: "Device Connection",
    icon: Bluetooth,
    currentState: "connected",
    description: "Smart glove BLE connection status",
    states: [
      { name: "Connected", state: "connected", trigger: "Successful BLE handshake", feedback: "Green indicator, haptic buzz" },
      { name: "Disconnected", state: "disconnected", trigger: "BLE timeout / out of range", feedback: "Red indicator, alert banner" },
      { name: "Connecting", state: "loading", trigger: "Pairing initiated", feedback: "Yellow pulse, scanning animation" },
      { name: "Idle", state: "idle", trigger: "App background / no gloves", feedback: "Gray indicator" },
    ],
  },
  {
    id: "model",
    title: "ML Model Status",
    icon: Cpu,
    currentState: "loading",
    description: "Neural network model loading and inference state",
    states: [
      { name: "Ready", state: "connected", trigger: "Model loaded in memory", feedback: "Ready badge, prediction enabled" },
      { name: "Failed", state: "disconnected", trigger: "Load error / corruption", feedback: "Error toast, retry option" },
      { name: "Loading", state: "loading", trigger: "App start / model update", feedback: "Progress indicator, ETA" },
      { name: "Offline", state: "idle", trigger: "Using cached model", feedback: "Offline badge, limited accuracy" },
    ],
  },
  {
    id: "prediction",
    title: "Prediction Confidence",
    icon: Gauge,
    currentState: "connected",
    description: "Real-time gesture recognition confidence level",
    states: [
      { name: "High (>85%)", state: "connected", trigger: "Clear gesture recognized", feedback: "Green confidence bar, auto-speak" },
      { name: "Low (<50%)", state: "disconnected", trigger: "Ambiguous gesture", feedback: "Yellow bar, show alternatives" },
      { name: "Processing", state: "loading", trigger: "Inference running", feedback: "Animated bar, prediction pending" },
      { name: "No Input", state: "idle", trigger: "No gesture detected", feedback: "Empty state, prompt user" },
    ],
  },
  {
    id: "network",
    title: "Network Status",
    icon: Wifi,
    currentState: "connected",
    description: "Online/offline mode detection",
    states: [
      { name: "Online", state: "connected", trigger: "Active connection", feedback: "Full features enabled" },
      { name: "Offline", state: "disconnected", trigger: "No connection", feedback: "Offline mode banner, local-only" },
      { name: "Syncing", state: "loading", trigger: "Background sync", feedback: "Sync indicator, progress" },
      { name: "Metered", state: "idle", trigger: "Data saver mode", feedback: "Reduced sync, warning" },
    ],
  },
  {
    id: "tts",
    title: "TTS Engine",
    icon: Volume2,
    currentState: "idle",
    description: "Text-to-speech engine status",
    states: [
      { name: "Speaking", state: "connected", trigger: "Audio playback active", feedback: "Sound wave animation" },
      { name: "Error", state: "disconnected", trigger: "TTS failure", feedback: "Error icon, text fallback" },
      { name: "Buffering", state: "loading", trigger: "Preparing audio", feedback: "Loading indicator" },
      { name: "Ready", state: "idle", trigger: "Awaiting input", feedback: "Ready indicator" },
    ],
  },
  {
    id: "battery",
    title: "Glove Battery",
    icon: Battery,
    currentState: "connected",
    description: "Smart glove power level",
    states: [
      { name: "Good (>50%)", state: "connected", trigger: "Adequate charge", feedback: "Green battery icon" },
      { name: "Low (<20%)", state: "disconnected", trigger: "Needs charging", feedback: "Red icon, charge prompt" },
      { name: "Charging", state: "loading", trigger: "Connected to power", feedback: "Charging animation" },
      { name: "Unknown", state: "idle", trigger: "No data", feedback: "Gray icon" },
    ],
  },
];

export function SystemStates() {
  const [activeState, setActiveState] = useState<string | null>("device");

  const getStateIcon = (state: SystemState) => {
    switch (state) {
      case "connected": return CheckCircle;
      case "disconnected": return XCircle;
      case "loading": return Loader2;
      default: return AlertTriangle;
    }
  };

  const getStateBadge = (state: SystemState) => {
    switch (state) {
      case "connected": return { variant: "success" as const, label: "Active" };
      case "disconnected": return { variant: "destructive" as const, label: "Error" };
      case "loading": return { variant: "success" as const, label: "Loading" };
      default: return { variant: "outline" as const, label: "Idle" };
    }
  };

  return (
    <div className="animate-fade-in">
      <Header 
        title="System State Mapping"
        description="Comprehensive system state visualization with triggers and feedback patterns"
      />

      {/* State Overview Grid */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {systemStates.map((system) => (
          <div
            key={system.id}
            onClick={() => setActiveState(system.id === activeState ? null : system.id)}
            className={cn(
              "cursor-pointer transition-all duration-200",
              activeState === system.id && "ring-2 ring-secondary ring-offset-2 rounded-xl"
            )}
          >
            <StateCard
              title={system.title}
              state={system.currentState}
              icon={system.icon}
              description={system.description}
            />
          </div>
        ))}
      </div>

      {/* Selected State Details */}
      {activeState && (
        <div className="bg-card border border-border rounded-xl p-6 animate-fade-in">
          {(() => {
            const system = systemStates.find(s => s.id === activeState)!;
            return (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <system.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">{system.title}</h3>
                      <p className="text-sm text-muted-foreground">{system.description}</p>
                    </div>
                  </div>
                  <Badge variant={getStateBadge(system.currentState).variant}>
                    Current: {system.states.find(s => s.state === system.currentState)?.name}
                  </Badge>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {system.states.map((state) => {
                    const StateIcon = getStateIcon(state.state);
                    const isCurrentState = state.state === system.currentState;
                    
                    return (
                      <div 
                        key={state.name}
                        className={cn(
                          "border-2 rounded-xl p-4 transition-all",
                          state.state === "connected" && "border-secondary bg-secondary/5",
                          state.state === "disconnected" && "border-destructive bg-destructive/5",
                          state.state === "loading" && "border-success bg-success/5",
                          state.state === "idle" && "border-border bg-muted/30",
                          isCurrentState && "ring-2 ring-offset-2",
                          isCurrentState && state.state === "connected" && "ring-secondary",
                          isCurrentState && state.state === "disconnected" && "ring-destructive",
                          isCurrentState && state.state === "loading" && "ring-success",
                        )}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <StateIcon className={cn(
                            "w-4 h-4",
                            state.state === "connected" && "text-secondary",
                            state.state === "disconnected" && "text-destructive",
                            state.state === "loading" && "text-success animate-spin",
                            state.state === "idle" && "text-muted-foreground"
                          )} />
                          <span className="font-medium text-sm text-foreground">{state.name}</span>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Trigger</p>
                            <p className="text-xs text-foreground">{state.trigger}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Feedback</p>
                            <p className="text-xs text-foreground">{state.feedback}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* State Legend */}
      <div className="mt-8 flex items-center gap-6 justify-center">
        {[
          { state: "connected", label: "Success / Connected", color: "bg-secondary" },
          { state: "disconnected", label: "Error / Disconnected", color: "bg-destructive" },
          { state: "loading", label: "Loading / In Progress", color: "bg-success" },
          { state: "idle", label: "Idle / Inactive", color: "bg-muted-foreground" },
        ].map((item) => (
          <div key={item.state} className="flex items-center gap-2">
            <div className={cn("w-3 h-3 rounded-full", item.color)} />
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
