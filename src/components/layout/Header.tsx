import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu } from "./Menu"
import { useContactModal } from "@/contexts/ContactModalContext"
import siteData from "@/data/site.json"

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { openModal } = useContactModal()

  return (
    <>
      <header className="fixed top-6 left-0 right-0 z-50 px-4 md:px-6">
        <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-md border border-neutral-200/50 shadow-[0_8px_30px_rgba(163,230,53,0.12)] rounded-full px-5 md:px-7 py-3 flex items-center justify-between transition-all duration-300">
          {/* Logo */}
          <Link
            to="/"
            className="hover:opacity-85 transition-opacity duration-300 flex items-center"
            aria-label="Ana Sayfa"
          >
            <img src="/harbi/harbi-logo.png" alt="harbi. digital" className="h-7 w-auto" />
          </Link>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-5 font-plus-jakarta">
            {siteData.nav.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
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
              className="hidden md:flex font-plus-jakarta font-bold text-xs tracking-wider bg-neutral-900 text-white hover:bg-black rounded-full px-5 py-2.5 items-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95"
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
              <span className="w-6 h-0.5 bg-neutral-800 transition-all duration-300 group-hover:bg-[#a3e635]" />
              <span className="w-6 h-0.5 bg-neutral-800 transition-all duration-300 group-hover:bg-[#a3e635]" />
              <span className="w-4 h-0.5 bg-neutral-800 transition-all duration-300 group-hover:w-6 group-hover:bg-[#a3e635]" />
            </button>
          </div>
        </div>
      </header>

      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
