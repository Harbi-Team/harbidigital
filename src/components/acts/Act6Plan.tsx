import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

const STEPS = [
  {
    number: "1",
    title: "Tanışma & Analiz",
    description:
      "İş modelinizi, hedeflerinizi ve mevcut durumunuzu derinlemesine analiz ediyoruz. Rakip araştırması ve pazar incelemesiyle başlıyoruz.",
    accent: "#a3e635",
  },
  {
    number: "2",
    title: "Strateji & Plan",
    description:
      "Veriye dayalı büyüme stratejisi oluşturuyoruz. Hangi kanallar, hangi içerikler, hangi bütçe — her detay netleşiyor.",
    accent: "#a3e635",
  },
  {
    number: "3",
    title: "Uygulama & Büyüme",
    description:
      "Planı hayata geçiriyor, sonuçları sürekli ölçüyor ve optimize ediyoruz. Şeffaf raporlarla her adımı birlikte takip ediyoruz.",
    accent: "#a3e635",
  },
]

export const Act6Plan = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".act6-title",
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
        ".step-card",
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
    <section
      ref={sectionRef}
      className="bg-[#0d0d0d] py-20 md:py-28"
      id="act6"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Heading */}
        <div className="act6-title text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-white font-plus-jakarta tracking-tight">
            Büyümeye{" "}
            <span className="text-[#a3e635]">Başlıyoruz</span>
          </h2>
          <p className="text-neutral-500 text-base md:text-lg mt-4 font-plus-jakarta max-w-lg mx-auto">
            3 adımda sonuca ulaşan kanıtlanmış sürecimiz.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="step-card group bg-[#161616] border border-[#2a2a2a] hover:border-[#a3e635]/30 rounded-2xl p-8 transition-all duration-300"
            >
              {/* Number */}
              <div className="flex items-start justify-between mb-8">
                <span className="text-6xl font-black text-[#2a2a2a] font-plus-jakarta leading-none group-hover:text-[#a3e635]/20 transition-colors duration-300">
                  {step.number}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#a3e635]/10 flex items-center justify-center group-hover:bg-[#a3e635]/20 transition-colors duration-300">
                  <div className="w-2 h-2 rounded-full bg-[#a3e635]" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-white text-xl font-bold font-plus-jakarta mb-4">
                {step.title}
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed font-plus-jakarta">
                {step.description}
              </p>

              {/* Bottom accent line */}
              <div className="mt-8 h-0.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                <div className="h-full bg-[#a3e635] w-0 group-hover:w-full transition-all duration-500 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
