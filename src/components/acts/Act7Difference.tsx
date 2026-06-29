import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

const COMPARISONS = [
  {
    category: "Hedefler & KPI",
    traditional: "Belirsiz ve ölçülemeyen genel hedefler",
    harbi: "Ölçülebilir, net ve iş hedeflerine doğrudan bağlı KPI'lar",
  },
  {
    category: "Süreç & Plan",
    traditional: "Sözlü taahhütlere bağlı, belirsiz yol haritaları",
    harbi: "Kanıtlanmış, veri odaklı ve sürekli optimize edilen süreçler",
  },
  {
    category: "Raporlama",
    traditional: "Aylık gönderilen, karmaşık ve statik PDF raporlar",
    harbi: "Haftalık şeffaf performans raporları ve canlı veri panoları",
  },
  {
    category: "İçerik Stratejisi",
    traditional: "Tekrara düşen, şablon bazlı kopyala-yapıştır paylaşımlar",
    harbi: "Markanızın DNA'sına özel, yaratıcı ve özgün kreatif içerikler",
  },
  {
    category: "Odak Noktası",
    traditional: "Sadece beğeni, takipçi vb. aktivite odaklı yaklaşım",
    harbi: "Gerçek iş büyümesine, dönüşümlere ve gelire odaklanan yaklaşım",
  },
]

export const Act7Difference = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title entrance
      gsap.fromTo(
        ".act7-heading",
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

      // Rows entrance (Desktop)
      gsap.fromTo(
        ".comparison-row",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".comparison-table-container",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Cards entrance (Mobile)
      gsap.fromTo(
        ".comparison-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".comparison-mobile-container",
            start: "top 75%",
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
      className="relative bg-white py-24 md:py-32 overflow-hidden border-t border-neutral-100"
      id="act7"
      style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.02) 1px, transparent 0)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#a3e635]/6 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] bg-[#a3e635]/8 blur-[130px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {/* Heading */}
        <div className="act7-heading text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-black text-neutral-900 font-plus-jakarta tracking-tight">
            Diğerleri ile Kıyaslanamaz
          </h2>
          <p className="text-neutral-500 text-base md:text-lg mt-4 font-plus-jakarta max-w-xl mx-auto">
            Neden HARB! ile çalışmanız gerektiğini anlamak için karşılaştırın.
          </p>
        </div>

        {/* Desktop View - Comparison Table */}
        <div className="comparison-table-container hidden md:block">
          <div className="grid grid-cols-12 gap-4 items-center border-b border-neutral-200 pb-6 mb-2 px-4">
            <div className="col-span-3 text-neutral-400 font-bold text-xs tracking-wider uppercase font-plus-jakarta">
              Karşılaştırma
            </div>
            <div className="col-span-4 text-neutral-400 font-bold text-xs tracking-wider uppercase font-plus-jakarta">
              Geleneksel Ajanslar
            </div>
            <div className="col-span-5 flex justify-start">
              <span className="bg-[#a3e635] text-neutral-950 px-3.5 py-1 rounded-full text-xs font-black font-plus-jakarta tracking-wider uppercase shadow-sm">
                HARB! DIGITAL
              </span>
            </div>
          </div>

          <div className="divide-y divide-neutral-100">
            {COMPARISONS.map((row, i) => (
              <div
                key={i}
                className="comparison-row grid grid-cols-12 gap-4 py-6 items-center transition-all duration-300 group hover:bg-neutral-50 px-4 rounded-xl"
              >
                {/* Category */}
                <div className="col-span-3 text-neutral-700 font-bold text-base font-plus-jakarta pr-4 transition-colors duration-300 group-hover:text-neutral-950">
                  {row.category}
                </div>

                {/* Traditional */}
                <div className="col-span-4 flex items-start gap-3 opacity-60 group-hover:opacity-40 transition-opacity duration-300 pr-6">
                  <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-none stroke-red-500 stroke-[3]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-neutral-500 text-sm font-medium font-plus-jakarta leading-relaxed">
                    {row.traditional}
                  </span>
                </div>

                {/* HARB! */}
                <div className="col-span-5 flex items-start gap-3 bg-gradient-to-r from-transparent via-[#a3e635]/2 to-[#a3e635]/5 border border-transparent group-hover:border-[#a3e635]/20 group-hover:from-transparent group-hover:to-[#a3e635]/8 rounded-xl p-3.5 transition-all duration-300 -mr-3.5">
                  <div className="w-5 h-5 rounded-full bg-[#a3e635]/15 flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#a3e635]/30 shadow-[0_0_8px_rgba(163,230,53,0.15)] group-hover:bg-[#a3e635] group-hover:border-[#a3e635] group-hover:shadow-[0_0_12px_rgba(163,230,53,0.4)] transition-all duration-300">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-[#65a30d] stroke-[3] group-hover:stroke-neutral-950 transition-colors duration-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-neutral-700 text-sm font-medium font-plus-jakarta leading-relaxed group-hover:text-neutral-900 group-hover:font-semibold transition-all duration-300">
                    {row.harbi}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View - Comparison Cards */}
        <div className="comparison-mobile-container grid grid-cols-1 gap-6 md:hidden">
          {COMPARISONS.map((row, i) => (
            <div
              key={i}
              className="comparison-card bg-neutral-50 border border-neutral-200/80 rounded-2xl p-6 relative overflow-hidden shadow-sm"
            >
              <div className="text-neutral-800 font-bold text-base font-plus-jakarta mb-4 border-b border-neutral-200 pb-3">
                {row.category}
              </div>

              {/* Traditional */}
              <div className="flex items-start gap-3 mb-4 opacity-75">
                <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-none stroke-red-500 stroke-[3]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <div className="text-neutral-400 text-[10px] font-bold uppercase tracking-wider mb-0.5 font-plus-jakarta">
                    Geleneksel Ajanslar
                  </div>
                  <p className="text-neutral-500 text-sm font-medium font-plus-jakarta leading-relaxed">
                    {row.traditional}
                  </p>
                </div>
              </div>

              {/* HARB! */}
              <div className="flex items-start gap-3 bg-[#a3e635]/8 border border-[#a3e635]/20 rounded-xl p-4">
                <div className="w-5 h-5 rounded-full bg-[#a3e635] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_0_10px_rgba(163,230,53,0.25)]">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-neutral-950 stroke-[3]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-[#4d7c0f] text-[10px] font-extrabold uppercase tracking-wider mb-0.5 font-plus-jakarta">
                    HARB! DIGITAL
                  </div>
                  <p className="text-neutral-900 text-sm font-bold font-plus-jakarta leading-relaxed">
                    {row.harbi}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
