import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import ExecutiveOverview from "./pages/ExecutiveOverview";
import RenewalsRetention from "./pages/RenewalsRetention";
import ProductAdoption from "./pages/ProductAdoption";
import AMPerformance from "./pages/AMPerformance";
import Forecast from "./pages/Forecast";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<ExecutiveOverview />} />
            <Route path="/renewals" element={<RenewalsRetention />} />
            <Route path="/adoption" element={<ProductAdoption />} />
            <Route path="/performance" element={<AMPerformance />} />
            <Route path="/forecast" element={<Forecast />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
