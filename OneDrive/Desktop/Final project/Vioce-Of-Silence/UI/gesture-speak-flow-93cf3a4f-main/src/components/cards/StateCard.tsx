import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StateCardProps {
  title: string;
  state: "connected" | "disconnected" | "loading" | "idle";
  icon: LucideIcon;
  description: string;
}

const stateConfig = {
  connected: {
    bg: "bg-secondary/10",
    border: "border-secondary",
    dot: "bg-secondary",
    label: "Connected",
  },
  disconnected: {
    bg: "bg-destructive/10",
    border: "border-destructive",
    dot: "bg-destructive",
    label: "Disconnected",
  },
  loading: {
    bg: "bg-success/10",
    border: "border-success",
    dot: "bg-success animate-pulse",
    label: "Loading",
  },
  idle: {
    bg: "bg-muted",
    border: "border-border",
    dot: "bg-muted-foreground",
    label: "Idle",
  },
};

export function StateCard({ title, state, icon: Icon, description }: StateCardProps) {
  const config = stateConfig[state];
  
  return (
    <div className={cn(
      "border-2 rounded-xl p-4 transition-all duration-300",
      config.bg,
      config.border
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            config.bg
          )}>
            <Icon className="w-5 h-5 text-foreground" />
          </div>
          <div>
            <h4 className="font-medium text-foreground">{title}</h4>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={cn("w-2 h-2 rounded-full", config.dot)} />
          <span className="text-xs font-medium text-muted-foreground">{config.label}</span>
        </div>
      </div>
    </div>
  );
}
