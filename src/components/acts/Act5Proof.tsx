import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

const TAGS_LEFT = ["Strateji Danışmanlığı", "Meta Reklam", "Google Ads"]
const TAGS_RIGHT = ["A/B Testi", "Dönüşüm Optimizasyonu", "Analitik Raporlama"]

export const Act5Proof = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".act5-tag",
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      )
      gsap.fromTo(
        ".act5-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      )
      gsap.fromTo(
        ".act5-video",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-white py-20 md:py-28 overflow-hidden"
      id="act5"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Top section heading */}
        <div className="act5-heading text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 font-plus-jakarta tracking-tight">
            Doğru Süreç,{" "}
            <span className="text-[#a3e635]">Gerçek Sonuçlar</span>
          </h2>
          <p className="text-neutral-500 text-base md:text-lg mt-4 max-w-xl mx-auto font-plus-jakarta">
            Rastlantıya yer yok. Sadece veri, strateji ve kusursuz uygulama.
          </p>
        </div>

        {/* Main content: tags left + video + tags right */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left tags */}
          <div className="flex flex-row lg:flex-col gap-3 flex-wrap justify-center lg:justify-start">
            {TAGS_LEFT.map((tag, i) => (
              <div
                key={i}
                className="act5-tag flex items-center gap-2 bg-[#f8f8f8] border border-neutral-200 rounded-full px-4 py-2.5 shadow-sm whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] flex-shrink-0" />
                <span className="text-sm font-semibold text-neutral-700 font-plus-jakarta">
                  {tag}
                </span>
              </div>
            ))}
          </div>

          {/* Video Thumbnail */}
          <div className="act5-video flex-1 w-full max-w-2xl mx-auto">
            <div className="relative bg-[#111111] rounded-2xl overflow-hidden aspect-video shadow-2xl group cursor-pointer">
              {/* Background image */}
              <img
                src="/medias/image2.jpg"
                alt="Harbi Digital - Kimdir Ne Yapar?"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/20" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#a3e635] flex items-center justify-center shadow-lg shadow-[#a3e635]/30 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-7 h-7 md:w-8 md:h-8 fill-black ml-1"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Label */}
              <div className="absolute bottom-6 left-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-white text-xl md:text-2xl font-plus-jakarta">
                    HARB!.
                  </span>
                  <span className="text-[#a3e635] font-bold text-xl md:text-2xl font-plus-jakarta">
                    DIGITAL
                  </span>
                </div>
                <p className="text-white/70 text-sm font-plus-jakarta">
                  Kimdir? Ne yapar?
                </p>
              </div>
            </div>
          </div>

          {/* Right tags */}
          <div className="flex flex-row lg:flex-col gap-3 flex-wrap justify-center lg:justify-start">
            {TAGS_RIGHT.map((tag, i) => (
              <div
                key={i}
                className="act5-tag flex items-center gap-2 bg-[#f8f8f8] border border-neutral-200 rounded-full px-4 py-2.5 shadow-sm whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] flex-shrink-0" />
                <span className="text-sm font-semibold text-neutral-700 font-plus-jakarta">
                  {tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
