import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Hand, 
  Cpu, 
  Smartphone, 
  Brain, 
  FileText, 
  Volume2, 
  User,
  ChevronRight,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";

const flowSteps = [
  { 
    id: "gesture", 
    label: "Gesture", 
    icon: Hand, 
    layer: "Hardware",
    description: "User performs sign language gesture",
    data: "Flex sensor values, accelerometer, gyroscope"
  },
  { 
    id: "sensor", 
    label: "Sensor Data", 
    icon: Cpu, 
    layer: "Hardware",
    description: "Raw sensor readings captured",
    data: "20 flex values, 3-axis motion × 2 hands"
  },
  { 
    id: "app", 
    label: "Mobile App", 
    icon: Smartphone, 
    layer: "Application",
    description: "BLE receives and preprocesses data",
    data: "Normalized tensor, gesture buffer"
  },
  { 
    id: "ml", 
    label: "ML Prediction", 
    icon: Brain, 
    layer: "AI Service",
    description: "Neural network inference",
    data: "Prediction label, confidence score"
  },
  { 
    id: "text", 
    label: "Text Output", 
    icon: FileText, 
    layer: "Application",
    description: "Predicted gesture mapped to text",
    data: "Word/phrase string, alternatives"
  },
  { 
    id: "speech", 
    label: "Speech Output", 
    icon: Volume2, 
    layer: "TTS Engine",
    description: "Text converted to audio",
    data: "Audio stream, voice parameters"
  },
  { 
    id: "feedback", 
    label: "User Feedback", 
    icon: User, 
    layer: "UI",
    description: "Visual and haptic confirmation",
    data: "UI state update, vibration"
  },
];

export function RealtimeFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= flowSteps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
      setConfidence(Math.random() * 30 + 70);
    }, 1200);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const resetFlow = () => {
    setActiveStep(0);
    setIsPlaying(false);
    setConfidence(0);
  };

  return (
    <div className="animate-fade-in">
      <Header 
        title="Real-Time Interaction Flow"
        description="Live data flow visualization from gesture input to speech output"
      />

      {/* Controls */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          variant={isPlaying ? "secondary" : "default"}
          className="gap-2"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? "Pause" : "Simulate Flow"}
        </Button>
        <Button variant="outline" onClick={resetFlow} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
        {activeStep === flowSteps.length - 1 && (
          <Badge variant="success" className="ml-auto animate-fade-in">
            Translation Complete
          </Badge>
        )}
      </div>

      {/* Flow Visualization */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between">
          {flowSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === activeStep;
            const isPast = index < activeStep;
            const isFuture = index > activeStep;
            
            return (
              <div key={step.id} className="flex items-center flex-1">
                <div 
                  className={cn(
                    "flex flex-col items-center transition-all duration-500",
                    isActive && "scale-110"
                  )}
                >
                  <div className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300",
                    isActive && "bg-secondary text-secondary-foreground shadow-lg",
                    isPast && "bg-success/20 text-success",
                    isFuture && "bg-muted text-muted-foreground"
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className={cn(
                    "text-xs font-medium mt-2 transition-colors",
                    isActive ? "text-secondary" : isPast ? "text-success" : "text-muted-foreground"
                  )}>
                    {step.label}
                  </p>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "text-[10px] mt-1",
                      isActive && "border-secondary text-secondary"
                    )}
                  >
                    {step.layer}
                  </Badge>
                </div>
                
                {index < flowSteps.length - 1 && (
                  <div className="flex-1 flex items-center justify-center mx-2">
                    <div className={cn(
                      "h-0.5 flex-1 transition-all duration-500",
                      isPast ? "bg-success" : "bg-border"
                    )} />
                    <ChevronRight className={cn(
                      "w-4 h-4 mx-1 transition-colors",
                      isPast ? "text-success" : "text-muted-foreground"
                    )} />
                    <div className={cn(
                      "h-0.5 flex-1 transition-all duration-500",
                      isPast ? "bg-success" : "bg-border"
                    )} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Step Details */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-4">Current Step Details</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground">Step</p>
              <p className="text-lg font-medium text-secondary">{flowSteps[activeStep].label}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Description</p>
              <p className="text-sm text-foreground">{flowSteps[activeStep].description}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Data Passed</p>
              <p className="text-sm text-muted-foreground">{flowSteps[activeStep].data}</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-4">System Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Prediction Confidence</span>
                <span className="text-success font-medium">{confidence.toFixed(1)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-success transition-all duration-500" 
                  style={{ width: `${confidence}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Processing Progress</span>
                <span className="text-secondary font-medium">{Math.round((activeStep / (flowSteps.length - 1)) * 100)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-secondary transition-all duration-500" 
                  style={{ width: `${(activeStep / (flowSteps.length - 1)) * 100}%` }}
                />
              </div>
            </div>
            <div className="pt-2 grid grid-cols-2 gap-3">
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Latency</p>
                <p className="text-lg font-semibold text-foreground">~120ms</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Buffer Size</p>
                <p className="text-lg font-semibold text-foreground">30 frames</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
