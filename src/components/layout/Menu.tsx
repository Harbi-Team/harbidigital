import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { NAV_LINKS, SITE_NAME } from "@/lib/constants"
import { gsap } from "@/lib/gsap"
import { X } from "lucide-react"

interface MenuProps {
  isOpen: boolean
  onClose: () => void
}

export const Menu = ({ isOpen, onClose }: MenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  // Handle ESC key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!menuRef.current || !linksRef.current) return

    const tl = gsap.timeline()

    if (isOpen) {
      document.body.style.overflow = "hidden"
      tl.to(menuRef.current, {
        x: 0,
        duration: 0.6,
        ease: "power3.out",
      }).fromTo(
        linksRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.3"
      )
    } else {
      document.body.style.overflow = ""
      tl.to(menuRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
      })
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Loop animation for mobile "Topluluğumuza Katıl" button scribble highlight
  useEffect(() => {
    const anim = gsap.timeline({ repeat: -1 })
      .to(".menu-scribble-path", {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power1.inOut"
      })
      .to(".menu-scribble-path", {
        strokeDashoffset: 550,
        duration: 1.0,
        ease: "power1.inOut",
        delay: 2.0 // Hold highlight
      })
      .to(".menu-scribble-path", {
        delay: 0.5 // Hold empty
      })

    return () => {
      anim.kill()
    }
  }, [])

  return (
    <div
      ref={menuRef}
      className="fixed inset-y-0 right-0 z-[100] w-full md:max-w-md bg-white/60 dark:bg-neutral-950/65 backdrop-blur-2xl border-l border-neutral-200/20 shadow-2xl translate-x-full"
      style={{ transform: "translateX(100%)" }}
    >
      <div className="h-full flex flex-col px-6 md:px-12 py-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            onClick={onClose}
            className="text-display-small text-foreground"
          >
            {SITE_NAME}
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Menüyü Kapat"
          >
            <X size={32} />
          </button>
        </div>

        {/* Navigation Links */}
        <div
          ref={linksRef}
          className="flex-1 flex flex-col justify-center items-center gap-6"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={onClose}
              className="text-display-large text-foreground hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile CTA Button with looping blue scribble */}
          <a
            href="https://www.gitbi.network/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="relative mt-4 flex items-center bg-transparent text-neutral-900 dark:text-white transition-all duration-200 active:scale-95 group"
          >
            {/* Hand-drawn felt-tip highlight background (Blue) */}
            <svg className="absolute inset-0 w-full h-full -z-10 scale-y-110 overflow-visible" viewBox="0 0 100 24" preserveAspectRatio="none">
              <path
                className="menu-scribble-path"
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
            <div className="flex items-center gap-2 transition-transform duration-200 group-hover:scale-105 relative z-10 w-full justify-center py-2.5 px-5">
              <img 
                src="/medias/gitbi.png" 
                alt="" 
                className="h-6 w-6 object-contain relative z-10 dark:invert" 
              />
              <span>Topluluğumuza Katıl</span>
            </div>
          </a>
        </div>

        {/* Footer */}
        <div className="text-center text-muted-foreground text-sm">
          <p>© 2025 {SITE_NAME}. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </div>
  )
}
