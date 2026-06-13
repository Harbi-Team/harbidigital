import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { useContactModal } from "@/contexts/ContactModalContext"

const Placeholder = ({ className }: { className?: string }) => (
  <div className={`bg-neutral-100 flex items-center justify-center ${className}`}>
    <svg className="w-8 h-8 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  </div>
)

export const Act1Intro = () => {
  const { openModal } = useContactModal()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-text", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", delay: 0.2 })
      gsap.fromTo(".hero-mosaic", { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.35 })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-white flex items-center overflow-hidden"
      id="act1"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center gap-10 md:gap-6 pt-24 pb-10">

        {/* LEFT: Text content */}
        <div className="hero-text opacity-0 flex flex-col items-start flex-none w-full md:w-[38%]">

          <h1 className="font-extrabold font-plus-jakarta text-neutral-950 leading-[1.1] tracking-tight text-4xl sm:text-5xl mb-5">
            Dijitalleşmeye
            <br />
            <span
              className="px-2 py-0.5 rounded-lg"
              style={{ background: "#a3e635", display: "inline-block", marginTop: "4px" }}
            >
              Hazır Mısınız?
            </span>
          </h1>

          <p className="text-neutral-500 font-plus-jakarta text-sm sm:text-base leading-relaxed mb-8 max-w-xs">
            Harbi Digital ile şimdi harekete geçin, dijitalde büyümeye başlayın!
          </p>

          <div className="flex flex-wrap gap-3">
            {/* Primary CTA */}
            <button
              onClick={openModal}
              className="font-plus-jakarta font-bold text-sm text-neutral-950 flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: "#a3e635" }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-neutral-900 stroke-[2]">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Görüşme Planla
            </button>

            {/* Secondary CTA */}
            <button
              onClick={openModal}
              className="font-plus-jakarta font-bold text-sm text-neutral-700 bg-white border border-neutral-200 flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-200 hover:border-neutral-400 hover:scale-105 active:scale-95"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-neutral-600 stroke-[2]">
                <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .3l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.3-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
              </svg>
              Sizi Arayalım
            </button>
          </div>
        </div>

        {/* RIGHT: Image mosaic */}
        <div className="hero-mosaic opacity-0 flex-1 flex gap-3 h-[420px] md:h-[520px] overflow-hidden">

          {/* Column 1 — starts lower */}
          <div className="flex flex-col gap-3 flex-1 pt-10">
            <Placeholder className="flex-1 rounded-2xl min-h-0" />
            <Placeholder className="flex-1 rounded-2xl min-h-0" />
          </div>

          {/* Column 2 — tallest, starts at top */}
          <div className="flex flex-col gap-3 flex-1">
            <Placeholder className="flex-[1.6] rounded-2xl min-h-0" />
            <Placeholder className="flex-1 rounded-2xl min-h-0" />
          </div>

          {/* Column 3 — mixed: small icon cards + photo */}
          <div className="flex flex-col gap-3 flex-none w-[110px] pt-6">
            {/* Icon card: star */}
            <div className="rounded-2xl bg-[#f5fde7] border border-[#a3e635]/30 flex items-center justify-center h-[90px] flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#a3e635">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
              </svg>
            </div>
            <Placeholder className="flex-1 rounded-2xl min-h-0" />
            {/* Icon card: bag */}
            <div className="rounded-2xl bg-[#f5fde7] border border-[#a3e635]/30 flex items-center justify-center h-[90px] flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-[#a3e635] stroke-[1.5]">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </div>
          </div>

          {/* Column 4 — starts from top */}
          <div className="flex flex-col gap-3 flex-1 hidden sm:flex">
            <Placeholder className="flex-1 rounded-2xl min-h-0" />
            {/* Icon card: headphones */}
            <div className="rounded-2xl bg-[#f0f4ff] border border-blue-100 flex items-center justify-center h-[100px] flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-blue-400 stroke-[1.5]">
                <path d="M3 18v-6a9 9 0 0118 0v6" />
                <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
              </svg>
            </div>
            <Placeholder className="flex-1 rounded-2xl min-h-0" />
          </div>

        </div>
      </div>
    </section>
  )
}
