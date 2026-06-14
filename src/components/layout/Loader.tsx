import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap"

const SLOGANS = ["ANALİZ", "STRATEJİ", "CREATIVE", "DOMİNASYON", "HARB!"]

export const Loader = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  
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
      duration: 3.5, 
      ease: "sine.inOut",
      onUpdate: () => {
        const currentVal = Math.floor(obj.val)
        if (counterRef.current) {
          counterRef.current.innerText = `${currentVal}%`
        }
        if (progressRef.current) {
          progressRef.current.style.width = `${currentVal}%`
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

        {/* Bottom stats and progress */}
        <div className="flex items-end justify-between relative">
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10 rounded-full overflow-hidden">
            <div 
              ref={progressRef}
              className="h-full bg-[#a3e635]" 
              style={{ width: "0%" }}
            />
          </div>
          
          <div className="w-full flex items-center justify-between pt-6">
            <span className="font-plus-jakarta text-xs text-white/40 uppercase tracking-wider font-semibold">
              Kreatif Strateji Ajansı
            </span>
            {/* Big counter */}
            <span 
              ref={counterRef}
              className="font-plus-jakarta font-black text-6xl md:text-8xl tracking-tight leading-none text-[#a3e635]/80"
            >
              0%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
