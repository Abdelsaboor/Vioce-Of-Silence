import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Dashboard } from "@/components/sections/Dashboard";
import { UserFlows } from "@/components/sections/UserFlows";
import { NavigationStructure } from "@/components/sections/NavigationStructure";
import { RealtimeFlow } from "@/components/sections/RealtimeFlow";
import { SystemStates } from "@/components/sections/SystemStates";
import { FeatureMap } from "@/components/sections/FeatureMap";

const sections: Record<string, React.ComponentType> = {
  "dashboard": Dashboard,
  "user-flows": UserFlows,
  "navigation": NavigationStructure,
  "realtime": RealtimeFlow,
  "states": SystemStates,
  "features": FeatureMap,
};

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  
  const ActiveComponent = sections[activeSection];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <main className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
};

export default Index;
