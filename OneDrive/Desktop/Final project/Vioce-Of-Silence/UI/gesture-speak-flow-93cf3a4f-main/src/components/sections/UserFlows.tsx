import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { FlowCard } from "@/components/cards/FlowCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";

const userFlows = [
  {
    id: "onboarding",
    title: "First-Time Onboarding",
    description: "Complete journey from app launch to first successful gesture translation",
    userRole: "Deaf/Mute User",
    steps: [
      { id: "1", label: "App Launch", state: "start" as const },
      { id: "2", label: "Welcome Screen", state: "process" as const },
      { id: "3", label: "Permission Request", state: "process" as const },
      { id: "4", label: "Account Setup", state: "process" as const },
      { id: "5", label: "Glove Discovery", state: "loading" as const },
      { id: "6", label: "Pairing Complete", state: "success" as const },
    ],
    details: [
      { step: "Welcome Screen", interactions: ["Skip option", "Language selection", "Accessibility settings"] },
      { step: "Permission Request", interactions: ["Bluetooth access", "Microphone (for listener)", "Storage"] },
      { step: "Account Setup", interactions: ["Email/Phone", "Name", "User role selection"] },
      { step: "Glove Discovery", interactions: ["Scanning animation", "Device list", "Manual entry"] },
    ],
  },
  {
    id: "pairing",
    title: "Glove Pairing Flow",
    description: "Hardware connection and calibration process",
    userRole: "Deaf/Mute User",
    steps: [
      { id: "1", label: "Scan", state: "start" as const },
      { id: "2", label: "Select Device", state: "process" as const },
      { id: "3", label: "Connecting", state: "loading" as const },
      { id: "4", label: "Calibrate", state: "process" as const },
      { id: "5", label: "Ready", state: "success" as const },
    ],
    details: [
      { step: "Scan", interactions: ["Pull to refresh", "Timeout handling", "No devices found state"] },
      { step: "Select Device", interactions: ["Device name", "Signal strength", "Last connected"] },
      { step: "Calibrate", interactions: ["Hand position guide", "Progress indicator", "Retry option"] },
    ],
  },
  {
    id: "translation",
    title: "Real-Time Translation",
    description: "Core gesture-to-speech conversion flow",
    userRole: "Primary User",
    steps: [
      { id: "1", label: "Gesture Input", state: "start" as const },
      { id: "2", label: "Sensor Data", state: "process" as const },
      { id: "3", label: "ML Prediction", state: "loading" as const },
      { id: "4", label: "Text Output", state: "process" as const },
      { id: "5", label: "TTS Playback", state: "success" as const },
    ],
    details: [
      { step: "Gesture Input", interactions: ["Live preview", "Gesture hold indicator", "Cancel gesture"] },
      { step: "ML Prediction", interactions: ["Confidence meter", "Alternative suggestions", "Unknown gesture"] },
      { step: "TTS Playback", interactions: ["Volume control", "Repeat", "Edit before speak"] },
    ],
  },
  {
    id: "training",
    title: "Training Mode",
    description: "Custom gesture training and practice flow",
    userRole: "Trainer",
    steps: [
      { id: "1", label: "Enter Training", state: "start" as const },
      { id: "2", label: "Select Gesture", state: "process" as const },
      { id: "3", label: "Record Samples", state: "loading" as const },
      { id: "4", label: "Model Update", state: "process" as const },
      { id: "5", label: "Saved", state: "success" as const },
    ],
    details: [
      { step: "Select Gesture", interactions: ["Browse library", "Create new", "Edit existing"] },
      { step: "Record Samples", interactions: ["Sample counter", "Quality indicator", "Discard sample"] },
    ],
  },
  {
    id: "history",
    title: "History & Playback",
    description: "Review and replay past translations",
    userRole: "All Users",
    steps: [
      { id: "1", label: "Open History", state: "start" as const },
      { id: "2", label: "Filter/Search", state: "process" as const },
      { id: "3", label: "Select Entry", state: "process" as const },
      { id: "4", label: "Playback", state: "success" as const },
    ],
    details: [
      { step: "Filter/Search", interactions: ["Date range", "Gesture type", "Favorites only"] },
      { step: "Playback", interactions: ["Replay audio", "Share text", "Delete entry"] },
    ],
  },
  {
    id: "error-recovery",
    title: "Error Recovery",
    description: "Handling system failures gracefully",
    userRole: "System",
    steps: [
      { id: "1", label: "Error Detected", state: "error" as const },
      { id: "2", label: "Diagnose", state: "process" as const },
      { id: "3", label: "Suggest Fix", state: "process" as const },
      { id: "4", label: "Retry", state: "loading" as const },
      { id: "5", label: "Resolved", state: "success" as const },
    ],
    details: [
      { step: "Error Detected", interactions: ["Connection lost", "Model failed", "Hardware issue"] },
      { step: "Suggest Fix", interactions: ["Reconnect gloves", "Restart app", "Contact support"] },
    ],
  },
];

export function UserFlows() {
  const [expandedFlow, setExpandedFlow] = useState<string | null>("onboarding");

  return (
    <div className="animate-fade-in">
      <Header 
        title="User Flow Mapping"
        description="Step-by-step user journeys with states, interactions, and decision points"
      />

      {/* Flow List */}
      <div className="space-y-4">
        {userFlows.map((flow) => (
          <div 
            key={flow.id}
            className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-300"
          >
            {/* Flow Header */}
            <button
              onClick={() => setExpandedFlow(expandedFlow === flow.id ? null : flow.id)}
              className="w-full p-5 flex items-center justify-between hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                  expandedFlow === flow.id ? "bg-primary text-primary-foreground" : "bg-muted"
                )}>
                  {expandedFlow === flow.id ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">{flow.title}</h3>
                  <p className="text-sm text-muted-foreground">{flow.description}</p>
                </div>
              </div>
              <Badge variant="outline">{flow.userRole}</Badge>
            </button>

            {/* Expanded Content */}
            {expandedFlow === flow.id && (
              <div className="px-5 pb-5 border-t border-border animate-fade-in">
                {/* Flow Steps */}
                <div className="pt-4 pb-6">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Flow Steps</h4>
                  <div className="flex items-center gap-2 flex-wrap">
                    {flow.steps.map((step, index) => (
                      <div key={step.id} className="flex items-center">
                        <div className={cn(
                          "px-4 py-2 rounded-lg text-sm font-medium",
                          step.state === "start" && "bg-primary text-primary-foreground",
                          step.state === "process" && "bg-muted text-muted-foreground border-2 border-border",
                          step.state === "success" && "bg-success text-success-foreground",
                          step.state === "error" && "bg-destructive text-destructive-foreground",
                          step.state === "loading" && "bg-success/20 text-success-foreground border-2 border-success"
                        )}>
                          {step.label}
                        </div>
                        {index < flow.steps.length - 1 && (
                          <ChevronRight className="w-4 h-4 text-muted-foreground mx-2" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interaction Details */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Interaction Details</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {flow.details.map((detail, i) => (
                      <div key={i} className="bg-muted/30 rounded-lg p-3">
                        <p className="text-sm font-medium text-foreground mb-2">{detail.step}</p>
                        <div className="space-y-1">
                          {detail.interactions.map((interaction, j) => (
                            <div key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                              {interaction}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
