import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export const Act2Problem = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const maskLayerRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLHeadingElement>(null)
  const eRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let scrollTimeout: any = null

    const ctx = gsap.context(() => {
      // 1. Calculate precise gap coordinates for infinite zoom
      const calculateZoomCoordinates = () => {
        if (!eRef.current || !textContainerRef.current) return { x: 0, y: 0 }
        
        const eNode = eRef.current
        const containerNode = textContainerRef.current
        
        // Target the open space exactly to the right of the middle horizontal bar
        // Right side of E (55% - more to the left to hit the exact center of the gap)
        const gapX = eNode.offsetLeft + (eNode.offsetWidth * 0.55)
        const gapY = eNode.offsetTop + (eNode.offsetHeight * 0.5)
        
        // Set the transform origin of the container EXACTLY to this gap
        gsap.set(containerNode, { transformOrigin: `${gapX}px ${gapY}px` })
        
        // Find how much we need to translate the container to put this gap in the center of the screen
        const containerRect = containerNode.getBoundingClientRect()
        const naturalLeft = (window.innerWidth - containerNode.offsetWidth) / 2
        const naturalTop = (window.innerHeight - containerNode.offsetHeight) / 2
        
        const globalGapX = naturalLeft + gapX
        const globalGapY = naturalTop + gapY
        
        const targetX = (window.innerWidth / 2) - globalGapX
        const targetY = (window.innerHeight / 2) - globalGapY

        return { x: targetX, y: targetY }
      }

      const targets = calculateZoomCoordinates()

      // Automatic timed entrance animation when the section enters the viewport
      gsap.fromTo(".intro-paragraph", 
        { opacity: 0.1, y: 25, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%", // Play automatically when section is visible
            toggleActions: "play none none reverse"
          }
        }
      )

      // Looping scroll wheel indicator dot animation
      gsap.fromTo(".scroll-indicator-dot",
        { y: 0, opacity: 1 },
        {
          y: 10,
          opacity: 0.2,
          duration: 1.2,
          repeat: -1,
          ease: "power1.inOut"
        }
      )

      // 2. Setup the ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500%", // Reduced back to 500% since entry phase is now automatic
          scrub: 1, 
          pin: true,
          onEnter: () => {
            // If they don't scroll within 2 seconds, fade in the scroll indicator
            scrollTimeout = setTimeout(() => {
              gsap.to(".scroll-indicator", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
            }, 2000)
          },
          onUpdate: (self) => {
            // Once they start scrolling slightly, clear timeout and hide indicator
            if (self.progress > 0.02) {
              if (scrollTimeout) clearTimeout(scrollTimeout)
              gsap.to(".scroll-indicator", { opacity: 0, duration: 0.4 })
            }
          },
          onLeave: () => {
            if (scrollTimeout) clearTimeout(scrollTimeout)
            gsap.to(".scroll-indicator", { opacity: 0, duration: 0.2 })
          },
          onLeaveBack: () => {
            if (scrollTimeout) clearTimeout(scrollTimeout)
            gsap.to(".scroll-indicator", { opacity: 0, duration: 0.2 })
          }
        }
      })

      // Phase 1: Intro text and indicator fades out, Video/Mask fades in (starts at 1.0, duration 0.7)
      // This leaves scroll space from 0 to 1.0 for the user to read the text
      tl.to(introRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.7,
        ease: "power2.in"
      }, 1.0)
      
      tl.to(maskLayerRef.current, {
        opacity: 1,
        duration: 0.7,
        ease: "power2.inOut"
      }, 1.0)

      // Phase 2: Text scrolls ONLY horizontally from right to left (1.7 to 4.7)
      tl.fromTo(textContainerRef.current, 
        { x: "100vw", y: 0 }, 
        { x: targets.x, y: 0, duration: 3, ease: "none" }, 
        1.7
      )

      // Phase 3: The Infinite Zoom directly into the gap of 'E' (4.7 to 6.7)
      // We apply the Y translation here so it shifts perfectly into the center during the zoom
      tl.to(textContainerRef.current, {
        scale: 35, // Optimized scale to prevent browser texture crash
        y: targets.y,
        duration: 2,
        ease: "power3.in",
        force3D: false // Forces browser to repaint correctly on reverse scroll
      }, 4.7)

      // Phase 4: Fade out the mask completely to reveal the full video (6.2 to 6.7)
      tl.to(".mask-overlay", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      }, 6.2)

    }, sectionRef)

    const handleResize = () => ScrollTrigger.refresh()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (scrollTimeout) clearTimeout(scrollTimeout)
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen bg-[#0d0d0d]" id="act2">
      
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        
        {/* Phase 1: Intro Text Layer */}
        <div ref={introRef} className="absolute inset-0 z-10 flex items-center justify-center bg-white px-6">
          <div className="max-w-4xl text-center relative h-full flex flex-col justify-center items-center pb-20 md:pb-0">
            <p className="intro-paragraph text-neutral-900 text-3xl md:text-5xl lg:text-6xl leading-tight font-plus-jakarta font-bold tracking-tight">
              Veri odaklı pazarlama sanatıyla mühendisliği harmanlayarak büyüme odaklı çözümler sunuyoruz.
            </p>

            {/* Premium Animated Scroll Indicator (Optimized for mobile) */}
            <div className="scroll-indicator absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 text-neutral-400 font-mono text-[8px] md:text-[9px] tracking-[0.25em] uppercase select-none opacity-0 translate-y-2">
              <span>AŞAĞI KAYDIRIN</span>
              <div className="w-[16px] md:w-[18px] h-[26px] md:h-[30px] rounded-full border border-neutral-300 flex justify-center p-1 md:p-1.5 bg-transparent">
                <div className="scroll-indicator-dot w-[3px] h-[5px] rounded-full bg-neutral-850 will-change-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Phase 2: The Video & Text Mask Layer */}
        <div ref={maskLayerRef} className="absolute inset-0 z-20 opacity-0 pointer-events-none">
          
          {/* Background Video Layer - This stays static! */}
          <div className="absolute inset-0 w-full h-full bg-[#0d0d0d]">
            <video 
              className="absolute inset-0 w-full h-full object-cover"
              src="/medias/harbi-video.mp4" 
              autoPlay muted loop playsInline 
            />
          </div>
          
          {/* Mix-Blend-Mode Mask Layer */}
          <div className="mask-overlay absolute inset-0 w-full h-full bg-black text-white mix-blend-multiply flex items-center justify-center overflow-hidden">
            
            {/* The Huge Text Container */}
            <h1 
              ref={textContainerRef}
              className="relative whitespace-nowrap font-black font-plus-jakarta uppercase tracking-tighter"
              style={{ fontSize: "45vw", lineHeight: "1" }}
            >
              CREATIV<span ref={eRef} className="inline-block">E</span>
            </h1>
            
          </div>
          
        </div>
        
      </div>
    </section>
  )
}
