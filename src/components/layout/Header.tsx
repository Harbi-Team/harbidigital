import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu } from "./Menu"
import { useContactModal } from "@/contexts/ContactModalContext"
import siteData from "@/data/site.json"
import { GlassSurface } from "@/components/ui/glass-surface"

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkNavbar, setIsDarkNavbar] = useState(false)
  const { openModal } = useContactModal()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const darkPages = ["/hakkimizda", "/isler", "/urunler", "/hizmetler", "/ekip", "/katalog"]
      if (darkPages.includes(location.pathname)) {
        setIsDarkNavbar(true)
        return
      }
      if (location.pathname === "/iletisim") {
        setIsDarkNavbar(false)
        return
      }

      const navbarHeight = 60
      const checkY = window.scrollY + navbarHeight
      
      const sections = document.querySelectorAll("section, main > div, main > section")
      let foundDark = false
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const top = rect.top + window.scrollY
        const bottom = top + rect.height
        
        if (checkY >= top && checkY <= bottom) {
          const classes = section.className
          const id = section.id
          if (
            classes.includes("bg-[#0d0d0d]") ||
            classes.includes("bg-[#111111]") ||
            classes.includes("bg-black") ||
            id === "act6"
          ) {
            foundDark = true
          }
        }
      })
      
      setIsDarkNavbar(foundDark)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    setTimeout(handleScroll, 100)
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [location.pathname])

  return (
    <>
      <header className="fixed top-6 left-0 right-0 z-50 px-4 md:px-6">
        <GlassSurface
          as="div"
          width="100%"
          height="auto"
          borderRadius={9999}
          blur={12}
          borderWidth={0.05}
          displace={2}
          distortionScale={-80}
          xChannel="R"
          yChannel="B"
          redOffset={0}
          greenOffset={8}
          blueOffset={16}
          brightness={50}
          opacity={1}
          backgroundOpacity={0}
          mixBlendMode="screen"
          saturation={1.6}
          className="max-w-5xl mx-auto transition-all duration-300"
          contentClassName="w-full flex items-center justify-between px-5 md:px-7 py-3"
        >
          {/* Logo */}
          <Link
            to="/"
            className="hover:opacity-85 transition-opacity duration-300 flex items-center"
            aria-label="Ana Sayfa"
          >
            <img
              src={isDarkNavbar ? "/harbi/logo-siyah-harbi.png" : "/harbi/logo-beyaz-harbi.png"}
              alt="harbi. digital"
              className="h-7 w-auto transition-all duration-300"
            />
          </Link>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-5 font-plus-jakarta">
            {siteData.nav.filter(item => item.to !== "/ekip").map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  isDarkNavbar
                    ? "text-neutral-200 hover:text-white"
                    : "text-neutral-700 hover:text-neutral-950"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* CTA Button (Desktop) */}
            <button
              onClick={openModal}
              className={`hidden md:flex font-plus-jakarta font-bold text-xs tracking-wider rounded-full px-5 py-2.5 items-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95 ${
                isDarkNavbar
                  ? "bg-white text-neutral-900 hover:bg-neutral-100"
                  : "bg-neutral-900 text-white hover:bg-black"
              }`}
            >
              Görüşme Planla
              <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
            </button>

            {/* Menu Button (Mobile) */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex flex-col gap-1.5 p-2 md:hidden group"
              aria-label="Menüyü Aç"
              aria-expanded={isMenuOpen}
            >
              <span className={`w-6 h-0.5 transition-all duration-300 group-hover:bg-[#a3e635] ${
                isDarkNavbar ? "bg-white" : "bg-neutral-800"
              }`} />
              <span className={`w-6 h-0.5 transition-all duration-300 group-hover:bg-[#a3e635] ${
                isDarkNavbar ? "bg-white" : "bg-neutral-800"
              }`} />
              <span className={`w-4 h-0.5 transition-all duration-300 group-hover:w-6 group-hover:bg-[#a3e635] ${
                isDarkNavbar ? "bg-white" : "bg-neutral-800"
              }`} />
            </button>
          </div>
        </GlassSurface>
      </header>

      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
