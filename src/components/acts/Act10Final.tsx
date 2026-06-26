import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { gsap } from "@/lib/gsap"

const PLATFORM_ICONS = [
  { bg: "#1877F2", char: "f" },
  { bg: "#E1306C", char: "ig" },
  { bg: "#FF0000", char: "▶" },
  { bg: "#000000", char: "tt" },
  { bg: "#4285F4", char: "G" },
  { bg: "#0077B5", char: "in" },
  { bg: "#25D366", char: "wa" },
  { bg: "#FF6900", char: "S" },
]

export const Act10Final = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      })
      tl.fromTo(
        ".act10-icons",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      )
        .fromTo(
          ".act10-title",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          ".act10-desc",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ".act10-btns",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-36"
      style={{
        background:
          "radial-gradient(ellipse 90% 120% at -5% 60%, rgba(100,180,0,0.2) 0%, transparent 55%), linear-gradient(180deg, #0d0d0d 0%, #080808 100%)",
      }}
      id="act10"
    >
      {/* Lime green glow at the bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-[#a3e635]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40%] h-[150px] bg-[#a3e635]/15 blur-[60px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 max-w-4xl text-center">
        {/* Platform icons */}
        <div className="act10-icons flex items-center justify-center gap-2.5 flex-wrap mb-10">
          {PLATFORM_ICONS.map((icon, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-black shadow-lg"
              style={{ backgroundColor: icon.bg }}
            >
              {icon.char}
            </div>
          ))}
        </div>

        {/* Title */}
        <h2 className="act10-title text-3xl md:text-5xl lg:text-6xl font-bold text-white font-plus-jakarta tracking-tight leading-[1.1] mb-6">
          Çalışmak için doğru ajansı
          <br />
          <span className="text-[#a3e635]">mı arıyorsunuz?</span>
        </h2>

        {/* Description */}
        <p className="act10-desc text-neutral-400 text-base md:text-lg leading-relaxed font-plus-jakarta max-w-xl mx-auto mb-10">
          Markanızı büyütmek, satışlarınızı artırmak ve rakiplerinizin önüne
          geçmek için doğru adımları atmaya hazır mısınız?
        </p>

        {/* Buttons */}
        <div className="act10-btns flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            to="/iletisim"
            className="font-plus-jakarta font-extrabold text-sm tracking-wider bg-white text-neutral-900 hover:bg-neutral-100 rounded-full px-8 py-4 flex items-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-neutral-900">
              <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .3l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.3-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
            </svg>
            Bizi Arayalım
          </Link>

          <Link
            to="/iletisim"
            className="font-plus-jakarta font-extrabold text-sm tracking-wider bg-transparent text-white border-2 border-[#a3e635] shadow-[0_0_20px_rgba(163,230,53,0.2)] hover:shadow-[0_0_35px_rgba(163,230,53,0.45)] rounded-full px-8 py-4 flex items-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-none stroke-[#a3e635] stroke-[2.5]"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Görüşme Planla
          </Link>
        </div>
      </div>
    </section>
  )
}
