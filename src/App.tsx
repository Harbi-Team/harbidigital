import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Analytics } from "@vercel/analytics/react"
import { ScrollToTop } from "@/components/layout/ScrollToTop"
import { Loader } from "@/components/layout/Loader"
import Index from "./pages/Index"
import About from "./pages/About"
import Services from "./pages/Services"
import Team from "./pages/Team"
import Contact from "./pages/Contact"
import NotFound from "./pages/NotFound"

const queryClient = new QueryClient()

const AppContent = () => {
  return (
    <>
      <Loader />
      <Toaster />
      <Sonner />
      <Analytics />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/hakkimizda" element={<About />} />
        <Route path="/hizmetler" element={<Services />} />
        <Route path="/ekip" element={<Team />} />
        <Route path="/iletisim" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
