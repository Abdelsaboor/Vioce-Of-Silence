import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  GitBranch, 
  Layers, 
  Activity, 
  Settings2, 
  Grid3X3,
  Hand,
  Smartphone
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "user-flows", label: "User Flows", icon: GitBranch },
  { id: "navigation", label: "Navigation", icon: Layers },
  { id: "realtime", label: "Data Flow", icon: Activity },
  { id: "states", label: "System States", icon: Settings2 },
  { id: "features", label: "Feature Map", icon: Grid3X3 },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
            <Hand className="w-5 h-5 text-secondary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-sm">Voice of Silence</h1>
            <p className="text-xs text-sidebar-foreground/70">UX Structure</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {/* Links to standalone pages */}
        <Link
          to="/navigation"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 bg-secondary/20 text-secondary hover:bg-secondary/30"
        >
          <Smartphone className="w-4 h-4" />
          App UI Preview
        </Link>
        <Link
          to="/page-mapping"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 bg-secondary/20 text-secondary hover:bg-secondary/30 mb-3"
        >
          <Layers className="w-4 h-4" />
          Page Mapping
        </Link>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="px-4 py-3 rounded-lg bg-sidebar-accent/50">
          <p className="text-xs text-sidebar-foreground/70">System Layers</p>
          <div className="mt-2 space-y-1">
            {["Smart Gloves", "Mobile App", "AI/ML", "Backend", "TTS"].map((layer, i) => (
              <div key={layer} className="flex items-center gap-2 text-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span className="text-sidebar-foreground/80">{layer}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
