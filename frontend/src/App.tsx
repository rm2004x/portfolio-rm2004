import { Switch, Route, Router as WouterRouter } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Component, type ErrorInfo, type ReactNode, useEffect } from "react";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err: Error, info: ErrorInfo) { console.error(err, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100svh",
            background: "var(--bg)",
            gap: "1.5rem",
          }}
        >
          <p
            className="font-serif text-[--fg]"
            style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)" }}
          >
            Something went wrong.
          </p>
          <button onClick={() => window.location.reload()} className="btn-ghost">
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    
    const block = (e: KeyboardEvent) => {
      const c = e.ctrlKey || e.metaKey;
      if (
        (c && (e.key === "u" || e.key === "U")) ||
        (c && (e.key === "s" || e.key === "S")) ||
        (c && e.shiftKey && ["i","I","j","J","c","C"].includes(e.key)) ||
        e.key === "F12"
      ) e.preventDefault();
    };
    const noCtx = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("keydown", block);
    document.addEventListener("contextmenu", noCtx);
    return () => {
      document.removeEventListener("keydown", block);
      document.removeEventListener("contextmenu", noCtx);
    };
  }, []);

  return (
    <ErrorBoundary>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </ErrorBoundary>
  );
}