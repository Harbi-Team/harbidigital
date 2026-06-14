import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { useContactModal } from "@/contexts/ContactModalContext"
import TrueFocus from "@/components/ui/TrueFocus"

const VideoCard = ({ src, className }: { src: string; className?: string }) => (
  <div className={`overflow-hidden rounded-2xl min-h-0 bg-neutral-100 ${className}`}>
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover"
    />
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
              className="px-2 py-0.5 rounded-lg inline-block mt-2"
              style={{ background: "#a3e635" }}
            >
              <TrueFocus 
                sentence="Hazır Mısınız?"
                manualMode={false}
                blurAmount={3}
                borderColor="#0d0d0d"
                glowColor="rgba(0, 0, 0, 0.15)"
                animationDuration={0.6}
                pauseBetweenAnimations={1.2}
                wordClassName="text-neutral-950 text-4xl sm:text-5xl font-extrabold font-plus-jakarta"
              />
            </span>
          </h1>

          <p className="text-neutral-500 font-plus-jakarta text-sm sm:text-base leading-relaxed mb-8 max-w-xs">
            Harbi Digital ile şimdi harekete geçin, dijitalde büyümeye başlayın!
          </p>

          <div className="flex flex-wrap gap-3">
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

        {/* RIGHT: Video mosaic */}
        <div className="hero-mosaic opacity-0 flex-1 flex gap-3 h-[420px] md:h-[520px] overflow-hidden">

          {/* Column 1 — starts lower */}
          <div className="flex flex-col gap-3 flex-1 pt-10">
            <VideoCard src="/medias/hero-1.mp4" className="flex-1" />
            <VideoCard src="/medias/hero-2.mp4" className="flex-1" />
          </div>

          {/* Column 2 — tallest */}
          <div className="flex flex-col gap-3 flex-1">
            <VideoCard src="/medias/hero-3.mp4" className="flex-[1.6]" />
            <VideoCard src="/medias/hero-4.mp4" className="flex-1" />
          </div>

          {/* Column 3 — 3 videos */}
          <div className="flex flex-col gap-3 flex-none w-[110px] pt-6">
            <VideoCard src="/medias/hero-5.mp4" className="flex-1" />
            <VideoCard src="/medias/hero-6.mp4" className="flex-1" />
            <VideoCard src="/medias/hero-7.mp4" className="flex-1" />
          </div>

          {/* Column 4 — 3 videos */}
          <div className="flex flex-col gap-3 flex-1 hidden sm:flex">
            <VideoCard src="/medias/hero-8.mp4" className="flex-1" />
            <VideoCard src="/medias/hero-9.mp4" className="flex-1" />
            <VideoCard src="/medias/hero-10.mp4" className="flex-1" />
          </div>

        </div>
      </div>
    </section>
  )
}
