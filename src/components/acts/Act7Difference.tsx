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

      // Others Card entrance
      gsap.fromTo(
        ".card-others",
        { opacity: 0, x: -60, rotate: -3 },
        {
          opacity: 1,
          x: 0,
          rotate: -3,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Harbi Card entrance
      gsap.fromTo(
        ".card-harbi",
        { opacity: 0, x: 60, rotate: 2 },
        {
          opacity: 1,
          x: 0,
          rotate: 2,
          duration: 0.7,
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
        { opacity: 0, x: -15 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".card-others",
            start: "top 75%",
          },
        }
      )

      gsap.fromTo(
        ".harbi-li",
        { opacity: 0, x: 15 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".card-harbi",
            start: "top 75%",
          },
        }
      )

      // Gentle floating animations (active only on desktop lg screens)
      if (window.innerWidth >= 768) {
        gsap.to(".card-others", {
          y: "+=6",
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        })
        
        gsap.to(".card-harbi", {
          y: "-=6",
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 0.5,
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-[#f4f4f4] py-20 md:py-28 overflow-hidden"
      id="act7"
    >
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Heading */}
        <div className="act7-heading text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 font-plus-jakarta tracking-tight">
            Diğerleri ile kıyaslanamaz.
          </h2>
          <p className="text-neutral-500 text-base md:text-lg mt-4 font-plus-jakarta max-w-xl mx-auto">
            Neden harbi ile çalışmanız gerektiğini anlamak için karşılaştırın.
          </p>
        </div>

        {/* Cards container */}
        <div className="relative flex flex-col md:flex-row gap-6 md:gap-0 justify-center items-center md:items-start">
          {/* Others card */}
          <div className="card-others w-full md:w-[420px] bg-[#1a1a1a] rounded-2xl p-8 md:translate-y-4 shadow-2xl z-10 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full border-2 border-neutral-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-neutral-500 stroke-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-neutral-400 font-bold text-lg font-plus-jakarta">
                Geleneksel Ajanslar
              </h3>
            </div>
            <ul className="space-y-4">
              {OTHERS.map((item, i) => (
                <li key={i} className="other-li flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none stroke-neutral-500 stroke-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-neutral-500 text-sm font-plus-jakarta leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Harbi card */}
          <div className="card-harbi w-full md:w-[420px] bg-[#111111] rounded-2xl p-8 md:-translate-x-4 shadow-2xl z-20 border border-[#a3e635]/20 transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_20px_50px_rgba(163,230,53,0.15)] hover:border-[#a3e635]/40">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full bg-[#a3e635] flex items-center justify-center shadow-[0_0_12px_rgba(163,230,53,0.5)]">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-black stroke-2">
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
                  <div className="w-5 h-5 rounded-full bg-[#a3e635]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none stroke-[#a3e635] stroke-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-neutral-300 text-sm font-plus-jakarta leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
