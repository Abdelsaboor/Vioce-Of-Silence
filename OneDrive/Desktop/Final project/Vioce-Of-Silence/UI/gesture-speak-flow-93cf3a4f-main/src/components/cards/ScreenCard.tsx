import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ScreenCardProps {
  name: string;
  features: string[];
  level: "primary" | "secondary" | "tertiary";
  isActive?: boolean;
  onClick?: () => void;
}

const levelStyles = {
  primary: "border-primary bg-primary/5",
  secondary: "border-secondary bg-secondary/5",
  tertiary: "border-border bg-card",
};

export function ScreenCard({ name, features, level, isActive, onClick }: ScreenCardProps) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "border-2 rounded-xl p-4 transition-all duration-200 cursor-pointer",
        levelStyles[level],
        isActive && "ring-2 ring-secondary ring-offset-2"
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-foreground text-sm">{name}</h4>
        <Badge 
          variant="outline" 
          className={cn(
            "text-xs capitalize",
            level === "primary" && "border-primary text-primary",
            level === "secondary" && "border-secondary text-secondary"
          )}
        >
          {level}
        </Badge>
      </div>
      <div className="space-y-1.5">
        {features.map((feature, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-1 h-1 rounded-full bg-muted-foreground" />
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}
