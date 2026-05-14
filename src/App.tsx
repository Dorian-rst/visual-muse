import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Destinations from "./pages/Destinations.tsx";
import DestinationDetail from "./pages/DestinationDetail.tsx";
import Activites from "./pages/Activites.tsx";
import ActivityDetail from "./pages/ActivityDetail.tsx";
import Hebergements from "./pages/Hebergements.tsx";
import Planner from "./pages/Planner.tsx";
import Quiz from "./pages/Quiz.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:slug" element={<DestinationDetail />} />
          <Route path="/activites" element={<Activites />} />
          <Route path="/activites/:slug" element={<ActivityDetail />} />
          <Route path="/hebergements" element={<Hebergements />} />
          <Route path="/planifier" element={<Planner />} />
          <Route path="/planifier/:slug" element={<Planner />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
