import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import MobileMockup from "@/components/MobileMockup";
import Home from "./pages/Home";
import Translate from "./pages/Translate";
import Chat from "./pages/Chat";
import Training from "./pages/Training";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import "./lib/i18n";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="vos-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="relative min-h-screen bg-gradient-to-br from-background/60 via-black to-background flex items-center justify-center p-4 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(51,214,240,0.12),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(182,127,252,0.12),transparent_50%)]" />
          <MobileMockup>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/translate" element={<Translate />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/training" element={<Training />} />
                <Route path="/settings" element={<Settings />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </MobileMockup>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
