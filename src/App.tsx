import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { ScrollToTop } from "@/components/layout/ScrollToTop"
import { Loader } from "@/components/layout/Loader"
import { ContactModal } from "@/components/layout/ContactModal"
import {
  ContactModalProvider,
  useContactModal,
} from "@/contexts/ContactModalContext"
import Index from "./pages/Index"
import About from "./pages/About"
import Work from "./pages/Work"
import Services from "./pages/Services"
import Team from "./pages/Team"
import Contact from "./pages/Contact"
import Products from "./pages/Products"
import NotFound from "./pages/NotFound"

const queryClient = new QueryClient()

const AppContent = () => {
  const location = useLocation()
  const { isOpen, closeModal } = useContactModal()
  const isContactPage = location.pathname === "/iletisim"

  return (
    <>
      {/* <Loader /> */}
      <Toaster />
      <Sonner />
      {!isContactPage && <ContactModal isOpen={isOpen} onClose={closeModal} />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/hakkimizda" element={<About />} />
        <Route path="/isler" element={<Work />} />
        <Route path="/hizmetler" element={<Services />} />
        <Route path="/ekip" element={<Team />} />
        <Route path="/urunler" element={<Products />} />
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
        <ContactModalProvider>
          <AppContent />
        </ContactModalProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
