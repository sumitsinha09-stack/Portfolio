import { useState, useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Monitor, Smartphone } from "lucide-react";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Check if we are inside the iframe preview
  const [isEmbedded, setIsEmbedded] = useState(false);
  const [viewMode, setViewMode] = useState<"web" | "mobile">("web");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsEmbedded(params.get("embed") === "true");

    // Load saved view preference from localStorage if any
    const savedMode = localStorage.getItem("portfolio-view-mode");
    if (savedMode === "web" || savedMode === "mobile") {
      setViewMode(savedMode);
    }
  }, []);

  const handleToggleMode = (mode: "web" | "mobile") => {
    setViewMode(mode);
    localStorage.setItem("portfolio-view-mode", mode);
  };

  const getIframeUrl = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("embed", "true");
    return url.toString();
  };

  // If inside the iframe, render the standard Router directly
  if (isEmbedded) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
        <TooltipProvider>
          {/* Floating Toggle Button Container */}
          <div className="fixed top-4 left-4 z-[9999] flex items-center bg-background/80 border border-primary/20 backdrop-blur-md p-1 rounded-full shadow-[0_0_20px_rgba(0,188,212,0.15)] transition-all duration-300 hover:border-primary/40">
            <button
              onClick={() => handleToggleMode("web")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase cursor-pointer transition-all duration-300 ${
                viewMode === "web"
                  ? "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(0,188,212,0.4)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Monitor size={14} />
              <span className="hidden sm:inline">Web</span>
            </button>
            <button
              onClick={() => handleToggleMode("mobile")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase cursor-pointer transition-all duration-300 ${
                viewMode === "mobile"
                  ? "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(0,188,212,0.4)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Smartphone size={14} />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          {viewMode === "mobile" ? (
            // Mobile Simulation Container
            <div className="relative min-h-screen bg-slate-950 flex items-center justify-center p-4 md:p-8 overflow-hidden select-none">
              {/* Space/Background effect for simulator screen */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.8),rgba(2,6,23,1))]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25" />
              
              {/* Premium Phone Mockup */}
              <div className="relative w-[375px] h-[760px] bg-black rounded-[50px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),0_0_40px_rgba(0,188,212,0.15)] border-[10px] border-slate-800 ring-2 ring-slate-700/50 flex flex-col overflow-hidden transition-all duration-500">
                {/* Speaker Grill & Camera Cutout (Dynamic Island) */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[110px] h-[30px] bg-black rounded-full z-50 flex items-center justify-center border border-slate-900/50 shadow-inner">
                  <div className="w-2.5 h-2.5 bg-[#080810] rounded-full border-2 border-slate-800/80 mr-2 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]" />
                  <div className="w-12 h-1 bg-[#1a1a2e] rounded-full" />
                </div>

                {/* Simulated Screen Content - iframe */}
                <div className="w-full h-full relative bg-background rounded-[40px] overflow-hidden">
                  <iframe
                    src={getIframeUrl()}
                    className="w-full h-full border-none select-text"
                    title="Mobile Preview"
                  />
                </div>

                {/* iOS Home Indicator Bar */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-36 h-1 bg-white/20 rounded-full z-50" />
              </div>
            </div>
          ) : (
            // Full Screen Web Mode
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
          )}
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

