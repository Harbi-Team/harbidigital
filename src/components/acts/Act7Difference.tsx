import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

const OTHERS = [
  "Belirsiz hedefler ve KPI'lar",
  "Sözlere bağlı süreç planı",
  "Aylık muğlak raporlama",
  "Şablon ve kopyala-yapıştır içerik",
  "Sonuç yerine aktivite satışı",
]

const HARBI = [
  "Net hedefler ve ölçülebilir KPI'lar",
  "Kanıtlanmış veri odaklı süreçler",
  "Haftalık şeffaf performans raporu",
  "Markanıza özel yaratıcı içerik",
  "Gerçek sonuçlara odaklı yaklaşım",
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

      // Cards entrance
      gsap.fromTo(
        [".card-others", ".card-harbi"],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Staggered list items entry
      gsap.fromTo(
        ".other-li",
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".card-others",
            start: "top 75%",
          },
        }
      )

      gsap.fromTo(
        ".harbi-li",
        { opacity: 0, x: 10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".card-harbi",
            start: "top 75%",
          },
        }
      )

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-white py-24 md:py-32 overflow-hidden border-t border-neutral-100"
      id="act7"
    >
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Heading */}
        <div className="act7-heading text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-black text-neutral-900 font-plus-jakarta tracking-tight">
            Diğerleri ile kıyaslanamaz.
          </h2>
          <p className="text-neutral-500 text-base md:text-lg mt-4 font-plus-jakarta max-w-xl mx-auto">
            Neden HARB! ile çalışmanız gerektiğini anlamak için karşılaştırın.
          </p>
        </div>

        {/* Cards container */}
        <div className="relative flex flex-col md:flex-row gap-8 justify-center items-center md:items-stretch">
          
          {/* Others card (Light Theme) */}
          <div className="card-others w-full md:w-[440px] bg-neutral-50/80 border border-neutral-200/80 rounded-2xl p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.015)] flex flex-col justify-between transition-all duration-300 hover:border-neutral-300/80 hover:bg-neutral-50">
            <div>
              <div className="flex items-center gap-3.5 mb-8">
                <div className="w-8 h-8 rounded-full border border-neutral-300/70 flex items-center justify-center bg-neutral-100/50">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-neutral-400 stroke-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-neutral-500 font-bold text-lg font-plus-jakarta">
                  Geleneksel Ajanslar
                </h3>
              </div>
              <ul className="space-y-4">
                {OTHERS.map((item, i) => (
                  <li key={i} className="other-li flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-neutral-200/40 flex items-center justify-center flex-shrink-0 mt-0.5 border border-neutral-300/20">
                      <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-none stroke-neutral-400 stroke-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="text-neutral-500 text-sm font-medium font-plus-jakarta leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Harbi card (Dark Theme) */}
          <div className="card-harbi w-full md:w-[440px] bg-[#0d0d0d] border border-neutral-900 rounded-2xl p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.18)] flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:border-[#a3e635]/25 hover:shadow-[0_25px_60px_rgba(163,230,53,0.03)]">
            {/* Subtle glow layer in background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#a3e635]/3 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex items-center gap-3.5 mb-8">
                <div className="w-8 h-8 rounded-full bg-[#a3e635] flex items-center justify-center shadow-[0_0_15px_rgba(163,230,53,0.3)]">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-black stroke-[2.5]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg font-plus-jakarta">
                  HARB! DIGITAL
                </h3>
              </div>
              <ul className="space-y-4">
                {HARBI.map((item, i) => (
                  <li key={i} className="harbi-li flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#a3e635]/10 flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#a3e635]/20">
                      <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-none stroke-[#a3e635] stroke-[2.5]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-neutral-200 text-sm font-medium font-plus-jakarta leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
