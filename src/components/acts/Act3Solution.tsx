import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { useContactModal } from "@/contexts/ContactModalContext"

export const Act3Solution = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const { openModal } = useContactModal()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".act3-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
      gsap.fromTo(
        ".case-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white py-20 md:py-28" id="act3">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="act3-header flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 font-plus-jakarta tracking-tight">
              Kanıtlanmış Sonuçlar
            </h2>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 - Nevdijital */}
          <div className="case-card group relative bg-[#111111] rounded-2xl overflow-hidden aspect-[4/5] md:aspect-auto md:min-h-[500px] flex flex-col">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src="/medias/projects/nevdijital/image1.jpg"
                alt="Nevdijital Projesi"
                className="w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between h-full p-8 min-h-[480px]">
              {/* Top badge */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#a3e635] tracking-[0.2em] uppercase font-plus-jakarta">
                  Performans Pazarlama
                </span>
              </div>

              {/* Metric card */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 w-fit">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#a3e635] flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-black">
                      <path d="M7 14l5-5 5 5H7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold font-plus-jakarta">+312% ROAS Artışı</p>
                    <p className="text-white/60 text-xs font-plus-jakarta">6 ay içinde</p>
                  </div>
                </div>
              </div>

              {/* Bottom */}
              <div>
                <h3 className="text-white text-3xl md:text-4xl font-bold font-plus-jakarta mb-2">
                  Nevdijital
                </h3>
                <p className="text-white/50 text-sm font-plus-jakarta">
                  Dijital Pazarlama & Büyüme Stratejisi
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 - Neonav */}
          <div className="case-card group relative bg-[#0d0d1a] rounded-2xl overflow-hidden aspect-[4/5] md:aspect-auto md:min-h-[500px] flex flex-col">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src="/medias/neonav.jpg"
                alt="Neonav Projesi"
                className="w-full h-full object-cover opacity-45 group-hover:opacity-55 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a] via-[#0d0d1a]/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between h-full p-8 min-h-[480px]">
              {/* Top badge */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#a3e635] tracking-[0.2em] uppercase font-plus-jakarta">
                  Marka & Web
                </span>
              </div>

              {/* Review card */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 max-w-[260px]">
                <p className="text-white/80 text-sm font-plus-jakarta leading-relaxed mb-3">
                  "Harbi ile çalışmak, beklentilerimizin çok ötesine geçti."
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-neutral-600 overflow-hidden">
                    <img
                      src="/team/huseyin-aydin.png"
                      alt="Müşteri"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-white/60 text-xs font-plus-jakarta">
                    Furkan K. — Kurucu
                  </span>
                </div>
              </div>

              {/* Bottom */}
              <div>
                <h3 className="text-white text-3xl md:text-4xl font-bold font-plus-jakarta mb-2">
                  Neonav
                </h3>
                <p className="text-white/50 text-sm font-plus-jakarta">
                  Marka Kimliği & Web Tasarım
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={openModal}
            className="font-plus-jakarta font-bold text-sm tracking-wide bg-neutral-900 text-white hover:bg-black rounded-full px-8 py-4 inline-flex items-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Tüm Performans Sonuçları
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#a3e635]">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
