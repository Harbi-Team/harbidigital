import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu } from "./Menu"
import siteData from "@/data/site.json"
import { gsap } from "@/lib/gsap"

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkNavbar, setIsDarkNavbar] = useState(false)
  const location = useLocation()

  // Loop animation for the "Topluluğumuza Katıl" button scribble highlight
  useEffect(() => {
    const anim = gsap.timeline({ repeat: -1 })
      .to(".header-scribble-path", {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power1.inOut"
      })
      .to(".header-scribble-path", {
        strokeDashoffset: 550,
        duration: 1.0,
        ease: "power1.inOut",
        delay: 2.0 // Hold highlight
      })
      .to(".header-scribble-path", {
        delay: 0.5 // Hold empty
      })

    return () => {
      anim.kill()
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const darkPages = ["/hakkimizda", "/hizmetler", "/ekip", "/katalog"]
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
        <div
          className={`max-w-5xl mx-auto w-full rounded-full flex items-center justify-between px-5 md:px-7 py-3 transition-all duration-300 backdrop-blur-md ${isDarkNavbar
            ? "bg-[#0d0d0d]/70 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "bg-white/70 border border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
            }`}
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
            {siteData.nav.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-sm font-semibold transition-colors duration-200 ${isDarkNavbar
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
            {/* CTA Button (Desktop - Transparent with looping blue scribble) */}
            <a
              href="https://www.gitbi.network/"
              target="_blank"
              rel="noopener noreferrer"
              className={`relative hidden md:flex font-plus-jakarta font-bold text-xs tracking-wider rounded-full px-5.5 py-2.5 items-center bg-transparent active:scale-95 group ${
                isDarkNavbar ? "text-white" : "text-neutral-900"
              }`}
            >
              {/* Hand-drawn felt-tip highlight background (Blue) */}
              <svg className="absolute inset-0 w-full h-full -z-10 scale-y-110 overflow-visible" viewBox="0 0 100 24" preserveAspectRatio="none">
                <path
                  className="header-scribble-path"
                  d="M 6 9 L 2 17 L 9 4 L 10 21 L 18 5 L 19 19 L 27 3 L 28 21 L 36 6 L 37 20 L 45 2 L 46 22 L 54 4 L 55 19 L 63 2 L 64 21 L 72 5 L 73 20 L 81 3 L 82 21 L 88 7 L 87 17 L 95 10 L 94 14"
                  stroke="#3268e4" // Vibrant Blue highlighter
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  opacity="0.85"
                  style={{ strokeDasharray: 550, strokeDashoffset: 550 }}
                />
              </svg>

              {/* Only the text and image scale on hover */}
              <div className="flex items-center gap-2 transition-transform duration-200 group-hover:scale-105 relative z-10">
                <img 
                  src="/medias/gitbi.png" 
                  alt="" 
                  className={`h-6 w-6 object-contain transition-all duration-300 ${
                    isDarkNavbar ? "invert" : ""
                  }`} 
                />
                <span>Topluluğumuza Katıl</span>
              </div>
            </a>

            {/* Menu Button (Mobile) */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex flex-col gap-1.5 p-2 md:hidden group"
              aria-label="Menüyü Aç"
              aria-expanded={isMenuOpen}
            >
              <span className={`w-6 h-0.5 transition-all duration-300 group-hover:bg-[#a3e635] ${isDarkNavbar ? "bg-white" : "bg-neutral-800"
                }`} />
              <span className={`w-6 h-0.5 transition-all duration-300 group-hover:bg-[#a3e635] ${isDarkNavbar ? "bg-white" : "bg-neutral-800"
                }`} />
              <span className={`w-4 h-0.5 transition-all duration-300 group-hover:w-6 group-hover:bg-[#a3e635] ${isDarkNavbar ? "bg-white" : "bg-neutral-800"
                }`} />
            </button>
          </div>
        </div>
      </header>

      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
