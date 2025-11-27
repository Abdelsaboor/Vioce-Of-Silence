import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: "default" | "outline";
  size?: "default" | "lg";
}

export const ActionButton = ({ 
  icon: Icon, 
  label, 
  onClick,
  variant = "default",
  size = "default" 
}: ActionButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      className="group relative overflow-hidden hover-lift"
    >
      <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      <Icon className="h-5 w-5 mr-2 relative z-10" />
      <span className="relative z-10">{label}</span>
    </Button>
  );
};
