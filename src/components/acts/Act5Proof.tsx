import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap"

const TAGS = [
  "Strateji Danışmanlığı",
  "Meta Reklam",
  "Google Ads",
  "A/B Testi",
  "Dönüşüm Optimizasyonu",
  "Analitik Raporlama",
]

export const Act5Proof = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

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

        {/* Tags row under heading */}
        <div className="flex flex-row flex-wrap justify-center gap-3 mb-10">
          {TAGS.map((tag, i) => (
            <div
              key={i}
              className="act5-tag flex items-center bg-[#f8f8f8] border border-neutral-200 rounded-full px-4 py-2.5 shadow-sm whitespace-nowrap"
            >
              <span className="text-sm font-semibold text-neutral-700 font-plus-jakarta">
                {tag}
              </span>
            </div>
          ))}
        </div>

        {/* Main content: video */}
        <div className="flex items-center justify-center">
          {/* Video Thumbnail */}
          <div className="act5-video w-full max-w-6xl mx-auto">
            <div className="relative bg-[#111111] rounded-2xl overflow-hidden aspect-video shadow-2xl group">
              {isPlaying ? (
                <video
                  src="/medias/harbi-video.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                  muted
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 w-full h-full cursor-pointer"
                  aria-label="Videoyu oynat"
                >
                  {/* Background image */}
                  <img
                    src="/medias/footer-bg.png"
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
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
