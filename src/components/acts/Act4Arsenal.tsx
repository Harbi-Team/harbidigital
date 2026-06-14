import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap"

const SERVICES = [
  {
    id: "performance",
    label: "Performans Pazarlama",
    description:
      "Meta, Google ve TikTok reklamlarını veri odaklı stratejilerle yöneterek maksimum ROAS elde ediyoruz.",
    preview: {
      title: "Performans Pazarlama",
      metrics: [
        { label: "ROAS", value: "+312%" },
        { label: "CPA", value: "-45%" },
        { label: "CTR", value: "+28%" },
      ],
    },
  },
  {
    id: "market",
    label: "Pazar Yönetimi",
    description:
      "Rakip analizi, pazar araştırması ve büyüme stratejileriyle markanızı doğru konumlandırıyoruz.",
    preview: {
      title: "Pazar Yönetimi",
      metrics: [
        { label: "Pazar Payı", value: "+18%" },
        { label: "Yeni Müşteri", value: "+240" },
        { label: "Retention", value: "87%" },
      ],
    },
  },
  {
    id: "content",
    label: "İçerik Stratejisi & Üretim",
    description:
      "Hedef kitlenizi dönüştüren içerikler üretiyoruz: video, görsel, metin ve interaktif formatlar.",
    preview: {
      title: "İçerik Üretimi",
      metrics: [
        { label: "Engagement", value: "+189%" },
        { label: "Reach", value: "2.4M+" },
        { label: "Dönüşüm", value: "+67%" },
      ],
    },
  },
  {
    id: "conversion",
    label: "Dönüşüm Optimizasyonu",
    description:
      "A/B testleri, landing page optimizasyonu ve kullanıcı deneyimi iyileştirmeleriyle satışları artırıyoruz.",
    preview: {
      title: "CRO",
      metrics: [
        { label: "Dönüşüm", value: "+94%" },
        { label: "Bounce Rate", value: "-32%" },
        { label: "Sepet", value: "+53%" },
      ],
    },
  },
]

export const Act4Arsenal = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".act4-left",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      )
      gsap.fromTo(
        ".act4-right",
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const current = SERVICES[active]

  return (
    <section
      ref={sectionRef}
      className="bg-[#f8f8f8] py-20 md:py-28"
      id="act4"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="act4-left">

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 font-plus-jakarta tracking-tight leading-[1.1] mb-5">
              Yolculuğun her anında yanınızda
            </h2>
            <p className="text-neutral-500 text-base md:text-lg leading-relaxed font-plus-jakarta mb-10">
              Büyümek için doğru strateji, yaratıcı içerik ve veri analitiğini
              bir araya getiriyoruz.
            </p>

            {/* Service tabs */}
            <div className="space-y-2">
              {SERVICES.map((service, i) => (
                <button
                  key={service.id}
                  onClick={() => setActive(i)}
                  className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-200 flex items-center gap-3 group ${active === i
                      ? "bg-white shadow-md border border-neutral-200"
                      : "hover:bg-white/60"
                    }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors ${active === i ? "bg-[#a3e635]" : "bg-neutral-300 group-hover:bg-[#a3e635]/60"
                      }`}
                  />
                  <div>
                    <span
                      className={`font-plus-jakarta font-semibold text-sm block transition-colors ${active === i ? "text-neutral-900" : "text-neutral-500"
                        }`}
                    >
                      {service.label}
                    </span>
                    {active === i && (
                      <p className="text-neutral-500 text-xs mt-1 font-plus-jakarta leading-relaxed">
                        {service.description}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right - Preview card */}
          <div className="act4-right">
            <div className="relative">
              {/* Main preview card */}
              <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-[#a3e635]" />
                  <span className="text-xs font-bold text-neutral-400 tracking-[0.2em] uppercase font-plus-jakarta">
                    {current.preview.title}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
                  {current.preview.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="bg-[#f8f8f8] rounded-xl p-2 sm:p-4 text-center min-w-0"
                    >
                      <div className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-900 font-plus-jakarta truncate">
                        {metric.value}
                      </div>
                      <div className="text-[10px] sm:text-xs text-neutral-500 font-plus-jakarta mt-0.5 sm:mt-1 truncate">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress bars */}
                <div className="space-y-3">
                  {["Strateji", "Uygulama", "Optimizasyon"].map((item, i) => (
                    <div key={item}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-medium text-neutral-600 font-plus-jakarta">
                          {item}
                        </span>
                        <span className="text-xs font-bold text-neutral-900 font-plus-jakarta">
                          {[92, 88, 96][i]}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#a3e635] rounded-full transition-all duration-700"
                          style={{ width: `${[92, 88, 96][i]}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating accent card */}
              <div className="absolute -bottom-5 -right-5 bg-[#111111] rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#a3e635] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-black">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold font-plus-jakarta">
                      Sonuç Garantisi
                    </p>
                    <p className="text-white/50 text-xs font-plus-jakarta">
                      Şeffaf raporlama
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
