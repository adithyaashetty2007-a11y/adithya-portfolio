import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
// Imported Router alongside Route and Switch from wouter
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function AppRouter() {
  // Determine base path dynamically for GitHub Pages vs custom domain / local dev
  const isGithubPages = window.location.hostname.includes('github.io');
  const basePath = isGithubPages ? '/adithya-portfolio' : '';
  
  return (
    <WouterRouter base={basePath}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/404"} component={Home} />
        {/* Final fallback route */}
        <Route component={Home} />
      </Switch>
    </WouterRouter>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <AppRouter />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

 
