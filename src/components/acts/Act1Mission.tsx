import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

export const Act1Mission = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scrub Timeline ONLY for the word-by-word text color reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%", // Keep scroll length tight
          scrub: true,
          pin: true,
          onLeave: () => {
            const nextSection = document.getElementById("act2")
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: "smooth" })
            }
          }
        }
      })

      // Reveal words (0 to 1.5)
      tl.to(".mission-word", {
        color: "#0a0a0a",
        opacity: 1,
        stagger: 0.03,
        duration: 0.3,
        ease: "none"
      }, 0)

      // --- TIMELINE CALLBACKS (Fires exactly when scroll reaches the word) ---

      // 1. Scribble Highlighter for "mimarlarıyız." (Fires at index 2 * 0.03 + 0.32s = 0.38s)
      tl.call(() => {
        if (!tl.scrollTrigger) return
        const currentScroll = tl.scrollTrigger.scroll()
        const triggerStart = tl.scrollTrigger.start

        // Guard: do not trigger on page load layout sweeps
        if (currentScroll < triggerStart + 10) {
          gsap.set(".mission-scribble-path", { strokeDashoffset: 550 })
          return
        }

        const isForward = tl.scrollTrigger.direction === 1
        gsap.to(".mission-scribble-path", {
          strokeDashoffset: isForward ? 0 : 550,
          duration: isForward ? 0.8 : 0.4,
          ease: isForward ? "power1.inOut" : "power1.in"
        })
      }, null, 0.38)

      // 2. Green Box for "stratejik" (Fires at index 10 * 0.03 + 0.32s = 0.62s)
      tl.call(() => {
        if (!tl.scrollTrigger) return
        const currentScroll = tl.scrollTrigger.scroll()
        const triggerStart = tl.scrollTrigger.start

        // Guard: do not trigger on page load layout sweeps
        if (currentScroll < triggerStart + 10) {
          gsap.set(".mission-green-box", { scaleX: 0 })
          gsap.set(".mission-box-text", { color: "#d1d5db", opacity: 0.3 })
          return
        }

        const isForward = tl.scrollTrigger.direction === 1
        gsap.to(".mission-green-box", {
          scaleX: isForward ? 1 : 0,
          duration: isForward ? 0.55 : 0.35,
          ease: isForward ? "back.out(1.3)" : "power2.in"
        })
        gsap.to(".mission-box-text", {
          color: isForward ? "#0d0d0d" : "#d1d5db", // Turn black on green, revert to gray
          opacity: isForward ? 1 : 0.3,
          duration: 0.3
        })
      }, null, 0.62)

      // 3. Underline for "avcı" (Fires at index 30 * 0.03 + 0.32s = 1.22s)
      tl.call(() => {
        if (!tl.scrollTrigger) return
        const currentScroll = tl.scrollTrigger.scroll()
        const triggerStart = tl.scrollTrigger.start

        // Guard: do not trigger on page load layout sweeps
        if (currentScroll < triggerStart + 10) {
          gsap.set(".mission-underline-path", { strokeDashoffset: 100 })
          return
        }

        const isForward = tl.scrollTrigger.direction === 1
        gsap.to(".mission-underline-path", {
          strokeDashoffset: isForward ? 0 : 100,
          duration: isForward ? 0.6 : 0.4,
          ease: isForward ? "power2.out" : "power2.in"
        })
      }, null, 1.22)

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen bg-white" id="mission-section">
      {/* Sticky Container centered on the viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center bg-white px-6 md:px-12 overflow-hidden">
        <div className="max-w-5xl text-left mission-container">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black font-plus-jakarta tracking-tighter leading-[1.3] flex flex-wrap select-none">
            
            {/* Sentence 1 */}
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">Biz</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">dijitalin</span>
            
            {/* "mimarlarıyız." - Felt-tip Marker Highlighter Scribble (Electric Cyan) */}
            <span className="relative inline-block px-1.5 mr-2 md:mr-3 select-none z-10 mission-marker-wrapper">
              <svg className="absolute inset-0 w-full h-full -z-10 scale-y-110 overflow-visible" viewBox="0 0 100 24" preserveAspectRatio="none">
                <path
                  className="mission-scribble-path"
                  d="M 6 9 L 2 17 L 9 4 L 10 21 L 18 5 L 19 19 L 27 3 L 28 21 L 36 6 L 37 20 L 45 2 L 46 22 L 54 4 L 55 19 L 63 2 L 64 21 L 72 5 L 73 20 L 81 3 L 82 21 L 88 7 L 87 17 L 95 10 L 94 14"
                  stroke="#00d2ff" // Electric Cyan/Blue
                  strokeWidth="7" // Thicker stroke
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  opacity="0.85" // Higher opacity for visibility
                  style={{ strokeDasharray: 550, strokeDashoffset: 550 }}
                />
              </svg>
              <span className="mission-word text-neutral-300/40 opacity-30 inline-block">mimarlarıyız.</span>
            </span>

            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">Her</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">kod</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">satırında,</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">her</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">pikselde</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">ve</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">her</span>

            {/* "stratejik" - Tilted Green box reveal */}
            <span className="relative inline-block px-2.5 py-0.5 mx-1.5 select-none mission-box-wrapper z-10">
              <span 
                className="absolute inset-0 bg-[#a3e635] origin-left mission-green-box z-0 rounded-[4px]" 
                style={{ transform: "skewX(-6deg) rotate(-1.5deg) scaleX(0)" }}
              />
              <span className="mission-word text-neutral-300/40 opacity-30 relative z-10 inline-block mission-box-text">stratejik</span>
            </span>

            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">hamlede</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">markanızı</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">geleceğe</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">taşıyoruz.</span>
            
            {/* Sentence 2 */}
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">Sıradan</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">fikirlerin</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">ötesine</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">geçip,</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">sınırları</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">zorlayan</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">büyüme</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">odaklı</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">çözümler</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">üretiyoruz.</span>
            
            {/* Sentence 3 */}
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">Bu</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">dijital</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">vahşi</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">ormanda</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">ya</span>

            {/* "avcı" - Hand-drawn Underline highlight (Hot Pink) */}
            <span className="relative inline-block mr-2 md:mr-3 mission-underline-wrapper select-none">
              <svg className="absolute -bottom-0.5 md:-bottom-2 left-0 w-full h-[8px] overflow-visible" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path
                  className="mission-underline-path"
                  d="M 3 5 Q 50 8 97 4"
                  stroke="#ec4899" // Hot Pink for high contrast
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
                />
              </svg>
              <span className="mission-word text-neutral-300/40 opacity-30 inline-block">avcı</span>
            </span>

            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">olursunuz</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">ya</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">da</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">av.</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">Biz</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">pazarın</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">en</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">acımasız</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">avcılarını</span>
            <span className="mission-word text-neutral-300/40 opacity-30 mr-2 md:mr-3 inline-block">yetiştiriyoruz.</span>
            
          </h2>
        </div>
      </div>
    </section>
  )
}
