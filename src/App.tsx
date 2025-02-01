import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Welcome from "./pages/Welcome";
import Index from "./pages/Index";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import FAQ from "./pages/FAQ";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner 
          position="top-right"
          closeButton
          duration={3000}
          theme="system"
          className="font-inter z-50"
          toastOptions={{
            classNames: {
              toast: "font-inter dark:bg-gray-800 dark:text-white max-w-[350px] mobile:max-w-[90vw]",
              title: "font-semibold",
              description: "text-sm"
            },
            style: {
              background: 'var(--background)',
              border: '1px solid var(--border)',
            }
          }}
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/lists" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;