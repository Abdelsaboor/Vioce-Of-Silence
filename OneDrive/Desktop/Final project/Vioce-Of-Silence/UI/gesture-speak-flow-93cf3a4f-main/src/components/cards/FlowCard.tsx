import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

interface FlowStep {
  id: string;
  label: string;
  state: "start" | "process" | "success" | "error" | "loading";
}

interface FlowCardProps {
  title: string;
  description: string;
  steps: FlowStep[];
  userRole: string;
  onClick?: () => void;
}

const stateStyles = {
  start: "bg-primary text-primary-foreground",
  process: "bg-muted text-muted-foreground border-2 border-border",
  success: "bg-success text-success-foreground pulse-success",
  error: "bg-destructive text-destructive-foreground pulse-error",
  loading: "bg-state-loading text-success-foreground animate-pulse",
};

export function FlowCard({ title, description, steps, userRole, onClick }: FlowCardProps) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "bg-card border border-border rounded-xl p-5 transition-all duration-200 hover:shadow-md hover:border-secondary/50",
        onClick && "cursor-pointer"
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        </div>
        <Badge variant="outline" className="text-xs">{userRole}</Badge>
      </div>
      
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={cn(
              "px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap",
              stateStyles[step.state]
            )}>
              {step.label}
            </div>
            {index < steps.length - 1 && (
              <ChevronRight className="w-4 h-4 text-muted-foreground mx-1 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
