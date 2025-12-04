import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  title: string;
  description: string;
}

export function Header({ title, description }: HeaderProps) {
  return (
    <header className="mb-8 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          <p className="text-muted-foreground mt-1">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">Mobile-First</Badge>
          <Badge variant="secondary" className="text-xs">Flutter Ready</Badge>
        </div>
      </div>
    </header>
  );
}
