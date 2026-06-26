import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap"

const SLOGANS = ["ANALİZ", "STRATEJİ", "CREATIVE", "DOMİNASYON", "HARB!"]

export const Loader = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)

  const currentSloganIndex = useRef(0)

  useEffect(() => {
    const obj = { val: 0 }

    const tl = gsap.timeline({
      onComplete: () => {
        exitAnimation()
      }
    })

    // 1. Butter-smooth, continuous counter animation (direct DOM updates for high FPS)
    tl.to(obj, {
      val: 100,
      duration: 5,
      ease: "sine.inOut",
      onUpdate: () => {
        const currentVal = Math.floor(obj.val)
        if (wordRef.current) {
          wordRef.current.innerText = `LOADING ${currentVal}%`
          wordRef.current.style.backgroundSize = `${currentVal}% 100%`
        }

        // Sync slogans with the percentage thresholds.
        // Triggers React state updates only 5 times during the whole animation
        const newIndex = Math.min(Math.floor(currentVal / 20), SLOGANS.length - 1)
        if (newIndex !== currentSloganIndex.current) {
          currentSloganIndex.current = newIndex
          setActiveIndex(newIndex)
        }
      }
    }, 0)

    // GPU-accelerated Elastic Exit Animation
    const exitAnimation = () => {
      const exitTimeline = gsap.timeline({
        onComplete: () => {
          setIsVisible(false)
        }
      })

      exitTimeline.to(pathRef.current, {
        attr: { d: "M 0 0 L 100 0 L 100 100 Q 50 65 0 100 Z" },
        duration: 0.35,
        ease: "power2.in"
      })
        .to(pathRef.current, {
          attr: { d: "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z" },
          duration: 0.55,
          ease: "power4.out"
        })

      exitTimeline.to(containerRef.current, {
        y: "-100%",
        duration: 0.9,
        ease: "power4.inOut"
      }, 0)
    }

    return () => {
      tl.kill()
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden"
      style={{ willChange: "transform" }}
    >
      {/* Elastic SVG background overlay */}
      <svg
        className="absolute inset-0 w-full h-full fill-neutral-950"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z"
        />
      </svg>

      {/* Loader Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between p-8 md:p-16 text-white pointer-events-auto">
        {/* Empty top spacing */}
        <div />

        {/* Center slogans ticker window */}
        <div className="flex justify-center items-center h-full">
          {/* Changed items-center to items-start so the first slogan is aligned to the window correctly, and translation calculates center perfectly */}
          <div className="text-5xl sm:text-7xl md:text-8xl font-extrabold font-plus-jakarta tracking-tighter h-[1.3em] overflow-hidden flex items-start justify-center text-white">
            <div
              className="flex flex-col select-none transition-transform duration-700 ease-out will-change-transform"
              style={{ transform: `translateY(${-activeIndex * (100 / SLOGANS.length)}%)` }}
            >
              {SLOGANS.map((slogan, index) => {
                const isActive = index === activeIndex
                return (
                  <div
                    key={index}
                    className="flex items-center justify-center text-white transition-all duration-700 ease-out"
                    style={{
                      height: "1.3em",
                      lineHeight: "1.3em",
                      opacity: isActive ? 1 : 0.08,
                      transform: isActive ? "scale(1)" : "scale(0.8)",
                      willChange: "transform, opacity"
                    }}
                  >
                    {slogan}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Giant cropped LOADING wordmark — sweeps fill color left-to-right in sync with progress */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none z-20 pb-4 md:pb-10">
        <span
          ref={wordRef}
          className="block whitespace-nowrap font-black font-plus-jakarta leading-none tracking-tighter pl-4 md:pl-10 uppercase"
          style={{
            fontSize: "clamp(4rem, 16vw, 12rem)",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(255,255,255,0.8)",
            backgroundImage: "conic-gradient(#a3e635 0 0)",
            backgroundPosition: "0 0",
            backgroundSize: "0% 100%",
            backgroundRepeat: "no-repeat",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          LOADING 0%
        </span>
      </div>
    </div>
  )
}
