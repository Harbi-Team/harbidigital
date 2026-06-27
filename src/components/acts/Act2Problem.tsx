import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export const Act2Problem = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const maskLayerRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLHeadingElement>(null)
  const eRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
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

      // 2. Setup the ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500%", // 5 screen heights
          scrub: 1, 
          pin: true,
        }
      })

      // Phase 1: Intro text fades out, Video/Mask fades in (0 to 1)
      tl.to(introRef.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power2.inOut"
      }, 0)
      
      tl.to(maskLayerRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.inOut"
      }, 0)

      // Phase 2: Text scrolls ONLY horizontally from right to left (1 to 4)
      tl.fromTo(textContainerRef.current, 
        { x: "100vw", y: 0 }, 
        { x: targets.x, y: 0, duration: 3, ease: "none" }, 
        1
      )

      // Phase 3: The Infinite Zoom directly into the gap of 'E' (4 to 6)
      // We apply the Y translation here so it shifts perfectly into the center during the zoom
      tl.to(textContainerRef.current, {
        scale: 35, // Optimized scale to prevent browser texture crash
        y: targets.y,
        duration: 2,
        ease: "power3.in",
        force3D: false // Forces browser to repaint correctly on reverse scroll
      }, 4)

      // Phase 4: Fade out the mask completely to reveal the full video (5.5 to 6)
      tl.to(".mask-overlay", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      }, 5.5)

    }, sectionRef)

    const handleResize = () => ScrollTrigger.refresh()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen bg-[#0d0d0d]" id="act2">
      
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        
        {/* Phase 1: Intro Text Layer */}
        <div ref={introRef} className="absolute inset-0 z-10 flex items-center justify-center bg-white px-6">
          <div className="max-w-4xl text-center">
            <p className="text-neutral-900 text-3xl md:text-5xl lg:text-6xl leading-tight font-plus-jakarta font-bold tracking-tight">
              Veri odaklı pazarlama sanatıyla mühendisliği harmanlayarak büyüme odaklı çözümler sunuyoruz.
            </p>
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
