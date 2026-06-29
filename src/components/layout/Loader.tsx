import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap"

const SLOGANS = ["ANALİZ", "STRATEJİ", "CREATIVE", "DOMİNASYON", "HARB!"]

export const Loader = () => {
  const [isVisible, setIsVisible] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // 1. Initialize GSAP timeline for loader sequence
    const tl = gsap.timeline({
      onComplete: () => {
        exitAnimation()
      }
    })

    const counter = { value: 0 }

    // 2. Synchronized counter animation
    // Starts fast and slows down near the end (power2.out) for an organic, premium feel
    tl.to(counter, {
      value: 100,
      duration: 4.2,
      ease: "power2.out",
      onUpdate: () => {
        const val = Math.floor(counter.value)
        if (counterRef.current) {
          // Always pad with zero for nice monospaced 3-digit alignment (e.g. 005, 042, 100)
          counterRef.current.innerText = val.toString().padStart(3, "0")
        }
      }
    }, 0)

    // 3. Slogan transitions (Staggered Split-Text entry & exit)
    // Slogan 0: Entry at 0s
    tl.to(".slogan-text-0 .char-span", {
      y: "0%",
      opacity: 1,
      duration: 0.6,
      stagger: 0.03,
      ease: "power3.out"
    }, 0)

    // Slogan 0 -> Slogan 1 transition at 0.8s
    tl.to(".slogan-text-0 .char-span", {
      y: "-120%",
      opacity: 0,
      duration: 0.4,
      stagger: 0.02,
      ease: "power3.in"
    }, 0.8)
    tl.to(".slogan-text-1 .char-span", {
      y: "0%",
      opacity: 1,
      duration: 0.6,
      stagger: 0.03,
      ease: "power3.out"
    }, 1.1)

    // Slogan 1 -> Slogan 2 transition at 1.6s
    tl.to(".slogan-text-1 .char-span", {
      y: "-120%",
      opacity: 0,
      duration: 0.4,
      stagger: 0.02,
      ease: "power3.in"
    }, 1.6)
    tl.to(".slogan-text-2 .char-span", {
      y: "0%",
      opacity: 1,
      duration: 0.6,
      stagger: 0.03,
      ease: "power3.out"
    }, 1.9)

    // Slogan 2 -> Slogan 3 transition at 2.4s
    tl.to(".slogan-text-2 .char-span", {
      y: "-120%",
      opacity: 0,
      duration: 0.4,
      stagger: 0.02,
      ease: "power3.in"
    }, 2.4)
    tl.to(".slogan-text-3 .char-span", {
      y: "0%",
      opacity: 1,
      duration: 0.6,
      stagger: 0.03,
      ease: "power3.out"
    }, 2.7)

    // Slogan 3 -> Slogan 4 ("HARB!") transition at 3.2s
    tl.to(".slogan-text-3 .char-span", {
      y: "-120%",
      opacity: 0,
      duration: 0.4,
      stagger: 0.02,
      ease: "power3.in"
    }, 3.2)
    tl.to(".slogan-text-4 .char-span", {
      y: "0%",
      opacity: 1,
      duration: 0.7,
      stagger: 0.04,
      ease: "power4.out"
    }, 3.5)

    // 4. Curtain exit animation sequence
    const exitAnimation = () => {
      const exitTl = gsap.timeline({
        onComplete: () => {
          setIsVisible(false)
        }
      })

      // Fade out textual contents and progress timeline
      exitTl.to(contentRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: "power3.inOut"
      })

      // Open curtain panels with staggered slide up
      exitTl.to(".shutter-panel", {
        y: "-100%",
        duration: 0.95,
        stagger: 0.07,
        ease: "power4.inOut"
      }, "-=0.2")
    }

    return () => {
      tl.kill()
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] overflow-hidden select-none"
    >
      {/* 4 Dikey Shutter Panel (Arka Plan Wipes) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="shutter-panel absolute top-0 h-full bg-neutral-950 will-change-transform"
          style={{ left: "0%", width: "calc(25% + 1px)" }}
        />
        <div
          className="shutter-panel absolute top-0 h-full bg-neutral-950 will-change-transform"
          style={{ left: "25%", width: "calc(25% + 1px)" }}
        />
        <div
          className="shutter-panel absolute top-0 h-full bg-neutral-950 will-change-transform"
          style={{ left: "50%", width: "calc(25% + 1px)" }}
        />
        <div
          className="shutter-panel absolute top-0 h-full bg-neutral-950 will-change-transform"
          style={{ left: "75%", width: "calc(25% + 1px)" }}
        />
      </div>

      {/* İnce Film Noise Overlay - Sinematik Doku */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none z-10"
        style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)"/%3E%3C/svg%3E')`,
        }}
      />

      {/* Yükleyici İçeriği (Sloganlar, Sayaç ve Timeline) */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white pointer-events-auto px-6"
      >
        {/* Sloganlar Bölümü (Kırpılmış Maske Kutusu) */}
        <div className="relative h-20 sm:h-28 md:h-36 w-full flex items-center justify-center overflow-hidden">
          {SLOGANS.map((slogan, sloganIdx) => (
            <div
              key={sloganIdx}
              className={`absolute flex items-center justify-center text-center font-black tracking-tighter uppercase font-plus-jakarta text-4xl sm:text-6xl md:text-7xl lg:text-8xl slogan-text-${sloganIdx}`}
              style={{ lineHeight: "1.1" }}
            >
              {slogan.split("").map((char, charIdx) => (
                <span
                  key={charIdx}
                  className="inline-block transform translate-y-[120%] opacity-0 char-span select-none"
                  style={{
                    color: slogan === "HARB!" ? "#a3e635" : "#ffffff",
                    willChange: "transform, opacity"
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Sayaç Bölümü */}
        <div className="mt-8 flex flex-col items-center gap-3 w-60 sm:w-72 md:w-80">
          {/* Monospace Yüzde Göstergesi */}
          <div className="flex justify-between items-end w-full text-[10px] font-mono tracking-widest text-neutral-400">
            <span>HARB! DIGITAL</span>
            <span>
              <span ref={counterRef} className="text-white font-bold text-xs sm:text-sm tracking-normal">000</span>
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
